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

function ThemeToggle({ onToggle }: { onToggle: () => void }) {
  return (
    <button className="theme-toggle" onClick={onToggle} aria-label="Toggle theme">
      <svg className="sun-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="5"></circle>
        <line x1="12" y1="1" x2="12" y2="3"></line>
        <line x1="12" y1="21" x2="12" y2="23"></line>
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
        <line x1="1" y1="12" x2="3" y2="12"></line>
        <line x1="21" y1="12" x2="23" y2="12"></line>
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
      </svg>
      <svg className="moon-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
      </svg>
    </button>
  );
}

function App() {
  const [status, setStatus] = useState<AnalyzeStatus>('idle');
  const [error, setError] = useState<string>();
  const [keywords, setKeywords] = useState<KeywordData[]>([]);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

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

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  return (
    <div className={`app-fullscreen ${theme}`}>
      <div className="app-content">
        <div className="header-section">
          <h1>InsightCloud-3D</h1>
          <p>Interactive 3D Word Cloud Visualization</p>
          <ThemeToggle onToggle={toggleTheme} />
        </div>

        <div className="main-content">
          <UrlForm 
            onAnalyze={handleAnalyze}
            status={status}
            error={error}
          />

          {status === 'loading' && <LoadingSpinner />}

          {status === 'success' && keywords.length > 0 && (
            <Suspense fallback={<LoadingSpinner />}>
              <div className="word-cloud-container">
                <WordCloud3D keywords={keywords} theme={theme} />
              </div>
            </Suspense>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
