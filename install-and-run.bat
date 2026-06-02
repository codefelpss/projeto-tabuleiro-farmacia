@echo off
REM Script de instalação do jogo Assistência Farmacêutica

echo.
echo ====================================
echo Instalando dependências...
echo ====================================
echo.

call npm install

if %errorlevel% neq 0 (
    echo.
    echo ❌ Erro na instalação de dependências
    pause
    exit /b 1
)

echo.
echo ====================================
echo Iniciando servidor de desenvolvimento...
echo ====================================
echo.

call npm run dev

pause
