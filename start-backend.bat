@echo off
echo ========================================
echo    Starting Prompt2Mesh Backend
echo ========================================
echo.

cd backend

if not exist node_modules (
    echo ERROR: Dependencies not installed!
    echo Please run install.bat first.
    pause
    exit /b 1
)

if not exist .env (
    echo ERROR: .env file not found!
    echo Please copy .env.example to .env and add your API key.
    pause
    exit /b 1
)

echo Starting backend server on http://localhost:5000
echo.
call npm start
