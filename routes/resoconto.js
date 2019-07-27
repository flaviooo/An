const fs = require('fs');

module.exports = {
//non usato
  viewResocontoOrdinazioniPage: (req, res) => {
    let ordineId = req.params.id;
    let queryVIEW = "SELECT idordine, DATE_FORMAT(dataordine, '%Y-%m-%d') as dataordine, costo, DATE_FORMAT(dataUM, '%Y-%m-%d')" +
      " as dataUM, stato, descrizione FROM angelina.an_ordini order by idordine DESC";
    console.log("query: " + queryVIEW);
    db.query(queryVIEW, (err, result) => {
      //console.log(result);
      if (err) {
        return res.status(500).send(err);
      }
      res.render('viewOrdinazioni.ejs', {
        title: "Welcome to ANies | Ordini"
        , ordine: result
        , message: ''
      });
    });
  },
   viewResocontoOrdinazioni: (req, res) => {
    let ordineId = req.params.id;
    let queryVIEW = "SELECT idDettaglioOrdine, tipo, quantita, prezzo, utente, a.articolo, a.prezzounitario , f.ragionesociale,  totDettaglio" +
    " FROM angelina.an_dettaglioordine doo " +
    " LEFT JOIN angelina.an_articoli a on doo.idarticolo = a.idarticolo " +
    " LEFT JOIN angelina.an_fornitori f on a.ksfornitore = f.idfornitore where idOrdine= '" + ordineId + "' and totDettaglio !=0";
    console.log("query: " + queryVIEW);
    db.query(queryVIEW, (err, result) => {
      //console.log(result);
      if (err) {
        return res.status(500).send(err);
      }
      res.render('viewOrdinazioniResocontoById.ejs', {
        title: "Welcome to ANies | Ordini"
        , ordine: result
        , message: ''
      });
    });
  },
  deleteOrdinazione: (req, res) => {
    let schedaId = req.params.id;
    let query = " DELETE FROM `angelina`.`an_ordini` WHERE (`idordine` = '" + schedaId + "')";
    console.log(query);
    db.query(query, (err, result) => {
    //  console.log(result);
      if (err) {
        return res.status(500).send(err);
      }
      /*      visualizzo la lita ordini*/
      res.redirect('/ordini');
      // module.exports.viewlistaOrdinazioniPage(req, res);
    });
  }
}