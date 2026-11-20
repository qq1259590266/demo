@echo off
setlocal
if not defined PORT set "PORT=8765"
cd /d "%~dp0"

rem --- pick a python interpreter ---
set "PY="
where python >nul 2>nul && set "PY=python"
if not defined PY ( where py >nul 2>nul && set "PY=py -3" )
if not defined PY if exist "%USERPROFILE%\.dsh\dsh-runtimes\dsh-primary-runtime\dependencies\python\python.exe" set "PY=%USERPROFILE%\.dsh\dsh-runtimes\dsh-primary-runtime\dependencies\python\python.exe"
if not defined PY (
    echo Python not found. Install Python 3 or add python.exe to PATH.
    pause
    exit /b 1
)

echo.
echo   Forest Nothing (Chinese) - local server
echo   ---------------------------------------------
echo   This computer :  http://127.0.0.1:%PORT%/
for /f "tokens=2 delims=:" %%a in ('ipconfig ^| findstr /c:"IPv4"') do (
    for /f "tokens=* delims= " %%b in ("%%a") do echo   LAN / phone   :  http://%%b:%PORT%/
)
echo   ---------------------------------------------
echo   Use the LAN address on your phone / other PC.
echo   Same Wi-Fi, not a guest network.
echo   Close this window or press Ctrl+C to stop.
echo.

%PY% -m http.server %PORT% --bind 0.0.0.0
echo.
echo Server stopped.
pause
