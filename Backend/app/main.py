from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from .utils import fetch_article
from .nlp import KeywordExtractor
from .schemas import ArticleRequest, KeywordResponse, ErrorResponse
from typing import List

app = FastAPI(
    title="InsightCloud-3D API",
    description="API for extracting and visualizing key topics from news articles"
)
keyword_extractor = KeywordExtractor()

# Configure CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:5174", "http://localhost:5175"],  # Vite dev server ports
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
async def health_check():
    """Health check endpoint to verify API is running"""
    return {"status": "healthy", "service": "InsightCloud-3D API"}

@app.post("/analyze", response_model=List[KeywordResponse])
async def analyze_article(article: ArticleRequest):
    """
    Analyze article URL and extract key topics with weights.
    
    Args:
        article: ArticleRequest containing the URL to analyze
        
    Returns:
        List[KeywordResponse]: List of keywords and their weights
        
    Raises:
        HTTPException: If URL is invalid or content processing fails
    """
    print(f"Received request for URL: {article.url}")
    try:
        # Fetch and clean article content
        print("Fetching article content...")
        content = fetch_article(str(article.url))
        print(f"Fetched content length: {len(content)} chars")
        
        # Ensure minimum content length
        if len(content.split()) < 100:
            print("Content too short")
            raise HTTPException(
                status_code=422,
                detail="Article content too short for meaningful analysis"
            )
            
        # Extract keywords
        print("Extracting keywords...")
        keywords = keyword_extractor.extract_keywords(content)
        print(f"Extracted {len(keywords)} keywords")
        
        return keywords
        
    except ValueError as e:
        print(f"ValueError: {str(e)}")
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        print(f"Error: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")

@app.exception_handler(HTTPException)
async def http_exception_handler(request, exc):
    """Custom exception handler to match ErrorResponse schema"""
    return JSONResponse(
        status_code=exc.status_code,
        content={"error": str(exc.status_code), "detail": exc.detail}
    )
