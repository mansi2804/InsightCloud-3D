# InsightCloud-3D

An interactive web application that visualizes topics from news articles as a 3D word cloud.

## 🌟 Features

- Enter any news article URL
- Automatic article text extraction
- Topic/keyword analysis using TF-IDF
- Interactive 3D word cloud visualization
- Hover effects and tooltips
- Sample articles for quick testing

## 🏗️ Architecture

The project consists of two main components:

### Backend (Python + FastAPI)
- Article text extraction using readability-lxml
- Topic extraction using scikit-learn TF-IDF
- RESTful API with error handling
- CORS enabled for frontend integration

### Frontend (React + Three.js)
- Built with Vite and TypeScript
- 3D visualization using React Three Fiber
- Interactive controls and animations
- Responsive design
- Loading states and error handling

## 📦 Prerequisites

- Python 3.8+
- Node.js 16+
- npm or yarn

## 🚀 Quick Start

1. Start the Backend:
```bash
cd Backend
python -m venv venv
source venv/bin/activate  # On Windows: .\venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```

2. Start the Frontend:
```bash
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