import { useState } from 'react';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import UploadPage from './components/UploadPage';
import DashboardPage from './components/DashboardPage';

interface AnalysisResult {
  filename: string;
  candidate_name: string;
  analysis: {
    summary: string;
    skills: string;
    feedback: string;
  };
}

function App() {
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async (file: File) => {
    setIsAnalyzing(true);
    setError(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://localhost:8000/analyze-cv', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to analyze CV');
      }

      const data = await response.json();
      setResult(data);
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setError(null);
  };

  return (
    <div className="bg-[#f6f6f8] text-slate-900 min-h-screen font-[Inter,sans-serif]">
      <Header />
      {result ? (
        <DashboardPage result={result} onReset={handleReset} />
      ) : (
        <>
          <UploadPage
            onAnalyze={handleAnalyze}
            isAnalyzing={isAnalyzing}
            error={error}
          />
          <Footer />
        </>
      )}
    </div>
  );
}

export default App;
