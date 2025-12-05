@echo off
echo ========================================
echo   Abrindo Prisma Studio...
echo ========================================
echo.
echo Prisma Studio: http://localhost:5555
echo.
echo Pressione Ctrl+C para fechar
echo.

cd backend
call npx prisma studio
cd ..
