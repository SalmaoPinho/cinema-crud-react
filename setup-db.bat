@echo off
echo ========================================
echo   Cinema CRUD - Setup do Banco de Dados
echo ========================================
echo.

cd backend

echo [1/2] Gerando Prisma Client...
call npx prisma generate
if %errorlevel% neq 0 (
    echo ERRO: Falha ao gerar Prisma Client
    cd ..
    pause
    exit /b 1
)
echo.

echo [2/2] Criando/Atualizando banco de dados...
call npx prisma migrate dev
if %errorlevel% neq 0 (
    echo ERRO: Falha ao executar migrations
    cd ..
    pause
    exit /b 1
)
echo.

cd ..

echo ========================================
echo   Banco de dados configurado!
echo ========================================
echo.
echo Para abrir o Prisma Studio, execute: prisma-studio.bat
echo.
pause
