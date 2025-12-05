@echo off
echo ========================================
echo   Cinema CRUD - Setup e Inicializacao
echo ========================================
echo.

REM Verificar se ja foi instalado
if exist "backend\node_modules" (
    echo Dependencias ja instaladas. Pulando instalacao...
    goto :start_app
)

echo [PASSO 1/4] Instalando dependencias da raiz...
call npm install
if %errorlevel% neq 0 (
    echo ERRO: Falha ao instalar dependencias da raiz
    pause
    exit /b 1
)
echo.

echo [PASSO 2/4] Instalando dependencias do frontend...
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

echo [PASSO 3/4] Instalando dependencias do backend...
cd backend
call npm install
if %errorlevel% neq 0 (
    echo ERRO: Falha ao instalar dependencias do backend
    cd ..
    pause
    exit /b 1
)
echo.

echo [PASSO 4/4] Configurando banco de dados...
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
echo   Instalacao concluida!
echo ========================================
echo.

:start_app
echo ========================================
echo   Iniciando Aplicacao...
echo ========================================
echo.
echo Backend: http://localhost:4000
echo Frontend: http://localhost:5173
echo.
echo Pressione Ctrl+C para parar os servidores
echo.
echo ========================================
echo.

call npm run dev
