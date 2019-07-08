require('dotenv').config({path: '../.env'});
//var dotenv = require('dotenv').config({path: __dirname + '/.env'})
const { exec } = require('child_process');
let operationType ="";
// Where would the file be located?
let dumpFile = 'dumps\\'+new Date().getTime() +'_AN_dump.sql';	
console.log("Path dump EXPORT: "+dumpFile);
// Database connection settings.
let exportFrom = {
	host: process.env.HOST,
	user: process.env.USER,
	password: process.env.PASSWORD,
	database: process.env.DATABASE
}
let importTo = {
	host: process.env.HOST,
	user: process.env.USER,
	password: process.env.PASSWORD,
	database: process.env.DATABASE
}

process.argv.forEach(function (val, index, array) {
    console.log(index + ': ' + val);
    operationType=val;
  });

if("--export"===operationType){

    console.log(`Starting exporting data from the ${exportFrom.database} database`);

// Execute a MySQL Dump and redirect the output to the file in dumpFile variable.
//C:\xampp\mysql\bin\mysqldump.exe --defaults-file="c:\users\fl\appdata\local\temp\tmpzsl0wv.cnf"  --user=${exportFrom.user} --host=${exportFrom.host} --protocol=tcp --port=3306 --default-character-set=utf8 --single-transaction=TRUE --skip-triggers "${exportFrom.database}"
//exec(`"C:\\xampp\\mysql\\bin\\mysqldump.exe" -u${exportFrom.user} -p${exportFrom.password} -h${exportFrom.host} --compact ${exportFrom.database} > ${dumpFile}`, (err, stdout, stderr) => {
//    exec(`"C:\\xampp\\mysql\\bin\\mysqldump.exe" --defaults-file="c:\\users\\fl\\appdata\\local\\temp\\tmpzsl0wv.cnf" --user=${exportFrom.user} --host=${exportFrom.host} --protocol=tcp --port=3306 --default-character-set=utf8 --single-transaction=TRUE --skip-triggers ${exportFrom.database} > ${dumpFile}`, (err, stdout, stderr) => {
exec(`"C:\\xampp\\mysql\\bin\\mysqldump.exe"  --user=${exportFrom.user} --host=${exportFrom.host} --password=${exportFrom.password} --protocol=tcp --port=3306 --default-character-set=utf8 --single-transaction=TRUE --skip-triggers ${exportFrom.database} > ${dumpFile}`, (err, stdout, stderr) => {
	if (err) { console.error(`exec error: ${err}`); return; }
	
	console.log(`Now, importing data to the ${importTo.database} database`);
}
//if("--import"===operationType){    
	// Import the database.
/* 	exec(`mysql -u${importTo.user} -p${importTo.password} -h${importTo.host} ${importTo.database} < ${dumpFile}`, (err, stdout, stderr) => {
        if (err) { console.error(`exec error: ${err}`); return; }

        console.log(`The import has finished.`);
    }); */
//}

});