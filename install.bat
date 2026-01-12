@echo off
echo ========================================
echo    Prompt2Mesh - Installation Script
echo ========================================
echo.

echo [1/4] Installing Backend Dependencies...
cd backend
call npm install
if errorlevel 1 (
    echo ERROR: Backend installation failed!
    pause
    exit /b 1
)
echo ✓ Backend dependencies installed successfully!
echo.

echo [2/4] Setting up Backend Environment...
if not exist .env (
    copy .env.example .env
    echo ✓ Created .env file
    echo.
    echo ⚠️  IMPORTANT: Please edit backend\.env and add your Meshy API key!
    echo    Open backend\.env in a text editor and replace:
    echo    MESHY_API_KEY=your_meshy_api_key_here
    echo.
    pause
) else (
    echo ✓ .env file already exists
)
echo.

echo [3/4] Installing Frontend Dependencies...
cd ..\frontend
call npm install
if errorlevel 1 (
    echo ERROR: Frontend installation failed!
    pause
    exit /b 1
)
echo ✓ Frontend dependencies installed successfully!
echo.

echo [4/4] Installation Complete!
echo.
echo ========================================
echo    Next Steps:
echo ========================================
echo.
echo 1. Edit backend\.env and add your Meshy API key
echo    Get your key from: https://www.meshy.ai/
echo.
echo 2. Open TWO terminal windows:
echo.
echo    Terminal 1 - Start Backend:
echo    cd backend
echo    npm start
echo.
echo    Terminal 2 - Start Frontend:
echo    cd frontend
echo    npm run dev
echo.
echo 3. Open http://localhost:5173 in your browser
echo.
echo ========================================
echo.

cd ..
pause
