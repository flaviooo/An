const fs = require('fs');

module.exports = {

    viewSchedaOrdinePage: (req, res) => {
        let playerId = req.params.id;
       // let query = "SELECT * FROM angelina.an_schede WHERE idscheda = '" + schedaId + "' ";
        query = " SELECT idscheda, tipo, ragionesociale, articolo"+
                " FROM angelina.an_schede s"+
                " LEFT JOIN angelina.an_fornitori f on s.ksfornitore = f.idfornitore"+
                " LEFT JOIN angelina.an_articoli a on s.ksarticolo = a.idarticolo  where tipo ='Antipasti'";
        db.query(query, (err, result) => {
            console.log(result);
            if (err) {
                return res.status(500).send(err);
            }
            res.render('viewSchedaById.ejs', {
                title: "Welcome to ANies | Ordini"
                ,ordine: result
                ,message: ''
            });
        });
},
saveSchedaOrdinePage: (req, res) => {
    let playerId = req.params.id;
   // let query = "SELECT * FROM angelina.an_schede WHERE idscheda = '" + schedaId + "' ";
    query = " SELECT idscheda, tipo, ragionesociale, articolo"+
            " FROM angelina.an_schede s"+
            " LEFT JOIN angelina.an_fornitori f on s.ksfornitore = f.idfornitore"+
            " LEFT JOIN angelina.an_articoli a on s.ksarticolo = a.idarticolo  where tipo ='Antipasti'";
    db.query(query, (err, result) => {
        console.log(result);
        if (err) {
            return res.status(500).send(err);
        }
        res.render('viewSchedaById.ejs', {
            title: "Welcome to ANies | Ordini"
            ,ordine: result
            ,message: ''
        });
    });
}
}