import os
import io
import pdfplumber
from docx import Document
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
from langchain_core.prompts import PromptTemplate
from langchain_huggingface import HuggingFaceEndpoint, ChatHuggingFace
load_dotenv()

app = Flask(__name__)
CORS(app) # Enable CORS for all routes

# --- CV Extraction Helpers ---

def extract_text_from_pdf(file_stream):
    text = ""
    with pdfplumber.open(file_stream) as pdf:
        for page in pdf.pages:
            extracted = page.extract_text()
            if extracted:
                text += extracted + "\n"
    return text

def extract_text_from_docx(file_stream):
    doc = Document(file_stream)
    return "\n".join([para.text for para in doc.paragraphs])

# --- LangChain Setup ---

hf_api_token = os.getenv("HUGGINGFACEHUB_API_TOKEN")
hf_model = "meta-llama/Llama-3.2-3B-Instruct"

# Use HuggingFaceEndpoint directly
endpoint = HuggingFaceEndpoint(
    repo_id=hf_model,
    max_new_tokens=512,
    huggingfacehub_api_token=hf_api_token,
    temperature=0.1
)

hf_llm = ChatHuggingFace(llm=endpoint)

# Prompts
summary_prompt = PromptTemplate(
    input_variables=["cv_text"],
    template="Summarize the following CV into a concise professional summary:\n\n{cv_text}"
)

name_prompt = PromptTemplate(
    input_variables=["cv_text"],
    template="Extract ONLY the full name of the person this CV belongs to. Return only the name, nothing else.\n\n{cv_text}"
)

skills_prompt = PromptTemplate(
    input_variables=["cv_text"],
    template="Extract all skills, programming languages, and tools from this CV:\n\n{cv_text}"
)

feedback_prompt = PromptTemplate(
    input_variables=["cv_text"],
    template="Provide constructive feedback to improve this CV. Focus on formatting, clarity, and highlighting key experiences:\n\n{cv_text}"
)

# New dynamic scores prompt
scores_prompt = PromptTemplate(
    input_variables=["cv_text"],
    template="""Analyze the CV and provide a score from 1 to 100 for each of the following categories:
1. Technical Skills
2. Soft Skills
3. Impact (how well results are described)
4. ATS Rank (how well it would pass automated filters)
5. Clarity (formatting and readability)

Return ONLY a JSON object with these keys: "technical", "soft_skills", "impact", "ats_rank", "clarity". No other text.
Example: {"technical": 85, "soft_skills": 70, "impact": 90, "ats_rank": 75, "clarity": 95}

CV Content:
{cv_text}"""
)

# Chains using LCEL (Prompt | LLM)
summary_chain = summary_prompt | hf_llm
name_chain = name_prompt | hf_llm
skills_chain = skills_prompt | hf_llm
feedback_chain = feedback_prompt | hf_llm
scores_chain = scores_prompt | hf_llm

# --- Routes ---

@app.route('/', methods=['GET'])
def root():
    return jsonify({"message": "Welcome to CV Reviewer API (Flask)"})

@app.route('/analyze-cv', methods=['POST'])
def analyze_cv():
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400
    
    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400
    
    filename = file.filename.lower()
    file_stream = io.BytesIO(file.read())
    
    try:
        if filename.endswith('.pdf'):
            cv_text = extract_text_from_pdf(file_stream)
        elif filename.endswith('.docx'):
            cv_text = extract_text_from_docx(file_stream)
        else:
            return jsonify({"error": "Unsupported file format. Please upload PDF or DOCX."}), 400
        
        if not cv_text.strip():
            return jsonify({"error": "Could not extract text from the file."}), 400

        # Run Analysis
        summary_response = summary_chain.invoke({"cv_text": cv_text})
        name_response = name_chain.invoke({"cv_text": cv_text})
        skills_response = skills_chain.invoke({"cv_text": cv_text})
        feedback_response = feedback_chain.invoke({"cv_text": cv_text})
        scores_response = scores_chain.invoke({"cv_text": cv_text})

        # Extract content from AIMessage
        summary = summary_response.content if hasattr(summary_response, 'content') else str(summary_response)
        candidate_name = name_response.content if hasattr(name_response, 'content') else str(name_response)
        skills = skills_response.content if hasattr(skills_response, 'content') else str(skills_response)
        feedback = feedback_response.content if hasattr(feedback_response, 'content') else str(feedback_response)
        scores_raw = scores_response.content if hasattr(scores_response, 'content') else str(scores_response)

        # Parse scores
        import json
        import re
        try:
            # Try to find JSON in the response
            json_match = re.search(r'\{.*\}', scores_raw, re.DOTALL)
            if json_match:
                scores_data = json.loads(json_match.group(0))
            else:
                scores_data = {"technical": 80, "soft_skills": 80, "impact": 80, "ats_rank": 80, "clarity": 80}
        except:
            scores_data = {"technical": 80, "soft_skills": 80, "impact": 80, "ats_rank": 80, "clarity": 80}

        # Basic cleanup of candidate name
        candidate_name = candidate_name.strip()

        return jsonify({
            "filename": file.filename,
            "candidate_name": candidate_name,
            "analysis": {
                "summary": summary,
                "skills": skills,
                "feedback": feedback,
                "scores": scores_data
            }
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000, debug=True)

