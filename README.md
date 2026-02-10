# CV Reviewer - AI-Powered Resume Analysis

CV Reviewer is a modern web application that leverages AI to provide instant, professional feedback on resumes. It analyzes keywords, formatting, and overall impact to help candidates land their dream jobs.

![CV Reviewer Screenshot](https://lh3.googleusercontent.com/aida/AOfcidUIls1yQEUYZGGwwkUu_XppQDj6wx08doIzx5TKgTbwVV_uE-1dvW-VxNC_oIMIceYzc0L1xvPYndeaVL-JHPebKhUbpS9HlJPTrWWvGC_q3QjS66RP4eRqoT8SWDIG0msC8LcV03jt0li_ut00mYusMc5FpSgNeGAMvPtG7NtXuhjQvwRwUHa-Zrfb52FUFfJZHPwCIwJRmBXU87jkWeWIcRKA5hgSxs0HJk-hffZF0_orSgN_70kcW1Mb)

## 🚀 Features

- **AI Analysis**: Uses `meta-llama/Llama-3.2-3B-Instruct` via LangChain for high-quality insights.
- **Multi-Format Support**: Extraction from both **PDF** and **DOCX** files.
- **Keyword Matching**: Scans for industry-specific keywords that Applicant Tracking Systems (ATS) look for.
- **Impact Analysis**: Provides suggestions on how to quantify achievements.
- **Formatting Check**: Identifies formatting errors that might hinder readability.
- **Modern UI**: Polished, responsive interface built with React and Tailwind CSS.

## 🛠️ Technology Stack

### Backend
- **Flask**: Python web framework for the API.
- **LangChain**: Framework for building LLM applications.
- **Hugging Face Inference API**: For running Llama 3.2.
- **pdfplumber & python-docx**: For text extraction from documents.

### Frontend
- **React 19**: Modern UI library.
- **Vite**: Ultra-fast build tool.
- **Tailwind CSS v4**: For styling.
- **Lucide React & Material Icons**: For iconography.

## 📋 Prerequisites

- Python 3.12+
- Node.js 18+
- A Hugging Face API Token

## 🔧 Installation & Setup

### 1. Backend Setup
```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```
Create a `.env` file in the `backend` directory:
```env
HUGGINGFACEHUB_API_TOKEN=your_token_here
```

### 2. Frontend Setup
```bash
cd frontend
npm install
```

## 🏃 Running the Application

### Start the Backend
```bash
cd backend
source venv/bin/activate
python main.py
```
The API will be available at `http://localhost:8000`.

### Start the Frontend
```bash
cd frontend
npm run dev
```
The application will be available at `http://localhost:5173`.

## 📄 License
© 2026 CV Reviewer AI. All rights reserved.
