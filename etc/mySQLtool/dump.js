//console.log(require('dotenv').config());
var dotenv = require('dotenv').config({path: __dirname + '/.env'})
const { exec } = require('child_process');

// Database connection settings.
let exportFrom = {

    exportPath: process.env.DUMPARCHIVIEPATH_EXPORT,

	host: process.env.DUMPHOST_EXPORT,
	user: process.env.DUMPUSER_EXPORT,
    password: process.env.DUMPPASSWORD_EXPORT,
    database: process.env.DUMPDATABASE_EXPORT,
    pathmysqlcmd: process.env.PATHMYSQLCMD_EXPORT
}
let importTo = {
	host: process.env.DUMPHOST_IMPORT,
	user: process.env.DUMPUSER_IMPORT,
	password: process.env.DUMPPASSWORD_IMPORT,
    database: process.env.DUMPDATABASE_IMPORT,
    fileDump: process.env.DUMPFILE_IMPORT,
    pathMySQLcmd: process.env.PATHMYSQLCMD_IMPORT
}
  var myArgs = process.argv.slice(2);
//console.log('myArgs: ', myArgs);

switch (myArgs[0]) {
case '--export':
        let dumpFile = exportFrom.exportPath+new Date().getTime() +'_AN_dump.sql';	
        console.log("Path dump EXPORT: "+dumpFile);
    console.log(`Starting exporting data from the ${exportFrom.database} database. Path dump EXPORT: `+dumpFile);
    exec(`${exportFrom.pathmysqlcmd} --user=${exportFrom.user} --host=${exportFrom.host} --password=${exportFrom.password} --protocol=tcp --port=3306 --default-character-set=utf8 --single-transaction=TRUE --skip-triggers ${exportFrom.database} > ${dumpFile}`, (err, stdout, stderr) => 
{
	if (err) { console.error(`exec error: ${err}`); return; }	
});
    break;
case '--import':
        let importFile  ='';

    if(myArgs[1]===undefined)
    importFile    = +myArgs[0] || importTo.fileDump;
    else importFile    = myArgs[1] || importTo.fileDump;
    console.log(`Now, importing data to the ${importFile} database`);
    exec(`${importTo.pathMySQLcmd} --protocol=tcp --host=${importTo.host} --password=${importTo.password} --user=${importTo.user} --port=3306 --default-character-set=utf8 --comments  ${importTo.database} < ${importFile}`, (err, stdout, stderr) => {
        if (err) { console.error(`exec error: ${err}`); return; }

        console.log(`The import has finished.`);
    }); 
    break;
default:
    console.log('Sorry, that is not something I know how to do.');
    console.log('- Configure .env file');
    console.log('Usage: for export: node dump.js --export');
    console.log('Usage: for import: node dump.js --import  -->default value DUMPFILE_IMPORT');
    console.log('Usage: for import: node dump.js --import dump.sql -->PATH FOLDER: dumps/');

}
