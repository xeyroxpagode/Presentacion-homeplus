@echo off
setlocal
cd /d "%~dp0"
where node >nul 2>nul
if errorlevel 1 (
  echo.
  echo ERROR: Node.js no esta instalado.
  echo Instala Node.js LTS desde https://nodejs.org/ y volve a ejecutar este archivo.
  echo.
  pause
  exit /b 1
)

if not exist node_modules (
  echo Instalando dependencias por primera vez...
  call npx --yes pnpm@10.34.3 install
  if errorlevel 1 (
    echo.
    echo No se pudieron instalar las dependencias.
    pause
    exit /b 1
  )
)

start "" cmd /c "timeout /t 3 /nobreak >nul & start http://localhost:8443/"
echo.
echo HomePlus se esta ejecutando en http://localhost:8443/
echo No cierres esta ventana durante la presentacion.
echo.
call npx --yes pnpm@10.34.3 run dev
pause
