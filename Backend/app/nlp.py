from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.preprocessing import MinMaxScaler
import numpy as np
from typing import List, Dict, Tuple

from collections import Counter
import re

class KeywordExtractor:
    def __init__(self, max_keywords: int = 40):
        """
        Initialize simple keyword extractor.
        
        Args:
            max_keywords: Maximum number of keywords to extract
        """
        self.max_keywords = max_keywords
        self.stop_words = {'a', 'an', 'and', 'are', 'as', 'at', 'be', 'by', 'for',
                          'from', 'has', 'he', 'in', 'is', 'it', 'its', 'of', 'on',
                          'that', 'the', 'to', 'was', 'were', 'will', 'with'}
        
    def extract_keywords(self, text: str) -> List[Dict[str, float]]:
        """
        Extract keywords using word frequency.
        
        Args:
            text: Cleaned article text
            
        Returns:
            List of dicts with 'word' and 'weight' keys, sorted by weight
        """
        if not text or len(text.split()) < 3:
            raise ValueError("Text is too short for keyword extraction")
            
        # Split into words and filter
        words = [word.lower() for word in re.findall(r'\b[a-zA-Z][a-zA-Z\']+\b', text)]
        words = [word for word in words if word not in self.stop_words]
        
        # Count word frequencies
        word_counts = Counter(words)
        
        # Get top words
        top_words = word_counts.most_common(self.max_keywords)
        
        if not top_words:
            raise ValueError("No valid keywords found in text")
            
        # Normalize weights to 0.1-1.0 range
        max_count = top_words[0][1]
        min_count = top_words[-1][1]
        
        def normalize(count):
            if max_count == min_count:
                return 1.0
            return 0.1 + 0.9 * (count - min_count) / (max_count - min_count)
        
        results = [
            {"word": word, "weight": normalize(count)}
            for word, count in top_words
        ]
        
        return results