# 🎨 Prompt2Mesh - Complete Installation Guide

Welcome! You've successfully received all the project files. Follow this guide to get your AI-powered 3D generator running.

## 📦 What You Have

Your `prompt2mesh` folder contains a complete, production-ready application:

```
prompt2mesh/
├── backend/          # Node.js + Express API server
├── frontend/         # React + Vite web application
├── README.md         # Detailed documentation
├── SETUP.md          # Quick setup guide
├── PROJECT_OVERVIEW.md  # Architecture details
├── install.bat       # Automated installation script
├── start-backend.bat # Start backend server
└── start-frontend.bat # Start frontend server
```

## ⚡ Quick Installation (Windows)

### Option 1: Automated Setup (Recommended)

1. **Double-click `install.bat`**
   - This will install all dependencies automatically
   - Takes 2-5 minutes depending on your internet speed

2. **Get your Meshy API Key**
   - Go to [https://www.meshy.ai/](https://www.meshy.ai/)
   - Sign up or log in
   - Navigate to your API settings
   - Copy your API key

3. **Configure the API Key**
   - Open `backend\.env` in a text editor
   - Replace `your_meshy_api_key_here` with your actual key
   - Save the file

4. **Start the Application**
   - Double-click `start-backend.bat` (keep this window open)
   - Double-click `start-frontend.bat` (keep this window open)
   - Open your browser to `http://localhost:5173`

### Option 2: Manual Setup

If you prefer manual installation or the batch files don't work:

**Step 1: Install Backend**
```powershell
cd backend
npm install
cp .env.example .env
# Edit .env and add your API key
```

**Step 2: Install Frontend**
```powershell
cd ../frontend
npm install
```

**Step 3: Start Backend (Terminal 1)**
```powershell
cd backend
npm start
```

**Step 4: Start Frontend (Terminal 2)**
```powershell
cd frontend
npm run dev
```

**Step 5: Open Browser**
```
http://localhost:5173
```

## 🎯 Using the Application

1. **Enter a text description**
   - Example: "A futuristic sports car with neon lights"
   - Be specific for best results

2. **Choose style and format**
   - Style: Realistic, Low-Poly, Stylized, etc.
   - Format: GLB (recommended), OBJ, FBX, USDZ

3. **Generate**
   - Click "Generate 3D Model"
   - Wait 1-3 minutes for AI generation

4. **View & Download**
   - Rotate, zoom, and pan your model
   - Download when ready

## 📚 Documentation

- **[README.md](README.md)** - Complete documentation with all features
- **[SETUP.md](SETUP.md)** - Quick setup reference
- **[PROJECT_OVERVIEW.md](PROJECT_OVERVIEW.md)** - Architecture and technical details

## ✅ Requirements

- **Node.js 18+** - [Download](https://nodejs.org/)
- **Meshy.ai API Key** - [Get Key](https://www.meshy.ai/)
- **Modern Browser** - Chrome, Firefox, Safari, or Edge

## 🐛 Common Issues

### "Cannot find module" error
```powershell
# Run in backend and frontend directories:
npm install
```

### "Port already in use"
- Backend uses port 5000
- Frontend uses port 5173
- Close other applications using these ports

### "API key invalid"
- Check your `.env` file in the backend folder
- Ensure no extra spaces around the API key
- Restart the backend server after changing `.env`

### CORS errors
- Make sure both backend (5000) and frontend (5173) are running
- Check browser console for specific errors

## 🚀 Tech Stack

- **Frontend**: React 18, Vite, Three.js, Tailwind CSS
- **Backend**: Node.js, Express, Axios
- **API**: Meshy.ai Text-to-3D

## 🔒 Security

- ✅ API keys stored securely in backend only
- ✅ Environment variables for configuration
- ✅ CORS properly configured
- ✅ Input validation
- ✅ Error handling

## 🎨 Features

✨ AI-powered text-to-3D generation
✨ Multiple art styles and formats
✨ Interactive 3D viewer with controls
✨ Download generated models
✨ Prompt history and templates
✨ Real-time generation status
✨ Mobile-responsive design
✨ Dark theme UI

## 📞 Support

If you encounter issues:

1. Check the [troubleshooting section](README.md#-troubleshooting) in README.md
2. Verify all installation steps were completed
3. Ensure your Meshy API key is valid
4. Check that both servers are running

## 🎉 You're All Set!

Your complete AI 3D generator is ready to use. Start creating amazing 3D models from text descriptions!

**Need help?** Check the detailed [README.md](README.md) for more information.

---

**Built with ❤️ using React, Three.js, Node.js, and Meshy.ai**
