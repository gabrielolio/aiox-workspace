@echo off
echo Sincronizando outputs AIOX para o vault...
python C:\Users\Gabriel\aiox-workspace\tools\aiox_to_vault.py
echo.
echo Fazendo commit no vault...
cd C:\Users\Gabriel\personal-vault
git add 00-Inbox\aiox-outputs\
git commit -m "vault: novos outputs AIOX %date%"
git push origin master
echo.
echo Feito! Abra o Obsidian para ver as novas notas.
pause
