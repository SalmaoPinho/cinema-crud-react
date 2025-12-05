@echo off
echo ========================================
echo   Cinema CRUD - Instalacao Completa
echo ========================================
echo.

echo [1/4] Instalando dependencias da raiz...
call npm install
if %errorlevel% neq 0 (
    echo ERRO: Falha ao instalar dependencias da raiz
    pause
    exit /b 1
)
echo.

echo [2/4] Instalando dependencias do frontend...
cd frontend
call npm install
if %errorlevel% neq 0 (
    echo ERRO: Falha ao instalar dependencias do frontend
    cd ..
    pause
    exit /b 1
)
cd ..
echo.

echo [3/4] Instalando dependencias do backend...
cd backend
call npm install
if %errorlevel% neq 0 (
    echo ERRO: Falha ao instalar dependencias do backend
    cd ..
    pause
    exit /b 1
)
echo.

echo [4/4] Configurando banco de dados...
echo Gerando Prisma Client...
call npx prisma generate
if %errorlevel% neq 0 (
    echo ERRO: Falha ao gerar Prisma Client
    cd ..
    pause
    exit /b 1
)
echo.

echo Criando banco de dados...
call npx prisma migrate dev --name init
if %errorlevel% neq 0 (
    echo ERRO: Falha ao criar banco de dados
    cd ..
    pause
    exit /b 1
)
cd ..
echo.

echo ========================================
echo   Instalacao concluida com sucesso!
echo ========================================
echo.
echo Para iniciar o projeto, execute: start.bat
echo Ou execute manualmente: npm run dev
echo.
pause
