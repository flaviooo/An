# An_mysql-app"

# start : node app.js
# .start : NODE_ENV=development node app.js
. start : nodemon app.js


#INSTALL
mkdir node-mysql-crud-app 
cd node-mysql-crud-app 
npm init
npm install express express-favicon express-fileupload body-parser mysql ejs req-flash dotenv --save
npm install nodemon -g

@ DUMP
 var exec = require('child_process').exec;
var child = exec(' mysqldump -u root -p password angelina > dumpfilename.sql');

