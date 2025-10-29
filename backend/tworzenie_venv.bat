@echo off
REM ==============================
REM  Skrypt inicjalizujący venv
REM ==============================

REM Przejdź do katalogu, w którym znajduje się ten plik
cd /d "%~dp0"

REM Nazwa katalogu z venv
set "VENV_DIR=.venv"

echo.
echo [1/5] Sprawdzanie srodowiska...

REM Jeśli venv nie istnieje — utwórz
if not exist "%VENV_DIR%\Scripts\python.exe" (
    echo Tworzenie nowego wirtualnego srodowiska...
    python -m venv "%VENV_DIR%"
    if errorlevel 1 (
        echo ❌ Blad podczas tworzenia venv!
        pause
        exit /b 1
    )
)

REM Aktywacja venv
echo.
echo [2/5] Aktywacja srodowiska...
call "%VENV_DIR%\Scripts\activate.bat"

REM Instalacja zależności
if exist "requirements.txt" (
    echo.
    echo [3/5] Instalacja pakietow z requirements.txt...
    pip install --upgrade pip
    pip install -r requirements.txt
) else (
    echo.
    echo [3/5] Brak pliku requirements.txt — pomijam.
)

echo.
echo [5/5] Zakonczono. Zamykam sie...
timeout /t 3 >nul
exit
