@echo off
echo ========================================
echo   Cinema CRUD - Limpeza
echo ========================================
echo.
echo ATENCAO: Isso vai remover:
echo - node_modules (raiz, frontend, backend)
echo - dist (backend)
echo - Banco de dados SQLite
echo.
set /p confirm="Deseja continuar? (S/N): "
if /i not "%confirm%"=="S" (
    echo Operacao cancelada.
    pause
    exit /b 0
)
echo.

echo Removendo node_modules...
if exist node_modules rmdir /s /q node_modules
if exist frontend\node_modules rmdir /s /q frontend\node_modules
if exist backend\node_modules rmdir /s /q backend\node_modules
echo.

echo Removendo dist...
if exist backend\dist rmdir /s /q backend\dist
echo.

echo Removendo banco de dados...
if exist backend\dev.db del /q backend\dev.db
if exist backend\dev.db-journal del /q backend\dev.db-journal
if exist backend\prisma\migrations rmdir /s /q backend\prisma\migrations
echo.

echo ========================================
echo   Limpeza concluida!
echo ========================================
echo.
echo Para reinstalar, execute: install.bat
echo.
pause
