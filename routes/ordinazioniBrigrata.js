const fs = require('fs');

module.exports = {

  viewlistaOrdinazioniBriPage: (req, res) => {
    let queryVIEW = "SELECT idordine, DATE_FORMAT(dataordine, '%Y-%m-%d') as dataordine, costo, DATE_FORMAT(dataUM, '%Y-%m-%d')" +
      " as dataUM, stato, descrizione FROM angelina.an_ordini order by idordine DESC";
    console.log("query: " + queryVIEW);
    db.query(queryVIEW, (err, result) => {
      //console.log(result);
      if (err) {
        return res.status(500).send(err);
      }
      res.render('viewOrdinazioniBrigata.ejs', {
        title: "Welcome to ANies | Ordini"
        , ordine: result
        , message: ''
      });
    });
  },
  saveOrdinazioneBri: (req, res) => {
    /*    let schedaId = req.params.id;
      // let query = "SELECT * FROM angelina.an_schede WHERE idscheda = '" + schedaId + "' ";
               query ="SELECT * FROM angelina.an_dettaglioordine where idordine='" + schedaId + "' ";
       db.query(query, (err, result) => {
           console.log(result);
           if (err) {
               return res.status(500).send(err);
           }
           res.render('viewOrdinazioniById.ejs', {
               title: "Welcome to ANies | Ordini"
               ,ordine: result
               ,message: ''
           });
       }); */
  },
  viewDettaglioOrdinazioneBri: (req, res) => {
    let schedaId = req.params.id;
    // let query = "SELECT * FROM angelina.an_schede WHERE idscheda = '" + schedaId + "' ";
    query = " SELECT idDettaglioOrdine, tipo, quantita, prezzo, utente, a.articolo, a.prezzounitario , f.ragionesociale" +
      " FROM angelina.an_dettaglioordine doo" +
      " LEFT JOIN angelina.an_articoli a on doo.idarticolo = a.idarticolo" +
      " LEFT JOIN angelina.an_fornitori f on a.ksfornitore = f.idfornitore" +
      " where idOrdine= '" + schedaId + "' ";
    db.query(query, (err, result) => {
      console.log(query);
      if (err) {
        return res.status(500).send(err);
      }

      res.render('viewOrdinazioniByIdBrigata.ejs', {
        title: "Welcome to ANies | Ordini"
        , ordine: result
        , message: ''
      });
    });
  }
}