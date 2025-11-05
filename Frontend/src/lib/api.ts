import axios from 'axios';
import type { KeywordData, APIError } from '../types';

const API_BASE_URL = 'http://localhost:8000';

export const analyzeArticle = async (url: string): Promise<KeywordData[]> => {
    try {
        const response = await axios.post<KeywordData[]>(`${API_BASE_URL}/analyze`, {
            url
        });
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response?.data) {
            const apiError = error.response.data as APIError;
            throw new Error(apiError.detail || 'Failed to analyze article');
        }
        throw new Error('Network error occurred');
    }
};