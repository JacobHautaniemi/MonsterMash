@echo off
setlocal

REM Check for administrative privileges
openfiles >nul 2>&1
if %ERRORLEVEL% neq 0 (
    echo This script requires administrative privileges.
    echo Please restart this script as an administrator.
    pause
    exit /b 1
)

REM Function to check if a command exists
:command_exists
    where %1 >nul 2>&1
    if %ERRORLEVEL% neq 0 (
        exit /b 1
    ) else (
        exit /b 0
    )

REM Check for Node.js
call :command_exists node
if %ERRORLEVEL% neq 0 (
    echo Node.js is not installed.
    echo Downloading and installing Node.js...
    
    REM Download Node.js installer
    curl -o nodejs-installer.msi https://nodejs.org/dist/v16.17.1/node-v16.17.1-x64.msi

    REM Install Node.js
    msiexec /i nodejs-installer.msi /quiet /norestart

    REM Clean up installer
    del nodejs-installer.msi

    REM Verify installation
    call :command_exists node
    if %ERRORLEVEL% neq 0 (
        echo Node.js installation failed. Please install it manually from https://nodejs.org/
        pause
        exit /b 1
    ) else (
        echo Node.js installed successfully.
    )
)

REM Check for npm
call :command_exists npm
if %ERRORLEVEL% neq 0 (
    echo npm is not installed.
    REM npm is included with Node.js, so this should be rare.
    echo Please ensure npm is installed properly.
    pause
    exit /b 1
)

REM Install dependencies
echo Installing dependencies...
npm install

REM Run the application
echo Starting the application...
npm run dev

endlocal
pause
