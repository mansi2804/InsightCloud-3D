# InsightCloud-3D Frontend

Interactive 3D word cloud visualization built with React, TypeScript, and Three.js

## 🚀 Features

- **3D Word Cloud**: Interactive visualization of article topics
- **Responsive Design**: Works across desktop and tablet devices
- **Theme Support**: Dark and light mode with smooth transitions
- **Real-time Interaction**: Hover and click effects with tooltips
- **Sample Articles**: Quick start with pre-loaded examples
- **Loading States**: Visual feedback during data fetching

## 🛠 Tech Stack

- **React 19**: UI library with hooks
- **TypeScript**: Type-safe JavaScript
- **Vite**: Next-generation frontend tooling
- **React Three Fiber**: 3D rendering with Three.js
- **Tailwind CSS**: Utility-first CSS framework
- **Axios**: Promise-based HTTP client
- **ESLint**: Code quality and consistency

## 📦 Prerequisites

- Node.js 18+
- npm or yarn

## 🚀 Getting Started

### Installation

1. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

2. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

3. Open [http://localhost:5173](http://localhost:5173) in your browser

### Environment Variables

Create a `.env` file in the project root with the following variables:

```env
VITE_API_BASE_URL=http://localhost:8000
```

## 🏗 Project Structure

```
src/
├── assets/          # Static assets (images, fonts, etc.)
├── components/      # Reusable React components
│   ├── ui/          # UI components (buttons, inputs, etc.)
│   ├── WordCloud3D/ # 3D word cloud visualization
│   └── ...
├── lib/            # Utility functions and API clients
├── styles/         # Global styles and theme configuration
└── types/          # TypeScript type definitions
```

## 🧪 Testing

Run the test suite:

```bash
npm test
# or
yarn test
```

## 🏗 Building for Production

```bash
npm run build
# or
yarn build
```

This will create a production-ready build in the `dist` directory.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
