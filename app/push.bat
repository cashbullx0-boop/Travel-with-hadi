@echo off
cd /d "%~dp0"
echo Pushing changes to GitHub...
git add .
git commit -m "Update website"
git push origin main
echo.
echo Done! Window band karne ke liye koi key dabao.
