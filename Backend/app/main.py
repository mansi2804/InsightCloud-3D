from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from .utils import fetch_article

app = FastAPI(title="InsightCloud-3D API")

# Configure CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Vite default dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
async def health_check():
    """Health check endpoint to verify API is running"""
    return {"status": "healthy", "service": "InsightCloud-3D API"}
