# 🎨 Prompt2Mesh - AI Text to 3D Generator

A production-ready full-stack web application that generates 3D models from text descriptions using the Meshy.ai API. Built with React, Three.js, Node.js, and Tailwind CSS.

![Prompt2Mesh Banner](https://img.shields.io/badge/AI-3D_Generation-blue) ![React](https://img.shields.io/badge/React-18.2-61dafb) ![Node.js](https://img.shields.io/badge/Node.js-Express-green) ![Three.js](https://img.shields.io/badge/Three.js-3D_Rendering-black)

## ✨ Features

- 🤖 **AI-Powered Generation**: Convert text prompts to 3D models using Meshy.ai
- 🎨 **Multiple Styles**: Realistic, Low-Poly, Stylized, Sculpture, PBR
- 📦 **Multiple Formats**: GLB, OBJ, FBX, USDZ
- 🔄 **Interactive 3D Viewer**: Rotate, zoom, and pan your models
- 📥 **Download Models**: Save your generated 3D models locally
- 💾 **Prompt History**: Auto-saves your last 5 prompts
- 🎯 **Prompt Templates**: Quick-start templates for inspiration
- 📱 **Responsive Design**: Works on desktop and mobile
- 🔒 **Secure**: API keys never exposed to frontend
- ⚡ **Real-time Status**: Live progress updates during generation

## 🛠️ Tech Stack

### Frontend
- **React 18.2** - UI framework
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first styling
- **Three.js** - 3D rendering engine
- **Axios** - HTTP client

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **Axios** - API requests
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variables

### API
- **Meshy.ai** - Text-to-3D generation API

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **npm** or **yarn** - Comes with Node.js
- **Meshy.ai API Key** - [Get your key](https://www.meshy.ai/)

## 🚀 Installation & Setup

### Step 1: Clone or Download the Project

If you haven't already, navigate to the project directory:

```bash
cd prompt2mesh
```

### Step 2: Backend Setup

1. **Navigate to backend directory:**

```bash
cd backend
```

2. **Install dependencies:**

```bash
npm install
```

3. **Configure environment variables:**

Create a `.env` file in the `backend` directory:

```bash
cp .env.example .env
```

4. **Edit the `.env` file:**

Open `.env` and add your Meshy API key:

```env
MESHY_API_KEY=your_actual_meshy_api_key_here
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

**To get your Meshy API key:**
- Go to [https://www.meshy.ai/](https://www.meshy.ai/)
- Sign up or log in
- Navigate to API settings
- Copy your API key

### Step 3: Frontend Setup

1. **Open a new terminal and navigate to frontend directory:**

```bash
cd frontend
```

2. **Install dependencies:**

```bash
npm install
```

### Step 4: Start the Application

You need to run both backend and frontend servers.

**Terminal 1 - Backend Server:**

```bash
cd backend
npm start
```

You should see:
```
🚀 Prompt2Mesh Backend running on http://localhost:5000
📊 Environment: development
🎨 CORS enabled for: http://localhost:5173
```

**Terminal 2 - Frontend Server:**

```bash
cd frontend
npm run dev
```

You should see:
```
  VITE v5.0.8  ready in 500 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

### Step 5: Open the Application

Open your browser and navigate to:

```
http://localhost:5173
```

## 🎯 Usage Guide

### Generating Your First 3D Model

1. **Enter a prompt** in the text area
   - Example: "A futuristic sports car with neon lights"
   - Be specific for better results
   - Maximum 500 characters

2. **Select your preferences:**
   - **Style**: Choose from Realistic, Low-Poly, Stylized, Sculpture, or PBR
   - **Format**: Select GLB (recommended), OBJ, FBX, or USDZ

3. **Click "Generate 3D Model"**
   - Generation takes 1-3 minutes
   - Progress is displayed in real-time

4. **View your model:**
   - Once complete, the 3D viewer loads automatically
   - Use mouse to interact:
     - **Left click + drag**: Rotate
     - **Right click + drag**: Pan
     - **Scroll**: Zoom

5. **Download your model:**
   - Click the "Download Model" button
   - File saves in your chosen format

### Tips for Better Results

- ✅ Be specific and descriptive
- ✅ Mention materials, colors, and style
- ✅ Use adjectives (e.g., "futuristic", "medieval", "cute")
- ❌ Avoid vague prompts like "a thing"
- ❌ Don't use overly complex sentences

### Example Prompts

- "A majestic dragon perched on a mountain peak"
- "A realistic wooden treasure chest with gold trim"
- "A cute robot character with big blue eyes"
- "A medieval castle with tall stone towers"
- "A modern ergonomic office chair"

## 📁 Project Structure

```
prompt2mesh/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   │   └── modelController.js    # Request handlers
│   │   ├── routes/
│   │   │   └── modelRoutes.js        # API routes
│   │   ├── services/
│   │   │   └── meshyService.js       # Meshy API integration
│   │   └── server.js                 # Express server
│   ├── .env.example
│   ├── .gitignore
│   └── package.json
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── HomePage.jsx          # Main page component
│   │   │   ├── ModelViewer.jsx       # 3D viewer component
│   │   │   ├── LoadingSpinner.jsx    # Loading animation
│   │   │   └── ErrorMessage.jsx      # Error display
│   │   ├── services/
│   │   │   └── api.js                # API client
│   │   ├── App.jsx                   # Root component
│   │   ├── main.jsx                  # Entry point
│   │   └── index.css                 # Global styles
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── .gitignore
│   └── package.json
│
└── README.md
```

## 🔌 API Endpoints

### Backend API

**Base URL:** `http://localhost:5000/api`

#### 1. Generate Model
```http
POST /api/generate
Content-Type: application/json

{
  "prompt": "A futuristic robot",
  "style": "realistic",
  "format": "glb"
}
```

**Response:**
```json
{
  "success": true,
  "taskId": "task_abc123",
  "message": "Model generation started",
  "estimatedTime": "1-3 minutes"
}
```

#### 2. Check Status
```http
GET /api/status/:taskId
```

**Response (In Progress):**
```json
{
  "taskId": "task_abc123",
  "status": "IN_PROGRESS",
  "progress": 45,
  "message": "Creating your 3D model..."
}
```

**Response (Completed):**
```json
{
  "taskId": "task_abc123",
  "status": "SUCCEEDED",
  "progress": 100,
  "message": "Your 3D model is ready!",
  "modelUrl": "https://...",
  "thumbnailUrl": "https://...",
  "modelUrls": {
    "glb": "https://...",
    "obj": "https://..."
  }
}
```

#### 3. Health Check
```http
GET /health
```

## 🎨 Customization

### Changing Colors

Edit [frontend/tailwind.config.js](frontend/tailwind.config.js):

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        500: '#your-color', // Change primary color
      }
    }
  }
}
```

### Modifying Styles

Global styles are in [frontend/src/index.css](frontend/src/index.css)

### Adding New Features

1. **Backend**: Add routes in `backend/src/routes/`
2. **Frontend**: Create components in `frontend/src/components/`
3. **API calls**: Update `frontend/src/services/api.js`

## 🐛 Troubleshooting

### Backend won't start
- ✅ Check if port 5000 is available
- ✅ Verify `.env` file exists with valid API key
- ✅ Run `npm install` in backend directory

### Frontend won't start
- ✅ Check if port 5173 is available
- ✅ Run `npm install` in frontend directory
- ✅ Clear cache: `npm run dev -- --force`

### "API key invalid" error
- ✅ Verify your Meshy API key is correct
- ✅ Check for extra spaces in `.env` file
- ✅ Restart backend server after changing `.env`

### CORS errors
- ✅ Ensure backend is running on port 5000
- ✅ Check `FRONTEND_URL` in `.env` matches frontend port
- ✅ Clear browser cache

### Model won't load in viewer
- ✅ Check browser console for errors
- ✅ Verify model URL is accessible
- ✅ Try a different browser
- ✅ Ensure WebGL is enabled in your browser

### Generation takes too long
- ⏱️ Normal generation time is 1-3 minutes
- ⏱️ Complex prompts may take longer
- ⏱️ Check your internet connection
- ⏱️ Verify Meshy.ai service status

## 🔒 Security Best Practices

- ✅ Never commit `.env` files to version control
- ✅ Keep API keys secret and secure
- ✅ Use environment variables for all sensitive data
- ✅ Implement rate limiting in production
- ✅ Add authentication for public deployments
- ✅ Use HTTPS in production

## 🚀 Deployment

### Backend Deployment (e.g., Railway, Render, Heroku)

1. Set environment variables in hosting platform
2. Set `NODE_ENV=production`
3. Update `FRONTEND_URL` to production URL

### Frontend Deployment (e.g., Vercel, Netlify)

1. Build the frontend:
```bash
cd frontend
npm run build
```

2. Deploy the `dist` folder
3. Update API URL if needed

### Environment Variables for Production

```env
# Backend
MESHY_API_KEY=your_api_key
PORT=5000
NODE_ENV=production
FRONTEND_URL=https://your-frontend-domain.com

# Frontend (if needed)
VITE_API_URL=https://your-backend-domain.com/api
```

## 📝 Development

### Backend Development Mode

Runs with auto-reload on file changes:

```bash
cd backend
npm run dev
```

### Frontend Development Mode

```bash
cd frontend
npm run dev
```

### Building for Production

```bash
cd frontend
npm run build
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- **Meshy.ai** - For providing the Text-to-3D API
- **Three.js** - For the amazing 3D rendering library
- **React & Vite** - For the excellent development experience
- **Tailwind CSS** - For the beautiful styling system

## 📧 Support

If you encounter any issues or have questions:

1. Check the [Troubleshooting](#-troubleshooting) section
2. Review [Meshy.ai Documentation](https://docs.meshy.ai/)
3. Open an issue on GitHub

## 🎉 Enjoy!

Start creating amazing 3D models from text! 🚀

---

**Built with ❤️ using React, Three.js, Node.js, and Meshy.ai**
