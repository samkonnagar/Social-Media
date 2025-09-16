@echo off
:: Open VS Code without leaving a terminal open
start "" cmd /c "code ."

:: Open backend server (terminal stays open)
start "BackendTerminal" cmd /k "cd backend && npm run dev"

:: Open frontend server (terminal stays open)
start "FrontendTerminal" cmd /k "cd frontend && npm run dev"

:: Open Chrome
start "" chrome http://localhost:5173


