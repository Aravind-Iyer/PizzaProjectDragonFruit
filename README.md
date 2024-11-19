# PizzaProjectDragonFruit

**Installation**
1. https://github.com/coreybutler/nvm-windows/releases/tag/1.1.12 Install This and restart your IDE
2. Terminal in your IDE    nvm install v20.18.0
3. npm install
4. Then open the exe folder located in the dist folder 
5. If it doesn't work, you may need to rebuild
    a. npm rebuild
    b. npm run build

**Windows Security and Firewall Change
1. You May need open TCP port 1433 inbound rules

**To Access the website one you have ran the executable**
1. Visit http://localhost:3000/pages/home.html

If **Server Port 3000 Produces Error** erros such as already being used
1. CMD (Run as Admin)
2. netstat -ano | findstr :3000
      a. you need to have enabled netstat
4. taskkill /PID (Insert number that shows up) /F
5. npm run dev

**Login Instructions:**

* Username: admin
* Password: admin123
