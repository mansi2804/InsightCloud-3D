import { useState } from 'react';
import './App.css';
import { UrlForm } from './components/UrlForm';
import { analyzeArticle } from './lib/api';
import type { KeywordData, AnalyzeStatus } from './types';

function App() {
  const [status, setStatus] = useState<AnalyzeStatus>('idle');
  const [error, setError] = useState<string>();
  const [keywords, setKeywords] = useState<KeywordData[]>([]);

  const handleAnalyze = async (url: string) => {
    setStatus('loading');
    setError(undefined);
    
    try {
      const data = await analyzeArticle(url);
      setKeywords(data);
      setStatus('success');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
      setStatus('error');
    }
  };

  return (
    <div className="app">
      <h1>InsightCloud-3D</h1>
      <p>Interactive 3D Word Cloud Visualization</p>
      
      <UrlForm 
        onAnalyze={handleAnalyze}
        status={status}
        error={error}
      />

      {/* Word cloud will be added in the next step */}
      {status === 'success' && (
        <div style={{ color: '#888' }}>
          {keywords.length} keywords extracted
        </div>
      )}
    </div>
  );
}

export default App
