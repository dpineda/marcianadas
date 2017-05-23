echo "updating..."
git reset --hard HEAD
git pull origin master
npm install
echo "running the app..."
node cron