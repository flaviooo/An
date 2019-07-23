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
  /* addDettaglioOrdinazioneBri: (req, res) => {
    let schedaId = req.params.id;
    let idOrdine = req.params.idOrdine;
    let queryset = "UPDATE angelina.an_dettaglioordine SET quantita = quantita + 1 WHERE idDettaglioOrdine = '" + schedaId + "' ";
    db.query(queryset, (err, result) => {
      if (err) {
        return res.status(500).send(err);
      }
      //console.log(result);
      //let redirect = "/ordini/viewDettaglioOrdinazione/" + idOrdine;
      //console.log(redirect);
      //res.send({redirectUrl: redirect});
      //res.redirect(redirect);
      let schedaId = idOrdine;
      query = " SELECT idDettaglioOrdine, tipo, quantita, prezzo, utente, a.articolo, a.prezzounitario , f.ragionesociale" +
        " FROM angelina.an_dettaglioordine doo" +
        " LEFT JOIN angelina.an_articoli a on doo.idarticolo = a.idarticolo" +
        " LEFT JOIN angelina.an_fornitori f on a.ksfornitore = f.idfornitore" +
        " where '" + schedaId + "' ";
      db.query(query, (err, result) => {
        //  console.log(result);
        if (err) {
          return res.status(500).send(err);
        }

        res.render('viewOrdinazioniByIdBrigata.ejs', {
          title: "Welcome to ANies | Ordini"
          , ordine: result
          , message: ''
        });
      });
    });
  },
  subDettaglioOrdinazioneBri: (req, res) => {
    let schedaId = req.params.id;
    let idOrdine = req.params.idOrdine;
    let queryset = "UPDATE angelina.an_dettaglioordine SET quantita = quantita - 1 WHERE idDettaglioOrdine = '" + schedaId + "' ";
    db.query(queryset, (err, result) => {
      if (err) {
        return res.status(500).send(err);
      }
     console.log(queryset);
      let redirect = "/ordini/viewDettaglioOrdinazione/" + idOrdine;
      console.log(redirect);
      //res.send({redirectUrl: redirect});
      //res.redirect(redirect);
      let schedaId = idOrdine;
      query = " SELECT idDettaglioOrdine, tipo, quantita, prezzo, utente, a.articolo, a.prezzounitario , f.ragionesociale" +
        " FROM angelina.an_dettaglioordine doo" +
        " LEFT JOIN angelina.an_articoli a on doo.idarticolo = a.idarticolo" +
        " LEFT JOIN angelina.an_fornitori f on a.ksfornitore = f.idfornitore" +
        " where '" + schedaId + "' ";
      db.query(query, (err, result) => {
        //  console.log(result);
        if (err) {
          return res.status(500).send(err);
        }

        res.render('viewOrdinazioniById.ejs', {
          title: "Welcome to ANies | Ordini"
          , ordine: result
          , message: ''
        });
      });
    });
  }, 
  deleteOrdinazioneBri: (req, res) => {
    let schedaId = req.params.id;
    let query = " DELETE FROM `angelina`.`an_ordini` WHERE (`idordine` = '" + schedaId + "')";
    console.log(query);
    db.query(query, (err, result) => {
      console.log(result);
      if (err) {
        return res.status(500).send(err);
      }
      //visualizzo la lita ordini
      res.redirect('/ordini');
      // module.exports.viewlistaOrdinazioniPage(req, res);
    });
  }  */
  
}