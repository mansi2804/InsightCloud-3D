import { useState, Suspense } from 'react';
import './App.css';
import { UrlForm } from './components/UrlForm';
import { WordCloud3D } from './components/WordCloud3D';
import { analyzeArticle } from './lib/api';
import type { KeywordData, AnalyzeStatus } from './types';

function LoadingSpinner() {
  return (
    <div className="loading-overlay">
      <div className="loading-spinner" />
    </div>
  );
}

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

      {status === 'loading' && <LoadingSpinner />}

      {status === 'success' && keywords.length > 0 && (
        <Suspense fallback={<LoadingSpinner />}>
          <WordCloud3D keywords={keywords} />
        </Suspense>
      )}
    </div>
  );
}

export default App;
