@echo off
echo Stopping servers...

:: Kill Node.js processes (backend & frontend) 
taskkill /F /IM node.exe /T

:: Kill only the backend terminal
taskkill /FI "WINDOWTITLE eq BackendTerminal" /F

:: Kill only the frontend terminal
taskkill /FI "WINDOWTITLE eq FrontendTerminal" /F

echo Done.
pause

