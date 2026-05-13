@echo off
chcp 65001 >nul
cd /d "C:\Users\28111\WorkBuddy\AI绘画助手"
"D:\微信文件\Git\cmd\git.exe" init
"D:\微信文件\Git\cmd\git.exe" add .
"D:\微信文件\Git\cmd\git.exe" commit -m "AI绘画提示词助手 v1.0"
"D:\微信文件\Git\cmd\git.exe" branch -M main
"D:\微信文件\Git\cmd\git.exe" remote add origin https://github.com/luchunyan-22/ai-art-assistant.git
"D:\微信文件\Git\cmd\git.exe" push -u origin main
pause
