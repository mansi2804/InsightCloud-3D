import requests
from bs4 import BeautifulSoup
from readability import Document
import re

def fetch_article(url: str) -> str:
    """
    Fetch article content from URL and extract main text using readability-lxml.
    
    Args:
        url: The URL of the article to fetch
        
    Returns:
        str: The cleaned main content of the article
        
    Raises:
        ValueError: If URL is invalid or content can't be fetched
    """
    try:
        # Add headers to mimic a browser request
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
        
        # Fetch the webpage
        response = requests.get(url, headers=headers, timeout=10)
        response.raise_for_status()
        
        # Parse with readability-lxml
        doc = Document(response.text)
        
        # Extract the main content
        content = doc.summary()
        
        # Use BeautifulSoup to clean HTML
        soup = BeautifulSoup(content, 'lxml')
        
        # Get text content
        text = soup.get_text()
        
        return clean_text(text)
        
    except requests.RequestException as e:
        raise ValueError(f"Failed to fetch article: {str(e)}")
    except Exception as e:
        raise ValueError(f"Error processing article content: {str(e)}")

def clean_text(text: str) -> str:
    """
    Clean and normalize article text.
    
    Args:
        text: Raw text content
        
    Returns:
        str: Cleaned and normalized text
    """
    # Convert to lowercase
    text = text.lower()
    
    # Remove extra whitespace
    text = ' '.join(text.split())
    
    # Remove special characters but keep apostrophes for contractions
    text = re.sub(r'[^a-z0-9\s\']', ' ', text)
    
    # Remove single quotes if they're not part of contractions
    text = re.sub(r'\s\'|\'\s', ' ', text)
    
    # Remove numbers
    text = re.sub(r'\d+', ' ', text)
    
    # Collapse multiple spaces
    text = re.sub(r'\s+', ' ', text)
    
    return text.strip()