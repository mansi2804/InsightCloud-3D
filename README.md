<div align="center">
  <h1>InsightCloud-3D</h1>
  <p>Transform articles into interactive 3D word clouds with real-time visualization</p>
  
  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
  [![Python](https://img.shields.io/badge/Python-3.11+-blue.svg)](https://www.python.org/)
  [![React](https://img.shields.io/badge/React-19.x-61DAFB.svg)](https://reactjs.org/)
  [![FastAPI](https://img.shields.io/badge/FastAPI-0.104.1-009688.svg)](https://fastapi.tiangolo.com/)
</div>

## 🌟 Features

- **Article Analysis**: Extract and process content from any news article URL
- **3D Visualization**: Interactive 3D word cloud powered by Three.js
- **Smart Keyword Extraction**: Advanced NLP techniques to identify key topics
- **Responsive Design**: Works on desktop and tablet devices
- **Dark/Light Mode**: Toggle between themes for comfortable viewing
- **Real-time Interaction**: Hover and click effects with detailed tooltips
- **Sample Articles**: Quick start with pre-loaded example articles

## 🏗️ Tech Stack

### Backend
- **Python 3.11+**: Core programming language
- **FastAPI**: High-performance web framework
- **scikit-learn**: Machine learning for TF-IDF analysis
- **readability-lxml**: Article content extraction
- **uvicorn**: ASGI server

### Frontend
- **React 19**: UI library
- **TypeScript**: Type-safe JavaScript
- **Vite**: Next-generation frontend tooling
- **React Three Fiber**: 3D visualization
- **Tailwind CSS**: Utility-first CSS framework
- **Axios**: HTTP client

## 🚀 Quick Start

### Prerequisites

- Python 3.11+
- Node.js 18+
- npm or yarn

### Backend Setup

```bash
# Navigate to backend directory
cd Backend

# Create and activate virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: .\venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Start the development server
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```

The API will be available at `http://localhost:8000` with interactive documentation at `http://localhost:8000/docs`

### Frontend Setup

```bash
# Navigate to frontend directory
cd Frontend
npm install
npm run dev
```

3. Open http://localhost:5173 in your browser

## 📚 Documentation

- Backend API docs: http://localhost:8000/docs
- Backend ReDoc: http://localhost:8000/redoc
- Frontend README: [Frontend/README.md](Frontend/README.md)
- Backend README: [Backend/README.md](Backend/README.md)

## 🔧 Tech Stack

### Backend
- FastAPI
- uvicorn
- scikit-learn
- readability-lxml
- beautifulsoup4
- pydantic

### Frontend
- React
- TypeScript
- Vite
- Three.js
- React Three Fiber
- React Three Drei
- Axios

## 📝 License

MIT License
