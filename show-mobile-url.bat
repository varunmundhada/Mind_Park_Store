@echo off
echo.
echo ========================================
echo   Mind Park Store - Mobile Access
echo ========================================
echo.
echo Getting your network IP address...
echo.
node get-network-ip.js
echo.
echo ========================================
echo.
echo Next steps:
echo 1. Update server/.env with the CLIENT_URL shown above
echo 2. Run: npm run dev
echo 3. Open the Frontend URL on your phone
echo.
pause
