export interface KeywordData {
    word: string;
    weight: number;
}

export interface APIError {
    error: string;
    detail: string;
}

export type AnalyzeStatus = 'idle' | 'loading' | 'success' | 'error';