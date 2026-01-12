@echo off
echo ========================================
echo    Starting Prompt2Mesh Frontend
echo ========================================
echo.

cd frontend

if not exist node_modules (
    echo ERROR: Dependencies not installed!
    echo Please run install.bat first.
    pause
    exit /b 1
)

echo Starting frontend server on http://localhost:5173
echo.
call npm run dev
