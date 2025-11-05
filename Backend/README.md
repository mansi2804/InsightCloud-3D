# InsightCloud-3D Backend

> FastAPI backend service for article analysis and keyword extraction with TF-IDF

[![Python](https://img.shields.io/badge/Python-3.11+-blue.svg)](https://www.python.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.104.1-009688.svg)](https://fastapi.tiangolo.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## 🚀 Features

- **Article Extraction**: Clean text extraction from any news article URL
- **Keyword Analysis**: Advanced TF-IDF based keyword extraction
- **RESTful API**: Fully documented endpoints with OpenAPI
- **Input Validation**: Comprehensive request validation using Pydantic
- **CORS Support**: Pre-configured for frontend integration
- **Error Handling**: Meaningful error messages and status codes
- **Async Support**: Built with async/await for better performance

## 🔧 Tech Stack

- **Python 3.11+**: Core programming language
- **FastAPI**: Modern, fast web framework for building APIs
- **scikit-learn**: Machine learning for TF-IDF analysis
- **readability-lxml**: Article content extraction
- **beautifulsoup4**: HTML parsing and web scraping
- **uvicorn**: ASGI server for production
- **pydantic**: Data validation and settings management

## 📦 Prerequisites

- Python 3.11 or higher
- pip (Python package manager)
- virtualenv or venv (recommended)

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/InsightCloud-3D.git
   cd InsightCloud-3D/Backend
   ```

2. **Create and activate virtual environment**
   ```bash
   # Create virtual environment
   python -m venv venv
   
   # Activate virtual environment
   # On macOS/Linux:
   source venv/bin/activate
   # On Windows:
   .\venv\Scripts\activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

## 🚀 Running the Server

### Development Mode

```bash
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```

- API will be available at: http://localhost:8000
- Interactive API documentation: http://localhost:8000/docs
- Alternative documentation: http://localhost:8000/redoc

### Production Mode

For production deployments, consider using:

```bash
uvicorn app.main:app --host 0.0.0.0 --port 8000 --workers 4
```

## 📚 API Documentation

### Endpoints

#### Analyze Article
- **URL**: `/api/analyze`
- **Method**: `POST`
- **Request Body**:
  ```json
  {
    "url": "https://example.com/article"
  }
  ```
- **Success Response**:
  ```json
  {
    "status": "success",
    "keywords": [
      {"word": "example", "weight": 0.95},
      {"word": "analysis", "weight": 0.87}
    ],
    "title": "Article Title",
    "summary": "Extracted article summary..."
  }
  ```

## 🧪 Testing

Run the test suite:

```bash
pytest
```

## 🐳 Docker Support

Build and run with Docker:

```bash
# Build the image
docker build -t insightcloud-backend .

# Run the container
docker run -d -p 8000:8000 insightcloud-backend
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

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