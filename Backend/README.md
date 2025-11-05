# InsightCloud-3D Backend

FastAPI backend service for article analysis and keyword extraction.

## 🚀 Features

- Article text extraction
- Topic/keyword analysis using TF-IDF
- RESTful API with error handling
- Comprehensive input validation
- CORS support for frontend
- Detailed API documentation

## 🔧 Tech Stack

- Python 3.8+
- FastAPI
- scikit-learn
- readability-lxml
- beautifulsoup4
- pydantic

## 📦 Prerequisites

- Python 3.8 or higher
- pip (Python package manager)
- virtualenv or venv

## 🛠️ Setup

1. Create a virtual environment:
```bash
python -m venv venv
```

2. Activate the virtual environment:
```bash
# On macOS/Linux:
source venv/bin/activate

# On Windows:
.\venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

## 🚀 Running the Server

Start the FastAPI server with uvicorn:
```bash
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```

The API will be available at http://localhost:8000

## 📂 Project Structure

```
Backend/
├── app/
│   ├── main.py          # FastAPI application and routes
│   ├── nlp.py           # Keyword extraction logic
│   ├── schemas.py       # Pydantic models
│   ├── utils.py         # Helper functions
│   └── test_data.py     # Sample data for testing
├── requirements.txt     # Python dependencies
└── README.md           # This file
```

## 📚 API Documentation

When the server is running, visit:
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## 🔄 API Endpoints

### Health Check
```
GET /health
Response: { "status": "healthy", "service": "InsightCloud-3D API" }
```

### Analyze Article
```
POST /analyze
Request: { "url": "https://example.com/article" }
Response: [{ "word": "example", "weight": 0.8 }, ...]
```

## ⚠️ Error Handling

The API provides detailed error responses:

- 400: Invalid URL or request
- 422: Article content too short
- 500: Internal server error

## 🧪 Text Processing

1. Article Extraction:
   - Uses readability-lxml for content extraction
   - Removes ads and navigation elements
   - Handles various HTML encodings

2. Text Cleaning:
   - Lowercase conversion
   - Special character removal
   - Whitespace normalization
   - Number removal

3. Keyword Extraction:
   - TF-IDF vectorization
   - English stopwords removal
   - Unigram and bigram support
   - Score normalization (0.1-1.0)
   - Configurable keyword count

## 🔒 CORS Configuration

CORS is enabled for the frontend origin (http://localhost:5173)