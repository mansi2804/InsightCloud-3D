from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.preprocessing import MinMaxScaler
import numpy as np
from typing import List, Dict, Tuple

class KeywordExtractor:
    def __init__(self, max_keywords: int = 40):
        """
        Initialize keyword extractor with TF-IDF.
        
        Args:
            max_keywords: Maximum number of keywords to extract
        """
        self.max_keywords = max_keywords
        self.vectorizer = TfidfVectorizer(
            stop_words='english',
            ngram_range=(1, 2),  # Allow single words and bigrams
            max_features=100,     # Initial larger pool of candidates
            token_pattern=r'[a-zA-Z][a-zA-Z\']+'  # Handle contractions
        )
        self.scaler = MinMaxScaler(feature_range=(0.1, 1.0))  # Scale weights between 0.1 and 1
        
    def extract_keywords(self, text: str) -> List[Dict[str, float]]:
        """
        Extract keywords and their weights using TF-IDF.
        
        Args:
            text: Cleaned article text
            
        Returns:
            List of dicts with 'word' and 'weight' keys, sorted by weight
        """
        # Handle empty or very short text
        if not text or len(text.split()) < 3:
            raise ValueError("Text is too short for keyword extraction")
            
        # Generate TF-IDF matrix
        try:
            tfidf_matrix = self.vectorizer.fit_transform([text])
        except ValueError as e:
            raise ValueError(f"Failed to process text: {str(e)}")
            
        # Get feature names (words/bigrams) and scores
        feature_names = self.vectorizer.get_feature_names_out()
        scores = tfidf_matrix.toarray()[0]
        
        # Create word-score pairs and sort by score
        word_scores = list(zip(feature_names, scores))
        word_scores.sort(key=lambda x: x[1], reverse=True)
        
        # Take top N keywords
        top_keywords = word_scores[:self.max_keywords]
        
        # Extract just the scores for normalization
        top_scores = np.array([score for _, score in top_keywords]).reshape(-1, 1)
        
        # Normalize scores to 0.1-1.0 range
        normalized_scores = self.scaler.fit_transform(top_scores).flatten()
        
        # Combine words with normalized scores
        results = [
            {"word": word, "weight": float(score)}
            for (word, _), score in zip(top_keywords, normalized_scores)
        ]
        
        return results