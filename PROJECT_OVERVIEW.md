# Prompt2Mesh - Project Overview

## What is Prompt2Mesh?

Prompt2Mesh is a full-stack web application that converts text descriptions into 3D models using AI. Simply describe what you want, and the AI generates a downloadable, interactive 3D model.

## Key Features

### 🎨 AI Model Generation
- Text-to-3D conversion using Meshy.ai API
- Multiple art styles: Realistic, Low-Poly, Stylized, Sculpture, PBR
- Multiple export formats: GLB, OBJ, FBX, USDZ

### 🔄 Interactive 3D Viewer
- Real-time 3D rendering with Three.js
- Rotate, zoom, and pan controls
- Auto-centered and auto-scaled models
- Professional lighting setup

### 💾 User Features
- Prompt history (saves last 5 prompts)
- Quick-start prompt templates
- One-click download
- Copy prompt functionality
- Real-time generation status

### 🎯 User Experience
- Dark theme AI-tool aesthetic
- Gradient accents and modern design
- Mobile-responsive interface
- Loading animations
- Error handling with retry options

## Architecture

### Frontend (React + Vite)
- **Components:**
  - `HomePage.jsx` - Main interface
  - `ModelViewer.jsx` - 3D rendering
  - `LoadingSpinner.jsx` - Loading states
  - `ErrorMessage.jsx` - Error display
  
- **Services:**
  - `api.js` - Backend communication

- **Styling:**
  - Tailwind CSS with custom configuration
  - Dark theme with primary blue accents
  - Responsive grid layout

### Backend (Node.js + Express)
- **Routes:**
  - `POST /api/generate` - Create generation task
  - `GET /api/status/:taskId` - Check task status
  - `GET /api/history` - Get generation history
  
- **Controllers:**
  - `modelController.js` - Request handling
  
- **Services:**
  - `meshyService.js` - Meshy.ai API integration

### API Flow

1. User enters prompt → Frontend sends to backend
2. Backend creates task with Meshy API → Returns task_id
3. Frontend polls status endpoint every 5 seconds
4. Backend checks Meshy API for task completion
5. When complete, model URL returned to frontend
6. Frontend loads model in Three.js viewer
7. User can download or generate another

## Technology Choices

### Why React + Vite?
- Fast development experience
- Hot module replacement
- Optimized production builds
- Modern tooling

### Why Three.js?
- Industry-standard 3D rendering
- Excellent GLB/GLTF support
- OrbitControls for easy interaction
- Active community and documentation

### Why Tailwind CSS?
- Rapid UI development
- Consistent design system
- Easy customization
- Small production bundle

### Why Express.js?
- Lightweight and flexible
- Easy API development
- Middleware support
- Large ecosystem

## Security Features

- API key stored in backend `.env` only
- Never exposed to frontend/client
- CORS properly configured
- Environment-based configuration
- Input validation on backend

## Performance Optimizations

- Lazy loading of 3D models
- Efficient polling mechanism
- Optimized Three.js rendering
- Debounced user inputs
- Minimal bundle size

## Future Enhancements

- Database for persistent history
- User authentication
- Model gallery
- Advanced editing tools
- Batch generation
- Payment integration
- Model remix/variations
- Social sharing

## Browser Compatibility

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers with WebGL support

## Development Workflow

1. Backend runs on port 5000
2. Frontend runs on port 5173
3. Vite proxies `/api` calls to backend
4. Hot reload on both sides
5. Console logging for debugging

## Production Readiness

✅ Environment configuration
✅ Error handling
✅ Input validation
✅ Secure API key management
✅ CORS configuration
✅ Production build scripts
✅ Deployment ready

## Getting Started

See [SETUP.md](SETUP.md) for installation instructions.
See [README.md](README.md) for detailed documentation.
