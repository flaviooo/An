var dotenv = require('dotenv').config({path: __dirname + '/.env'})
console.log(dotenv);
const express = require('express');
//const favicon = require('express-favicon');
var favicon = require('serve-favicon');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');
const app = express();
//const cors = require('cors')

const {getHomePage} = require('./routes/index');

const {addPlayerPage, addPlayer, deletePlayer, editPlayer, editPlayerPage} = require('./routes/player');
const {addSchedaPage, addScheda, deleteScheda, editScheda, editSchedaPage, viewScheda} = require('./routes/scheda');
const {viewSchedaOrdinePage,saveSchedaOrdinePage} = require('./routes/ordineScheda');
const {viewlistaOrdinazioniPage, viewDettaglioOrdinazione, creaOrdinazione, saveOrdinazione,deleteOrdinazione,setDettaglioOrdinazione} = require('./routes/ordinazioni');
const port = 3000;

if(process.env.NODE_ENV === 'production') {
    console.log('We are running in production mode');
} else {
    console.log('We are running in '+process.env.NODE_ENV+' mode');
}
const db = mysql.createConnection ({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});

// connect to database
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to database');
});
global.db = db;

// configure middleware
app.set('port', process.env.port || port); // set express to use this port
app.set('views', __dirname + '/views'); // set express to look in this folder to render our view
app.set('view engine', 'ejs'); // configure template engine
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // parse form data client
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(fileUpload()); // configure fileupload

// routes for the app

app.get('/', getHomePage);
app.get('/add', addSchedaPage);
app.get('/viewSchede', viewScheda);

app.get('/ordini', viewlistaOrdinazioniPage);
app.get('/ordini/viewDettaglioOrdinazione/:id', viewDettaglioOrdinazione);
//app.post('/ordini/viewDettaglioOrdinazione/:id/', setDettaglioOrdinazione);
app.post('/ordini/viewDettaglioOrdinazione/:id', viewDettaglioOrdinazione);
app.post('/ordini/viewDettaglioOrdinazione/:idOrdine', viewDettaglioOrdinazione);
app.post('/ordini/viewDettaglioOrdinazione/:id/:idOrdine/', setDettaglioOrdinazione);


app.get('/ordini/creaOrdinazione', creaOrdinazione);
app.post('/ordini/saveOrdinazione', saveOrdinazione);
app.get('/ordini/deleteOrdinazione/:id', deleteOrdinazione);


app.get('/viewSchedaOrdine', viewSchedaOrdinePage);
app.post('/viewSchedaOrdine/:id', saveSchedaOrdinePage);
app.get('/editScheda/:id', editSchedaPage);

app.post('/add', addScheda);

app.get('/delete/:id', deletePlayer);
app.post('/edit/:id', editPlayer);
// routes for the app
/*
app.get('/add', addPlayerPage);
app.get('/edit/:id', editPlayerPage);
app.get('/delete/:id', deletePlayer);
app.post('/add', addPlayer);
app.post('/edit/:id', editPlayer);
*/

// set the app to listen on the port
app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});