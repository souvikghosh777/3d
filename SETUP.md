# 🚀 Quick Start Guide

## Installation Steps

### 1. Install Backend Dependencies

```powershell
cd backend
npm install
```

### 2. Configure Environment Variables

```powershell
# Copy the example file
cp .env.example .env

# Edit .env and add your Meshy API key
notepad .env
```

Add your API key to the `.env` file:
```
MESHY_API_KEY=your_meshy_api_key_here
```

### 3. Install Frontend Dependencies

```powershell
cd ../frontend
npm install
```

### 4. Start the Application

Open two terminal windows:

**Terminal 1 (Backend):**
```powershell
cd backend
npm start
```

**Terminal 2 (Frontend):**
```powershell
cd frontend
npm run dev
```

### 5. Open in Browser

Navigate to: `http://localhost:5173`

## 🎯 First Steps

1. Enter a text description (e.g., "A futuristic robot")
2. Select style (Realistic recommended)
3. Select format (GLB recommended)
4. Click "Generate 3D Model"
5. Wait 1-3 minutes for generation
6. View and download your model!

## ❓ Need Help?

See the main [README.md](README.md) for detailed documentation.
