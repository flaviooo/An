module.exports = {
    getHomePage: (req, res) => {
        let query = "SELECT idarticolo, articolo, f.ragionesociale, prezzounitario FROM angelina.an_articoli as a"+
         " LEFT JOIN angelina.an_fornitori f on a.ksfornitore = f.idfornitore;"; // query database to get all the players

        // execute query
        db.query(query, (err, result) => {
            if (err) {
                res.redirect('/');
            }
           console.log(result);
            res.render('index.ejs', {
                title: "Welcome to fl | View articoli ", articoli: result
            });
        });
    },
};