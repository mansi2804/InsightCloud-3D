import { useState } from 'react';
import type { AnalyzeStatus } from '../types';

interface UrlFormProps {
    onAnalyze: (url: string) => Promise<void>;
    status: AnalyzeStatus;
    error?: string;
}

const SAMPLE_URLS = [
    {
        name: 'BBC Tech',
        url: 'https://www.bbc.com/news/technology-56901363'
    },
    {
        name: 'NASA Climate',
        url: 'https://climate.nasa.gov/news/3278/nasa-scientists-make-first-observation-of-a-polar-cyclone-on-uranus/'
    },
    {
        name: 'Space.com',
        url: 'https://www.space.com/james-webb-space-telescope-early-universe-discoveries'
    }
];

export function UrlForm({ onAnalyze, status, error }: UrlFormProps) {
    const [url, setUrl] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (url) {
            await onAnalyze(url);
        }
    };

    const handleSampleUrl = async (sampleUrl: string) => {
        setUrl(sampleUrl);
        await onAnalyze(sampleUrl);
    };

    return (
        <div className="url-form">
            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <input
                        type="url"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        placeholder="Enter article URL..."
                        required
                        disabled={status === 'loading'}
                    />
                    <button 
                        type="submit"
                        disabled={status === 'loading' || !url}
                    >
                        {status === 'loading' ? 'Analyzing...' : 'Analyze'}
                    </button>
                </div>
            </form>

            <div className="sample-urls">
                <p>Or try these samples:</p>
                <div className="sample-buttons">
                    {SAMPLE_URLS.map((sample) => (
                        <button
                            key={sample.name}
                            onClick={() => handleSampleUrl(sample.url)}
                            disabled={status === 'loading'}
                        >
                            {sample.name}
                        </button>
                    ))}
                </div>
            </div>

            {error && <div className="error-message">{error}</div>}
        </div>
    );
}