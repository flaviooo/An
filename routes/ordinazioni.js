const fs = require('fs');

module.exports = {

    viewlistaOrdinazioniPage: (req, res) => {
        let playerId = req.params.id;
       // let query = "SELECT * FROM angelina.an_schede WHERE idscheda = '" + schedaId + "' ";
      let queryVIEW = "SELECT idordine, DATE_FORMAT(dataordine, '%Y-%m-%d') as dataordine, costo, DATE_FORMAT(dataUM, '%Y-%m-%d')"+
    " as dataUM, stato, descrizione FROM angelina.an_ordini order by dataordine DESC";
       console.log("query: "+queryVIEW);
                db.query(queryVIEW, (err, result) => {
            //console.log(result);
            if (err) {
                return res.status(500).send(err);
            }
            res.render('viewOrdinazioni.ejs', {
                title: "Welcome to ANies | Ordini"
                ,ordine: result
                ,message: ''
            });
        });
},
creaOrdinazione: (req, res) => {
    let query0 = "SET FOREIGN_KEY_CHECKS=0;";
    let query1 = "Lock tables `angelina`.`an_ordini` write;";
    
    let query2 = "SET @ID_ORDINE=(IFNULL((SELECT MAX(idordine)+1 FROM `angelina`.`an_ordini`), 1));";
    let query3 = "INSERT INTO `angelina`.`an_ordini` (`dataordine`, `costo`, `dataUM`, `stato`, `descrizione`) VALUES (CURRENT_DATE(), '0.00',  NOW(), 'UNDEFINED', concat(@ID_ORDINE,concat('_Ordine_', DATE_FORMAT(dataUM, '%Y-%m-%d'))));";
    let query4 = "unlock tables;";
    
    //let queryInsert0 = "INSERT INTO `angelina`.`an_dettaglioordine` (`idOrdine`, `idFornitore`, `idArticolo`, `tipo`, `quantita`, `prezzo`, `utente`) VALUES (@ID_ORDINE, '1', '1', 'ANTIPASTI', 0, 11.09, 'utente_1'), (@ID_ORDINE, '1', '1', 'ANTIPASTI', 0, 11.32, 'utente_1'), (@ID_ORDINE, '2', '1', 'ANTIPASTI', 0, 19.77, 'utente_1'), (@ID_ORDINE, '4', '1', 'ANTIPASTI', 0, 14.90, 'utente_1'), (@ID_ORDINE, '5', '1', 'ANTIPASTI', 0, 1.70, 'utente_1'), (@ID_ORDINE, '6', '1', 'ANTIPASTI', 0, 0.00, 'utente_1'), (@ID_ORDINE, '1', '4', 'ANTIPASTI', 0, 11.32, 'utente_1'), (@ID_ORDINE, '2', '4', 'ANTIPASTI', 0, 19.77, 'utente_1'), (@ID_ORDINE, '4', '4', 'ANTIPASTI', 0, 14.90, 'utente_1'), (@ID_ORDINE, '5', '4', 'ANTIPASTI', 0, 1.70, 'utente_1'), (@ID_ORDINE, '6', '4', 'ANTIPASTI', 0, 0.00, 'utente_1'), (@ID_ORDINE, '1', '5', 'ANTIPASTI', 0, 11.32, 'utente_1'), (@ID_ORDINE, '2', '5', 'ANTIPASTI', 0, 19.77, 'utente_1'), (@ID_ORDINE, '4', '5', 'ANTIPASTI', 0, 14.90, 'utente_1'), (@ID_ORDINE, '5', '5', 'ANTIPASTI', 0, 1.70, 'utente_1'), (@ID_ORDINE, '6', '5', 'ANTIPASTI', 0, 0.00, 'utente_1'), (@ID_ORDINE, '1', '6', 'ANTIPASTI', 0, 11.32, 'utente_1'), (@ID_ORDINE, '2', '6', 'ANTIPASTI', 0, 19.77, 'utente_1'), (@ID_ORDINE, '4', '6', 'ANTIPASTI', 0, 14.90, 'utente_1'), (@ID_ORDINE, '5', '6', 'ANTIPASTI', 0, 1.70, 'utente_1'), (@ID_ORDINE, '6', '6', 'ANTIPASTI', 0, 0.00, 'utente_1');";
    let queryInsert0 = "INSERT INTO `angelina`.`an_dettaglioordine` (`idOrdine`, `idFornitore`, `idArticolo`, `tipo`, `quantita`, `prezzo`, `utente`) VALUES (@ID_ORDINE, '1', '1', 'ANTIPASTI', 0, 11.09, 'utente_1'), (@ID_ORDINE, '1', '1', 'ANTIPASTI', 0, 11.32, 'utente_1'), (@ID_ORDINE, '2', '1', 'ANTIPASTI', 0, 19.77, 'utente_1'), (@ID_ORDINE, '4', '1', 'ANTIPASTI', 0, 14.90, 'utente_1'), (@ID_ORDINE, '5', '1', 'ANTIPASTI', 0, 1.70, 'utente_1'), (@ID_ORDINE, '6', '1', 'ANTIPASTI', 0, 0.00, 'utente_1'), (@ID_ORDINE, '1', '4', 'ANTIPASTI', 0, 11.32, 'utente_1'), (@ID_ORDINE, '2', '4', 'ANTIPASTI', 0, 19.77, 'utente_1'), (@ID_ORDINE, '4', '4', 'ANTIPASTI', 0, 14.90, 'utente_1'), (@ID_ORDINE, '5', '4', 'ANTIPASTI', 0, 1.70, 'utente_1'), (@ID_ORDINE, '6', '4', 'ANTIPASTI', 0, 0.00, 'utente_1'), (@ID_ORDINE, '1', '5', 'ANTIPASTI', 0, 11.32, 'utente_1'), (@ID_ORDINE, '2', '5', 'ANTIPASTI', 0, 19.77, 'utente_1'), (@ID_ORDINE, '4', '5', 'ANTIPASTI', 0, 14.90, 'utente_1'), (@ID_ORDINE, '5', '5', 'ANTIPASTI', 0, 1.70, 'utente_1'), (@ID_ORDINE, '6', '5', 'ANTIPASTI', 0, 0.00, 'utente_1'), (@ID_ORDINE, '1', '6', 'ANTIPASTI', 0, 11.32, 'utente_1'), (@ID_ORDINE, '2', '6', 'ANTIPASTI', 0, 19.77, 'utente_1'), (@ID_ORDINE, '4', '6', 'ANTIPASTI', 0, 14.90, 'utente_1'), (@ID_ORDINE, '5', '6', 'ANTIPASTI', 0, 1.70, 'utente_1'), (@ID_ORDINE, '6', '6', 'ANTIPASTI', 0, 0.00, 'utente_1');";
    let queryInsert1 = "INSERT INTO `angelina`.`an_dettaglioordine` (`idOrdine`, `idFornitore`, `idArticolo`, `tipo`, `quantita`, `prezzo`, `utente`) VALUES (@ID_ORDINE, '1', '1', 'PRIMI', 0, 11.32, 'utente_1'), (@ID_ORDINE, '2', '1', 'PRIMI', 0, 19.77, 'utente_1'), (@ID_ORDINE, '3', '1', 'PRIMI', 0, 19.78, 'utente_1'), (@ID_ORDINE, '4', '1', 'PRIMI', 0, 14.90, 'utente_1'), (@ID_ORDINE, '5', '1', 'PRIMI', 0, 1.70, 'utente_1'), (@ID_ORDINE, '6', '1', 'PRIMI', 0, 0.00, 'utente_1'), (@ID_ORDINE, '1', '2', 'PRIMI', 0, 11.32, 'utente_1'), (@ID_ORDINE, '2', '2', 'PRIMI', 0, 19.77, 'utente_1'), (@ID_ORDINE, '3', '2', 'PRIMI', 0, 19.78, 'utente_1'), (@ID_ORDINE, '4', '2', 'PRIMI', 0, 14.90, 'utente_1'), (@ID_ORDINE, '5', '2', 'PRIMI', 0, 1.70, 'utente_1'), (@ID_ORDINE, '6', '2', 'PRIMI', 0, 0.00, 'utente_1'), (@ID_ORDINE, '1', '3', 'PRIMI', 0, 11.32, 'utente_1'), (@ID_ORDINE, '2', '3', 'PRIMI', 0, 19.77, 'utente_1'), (@ID_ORDINE, '3', '3', 'PRIMI', 0, 19.78, 'utente_1'), (@ID_ORDINE, '4', '3', 'PRIMI', 0, 14.90, 'utente_1'), (@ID_ORDINE, '5', '3', 'PRIMI', 0, 1.70, 'utente_1'), (@ID_ORDINE, '6', '3', 'PRIMI', 0, 0.00, 'utente_1'), (@ID_ORDINE, '1', '4', 'PRIMI', 0, 11.32, 'utente_1'), (@ID_ORDINE, '2', '4', 'PRIMI', 0, 19.77, 'utente_1'), (@ID_ORDINE, '3', '4', 'PRIMI', 0, 19.78, 'utente_1'), (@ID_ORDINE, '4', '4', 'PRIMI', 0, 14.90, 'utente_1'), (@ID_ORDINE, '5', '4', 'PRIMI', 0, 1.70, 'utente_1'), (@ID_ORDINE, '6', '4', 'PRIMI', 0, 0.00, 'utente_1'), (@ID_ORDINE, '1', '5', 'PRIMI', 0, 11.32, 'utente_1'), (@ID_ORDINE, '2', '5', 'PRIMI', 0, 19.77, 'utente_1'), (@ID_ORDINE, '3', '5', 'PRIMI', 0, 19.78, 'utente_1'), (@ID_ORDINE, '4', '5', 'PRIMI', 0, 14.90, 'utente_1'), (@ID_ORDINE, '5', '5', 'PRIMI', 0, 1.70, 'utente_1'), (@ID_ORDINE, '6', '5', 'PRIMI', 0, 0.00, 'utente_1'), (@ID_ORDINE, '1', '6', 'PRIMI', 0, 11.32, 'utente_1'), (@ID_ORDINE, '2', '6', 'PRIMI', 0, 19.77, 'utente_1'), (@ID_ORDINE, '3', '6', 'PRIMI', 0, 19.78, 'utente_1'), (@ID_ORDINE, '4', '6', 'PRIMI', 0, 14.90, 'utente_1'), (@ID_ORDINE, '5', '6', 'PRIMI', 0, 1.70, 'utente_1'), (@ID_ORDINE, '6', '6', 'PRIMI', 0, 0.00, 'utente_1'), (@ID_ORDINE, '1', '7', 'PRIMI', 0, 11.32, 'utente_1'), (@ID_ORDINE, '2', '7', 'PRIMI', 0, 19.77, 'utente_1'), (@ID_ORDINE, '3', '7', 'PRIMI', 0, 19.78, 'utente_1'), (@ID_ORDINE, '4', '7', 'PRIMI', 0, 14.90, 'utente_1'), (@ID_ORDINE, '5', '7', 'PRIMI', 0, 1.70, 'utente_1'), (@ID_ORDINE, '6', '7', 'PRIMI', 0, 0.00, 'utente_1');";
    let queryInsert2 = "INSERT INTO `angelina`.`an_dettaglioordine` (`idOrdine`, `idFornitore`, `idArticolo`, `tipo`, `quantita`, `prezzo`, `utente`) VALUES (@ID_ORDINE, '1', '1', 'SECONDI', 0, 11.32,  'utente_1'), (@ID_ORDINE, '2', '1', 'SECONDI', 0, 19.77,  'utente_1'), (@ID_ORDINE, '3', '1', 'SECONDI', 0, 19.78,  'utente_1'), (@ID_ORDINE, '4', '1', 'SECONDI', 0, 14.90,  'utente_1'), (@ID_ORDINE, '5', '1', 'SECONDI', 0, 1.70,  'utente_1'), (@ID_ORDINE, '6', '1', 'SECONDI', 0, 0.00,  'utente_1'), (@ID_ORDINE, '1', '2', 'SECONDI', 0, 11.32,  'utente_1'), (@ID_ORDINE, '2', '2', 'SECONDI', 0, 19.77,  'utente_1'), (@ID_ORDINE, '3', '2', 'SECONDI', 0, 19.78,  'utente_1'), (@ID_ORDINE, '4', '2', 'SECONDI', 0, 14.90,  'utente_1'), (@ID_ORDINE, '5', '2', 'SECONDI', 0, 1.70,  'utente_1'), (@ID_ORDINE, '6', '2', 'SECONDI', 0, 0.00,  'utente_1'), (@ID_ORDINE, '1', '3', 'SECONDI', 0, 11.32,  'utente_1'), (@ID_ORDINE, '2', '3', 'SECONDI', 0, 19.77,  'utente_1'), (@ID_ORDINE, '3', '3', 'SECONDI', 0, 19.78,  'utente_1'), (@ID_ORDINE, '4', '3', 'SECONDI', 0, 14.90,  'utente_1'), (@ID_ORDINE, '5', '3', 'SECONDI', 0, 1.70,  'utente_1'), (@ID_ORDINE, '6', '3', 'SECONDI', 0, 0.00,  'utente_1'), (@ID_ORDINE, '1', '4', 'SECONDI', 0, 11.32,  'utente_1'), (@ID_ORDINE, '2', '4', 'SECONDI', 0, 19.77,  'utente_1'), (@ID_ORDINE, '3', '4', 'SECONDI', 0, 19.78,  'utente_1'), (@ID_ORDINE, '4', '4', 'SECONDI', 0, 14.90,  'utente_1'), (@ID_ORDINE, '5', '4', 'SECONDI', 0, 1.70,  'utente_1'), (@ID_ORDINE, '6', '4', 'SECONDI', 0, 0.00,  'utente_1'), (@ID_ORDINE, '1', '5', 'SECONDI', 0, 11.32,  'utente_1'), (@ID_ORDINE, '2', '5', 'SECONDI', 0, 19.77,  'utente_1'), (@ID_ORDINE, '3', '5', 'SECONDI', 0, 19.78,  'utente_1'), (@ID_ORDINE, '4', '5', 'SECONDI', 0, 14.90,  'utente_1'), (@ID_ORDINE, '5', '5', 'SECONDI', 0, 1.70,  'utente_1'), (@ID_ORDINE, '6', '5', 'SECONDI', 0, 0.00,  'utente_1'), (@ID_ORDINE, '1', '6', 'SECONDI', 0, 11.32,  'utente_1'), (@ID_ORDINE, '2', '6', 'SECONDI', 0, 19.77,  'utente_1'), (@ID_ORDINE, '3', '6', 'SECONDI', 0, 19.78,  'utente_1'), (@ID_ORDINE, '4', '6', 'SECONDI', 0, 14.90,  'utente_1'), (@ID_ORDINE, '5', '6', 'SECONDI', 0, 1.70,  'utente_1'), (@ID_ORDINE, '6', '6', 'SECONDI', 0, 0.00,  'utente_1'), (@ID_ORDINE, '1', '7', 'SECONDI', 0, 11.32,  'utente_1'), (@ID_ORDINE, '2', '7', 'SECONDI', 0, 19.77,  'utente_1'), (@ID_ORDINE, '3', '7', 'SECONDI', 0, 19.78,  'utente_1'), (@ID_ORDINE, '4', '7', 'SECONDI', 0, 14.90,  'utente_1'), (@ID_ORDINE, '5', '7', 'SECONDI', 0, 1.70,  'utente_1'), (@ID_ORDINE, '6', '7', 'SECONDI', 0, 0.00,  'utente_1');";
    let queryInsert3 = "INSERT INTO `angelina`.`an_dettaglioordine` (`idOrdine`, `idFornitore`, `idArticolo`, `tipo`, `quantita`, `prezzo`, `utente`) VALUES (@ID_ORDINE, '1', '1', 'PIZZERIA', 0, 11.32,  'utente_1'), (@ID_ORDINE, '2', '1', 'PIZZERIA', 0, 19.77,  'utente_1'), (@ID_ORDINE, '3', '1', 'PIZZERIA', 0, 19.78,  'utente_1'), (@ID_ORDINE, '4', '1', 'PIZZERIA', 0, 14.90,  'utente_1'), (@ID_ORDINE, '5', '1', 'PIZZERIA', 0, 1.70,  'utente_1'), (@ID_ORDINE, '6', '1', 'PIZZERIA', 0, 0.00,  'utente_1'), (@ID_ORDINE, '1', '2', 'PIZZERIA', 0, 11.32,  'utente_1'), (@ID_ORDINE, '2', '2', 'PIZZERIA', 0, 19.77,  'utente_1'), (@ID_ORDINE, '3', '2', 'PIZZERIA', 0, 19.78,  'utente_1'), (@ID_ORDINE, '4', '2', 'PIZZERIA', 0, 14.90,  'utente_1'), (@ID_ORDINE, '5', '2', 'PIZZERIA', 0, 1.70,  'utente_1'), (@ID_ORDINE, '6', '2', 'PIZZERIA', 0, 0.00,  'utente_1'), (@ID_ORDINE, '1', '3', 'PIZZERIA', 0, 11.32,  'utente_1'), (@ID_ORDINE, '2', '3', 'PIZZERIA', 0, 19.77,  'utente_1'), (@ID_ORDINE, '3', '3', 'PIZZERIA', 0, 19.78,  'utente_1'), (@ID_ORDINE, '4', '3', 'PIZZERIA', 0, 14.90,  'utente_1'), (@ID_ORDINE, '5', '3', 'PIZZERIA', 0, 1.70,  'utente_1'), (@ID_ORDINE, '6', '3', 'PIZZERIA', 0, 0.00,  'utente_1'), (@ID_ORDINE, '1', '4', 'PIZZERIA', 0, 11.32,  'utente_1'), (@ID_ORDINE, '2', '4', 'PIZZERIA', 0, 19.77,  'utente_1'), (@ID_ORDINE, '3', '4', 'PIZZERIA', 0, 19.78,  'utente_1'), (@ID_ORDINE, '4', '4', 'PIZZERIA', 0, 14.90,  'utente_1'), (@ID_ORDINE, '5', '4', 'PIZZERIA', 0, 1.70,  'utente_1'), (@ID_ORDINE, '6', '4', 'PIZZERIA', 0, 0.00,  'utente_1'), (@ID_ORDINE, '1', '5', 'PIZZERIA', 0, 11.32,  'utente_1'), (@ID_ORDINE, '2', '5', 'PIZZERIA', 0, 19.77,  'utente_1'), (@ID_ORDINE, '3', '5', 'PIZZERIA', 0, 19.78,  'utente_1'), (@ID_ORDINE, '4', '5', 'PIZZERIA', 0, 14.90,  'utente_1'), (@ID_ORDINE, '5', '5', 'PIZZERIA', 0, 1.70,  'utente_1'), (@ID_ORDINE, '6', '5', 'PIZZERIA', 0, 0.00,  'utente_1'), (@ID_ORDINE, '1', '6', 'PIZZERIA', 0, 11.32,  'utente_1'), (@ID_ORDINE, '2', '6', 'PIZZERIA', 0, 19.77,  'utente_1'), (@ID_ORDINE, '3', '6', 'PIZZERIA', 0, 19.78,  'utente_1'), (@ID_ORDINE, '4', '6', 'PIZZERIA', 0, 14.90,  'utente_1'), (@ID_ORDINE, '5', '6', 'PIZZERIA', 0, 1.70,  'utente_1'), (@ID_ORDINE, '6', '6', 'PIZZERIA', 0, 0.00,  'utente_1'), (@ID_ORDINE, '1', '7', 'PIZZERIA', 0, 11.32,  'utente_1'), (@ID_ORDINE, '2', '7', 'PIZZERIA', 0, 19.77,  'utente_1'), (@ID_ORDINE, '3', '7', 'PIZZERIA', 0, 19.78,  'utente_1'), (@ID_ORDINE, '4', '7', 'PIZZERIA', 0, 14.90,  'utente_1'), (@ID_ORDINE, '5', '7', 'PIZZERIA', 0, 1.70,  'utente_1'), (@ID_ORDINE, '6', '7', 'PIZZERIA', 0, 0.00,  'utente_1');";
    let queryInsert4 = "INSERT INTO `angelina`.`an_dettaglioordine` (`idOrdine`, `idFornitore`, `idArticolo`, `tipo`, `quantita`, `prezzo`, `utente`) VALUES (@ID_ORDINE, '1', '1', 'PESCE', 0, 11.32,  'utente_1'), (@ID_ORDINE, '2', '1', 'PESCE', 0, 19.77,  'utente_1'), (@ID_ORDINE, '4', '1', 'PESCE', 0, 14.90,  'utente_1'), (@ID_ORDINE, '5', '1', 'PESCE', 0, 1.70,  'utente_1'), (@ID_ORDINE, '6', '1', 'PESCE', 0, 0.00,  'utente_1'), (@ID_ORDINE, '1', '2', 'PESCE', 0, 11.32,  'utente_1'), (@ID_ORDINE, '2', '2', 'PESCE', 0, 19.77,  'utente_1'), (@ID_ORDINE, '4', '2', 'PESCE', 0, 14.90,  'utente_1'), (@ID_ORDINE, '5', '2', 'PESCE', 0, 1.70,  'utente_1'), (@ID_ORDINE, '6', '2', 'PESCE', 0, 0.00,  'utente_1'), (@ID_ORDINE, '1', '3', 'PESCE', 0, 11.32,  'utente_1'), (@ID_ORDINE, '2', '3', 'PESCE', 0, 19.77,  'utente_1'), (@ID_ORDINE, '4', '3', 'PESCE', 0, 14.90,  'utente_1'), (@ID_ORDINE, '5', '3', 'PESCE', 0, 1.70,  'utente_1'), (@ID_ORDINE, '6', '3', 'PESCE', 0, 0.00,  'utente_1'), (@ID_ORDINE, '1', '4', 'PESCE', 0, 11.32,  'utente_1'), (@ID_ORDINE, '2', '4', 'PESCE', 0, 19.77,  'utente_1'), (@ID_ORDINE, '4', '4', 'PESCE', 0, 14.90,  'utente_1'), (@ID_ORDINE, '5', '4', 'PESCE', 0, 1.70,  'utente_1'), (@ID_ORDINE, '6', '4', 'PESCE', 0, 0.00,  'utente_1'), (@ID_ORDINE, '1', '5', 'PESCE', 0, 11.32,  'utente_1'), (@ID_ORDINE, '2', '5', 'PESCE', 0, 19.77,  'utente_1'), (@ID_ORDINE, '4', '5', 'PESCE', 0, 14.90,  'utente_1'), (@ID_ORDINE, '5', '5', 'PESCE', 0, 1.70,  'utente_1'), (@ID_ORDINE, '6', '5', 'PESCE', 0, 0.00,  'utente_1'), (@ID_ORDINE, '1', '6', 'PESCE', 0, 11.32,  'utente_1'), (@ID_ORDINE, '2', '6', 'PESCE', 0, 19.77,  'utente_1'), (@ID_ORDINE, '4', '6', 'PESCE', 0, 14.90,  'utente_1'), (@ID_ORDINE, '5', '6', 'PESCE', 0, 1.70,  'utente_1'), (@ID_ORDINE, '6', '6', 'PESCE', 0, 0.00,  'utente_1'), (@ID_ORDINE, '1', '7', 'PESCE', 0, 11.32,  'utente_1'), (@ID_ORDINE, '2', '7', 'PESCE', 0, 19.77,  'utente_1'), (@ID_ORDINE, '4', '7', 'PESCE', 0, 14.90,  'utente_1'), (@ID_ORDINE, '5', '7', 'PESCE', 0, 1.70,  'utente_1'), (@ID_ORDINE, '6', '7', 'PESCE', 0, 0.00,  'utente_1');";

    db.beginTransaction((err)=> {
        if (err) { throw err; }
        db.query(query0, function (error, results) {
        
        
            if (error) {
              return db.rollback(function() {
                throw error;
              });
            }
            
        db.query(query1, function (error, results) {
        
        
            if (error) {
              return db.rollback(function() {
                throw error;
              });
            }
        db.query(query2, function (error, results) {
        
        
            if (error) {
              return db.rollback(function() {
                throw error;
              });
            }
         
        db.query(query3, function (error, results) {
        
        
            if (error) {
              return db.rollback(function() {
                throw error;
              });
            }
         
            db.query(query4, function (error, results) {
                

                        //insert
                        db.query(queryInsert0, (err, result) => {
                            console.log(result);
                            if (err) {
                                return res.status(500).send(err);
                            }
                           
                        });
                        db.query(queryInsert1, (err, result) => {
                            console.log(result);
                            if (err) {
                                return res.status(500).send(err);
                            }
                           
                        });
                        db.query(queryInsert2, (err, result) => {
                            console.log(result);
                            if (err) {
                                return res.status(500).send(err);
                            }
                           
                        });
                        db.query(queryInsert3, (err, result) => {
                            console.log(result);
                            if (err) {
                                return res.status(500).send(err);
                            }
                           
                        });
                        db.query(queryInsert4, (err, result) => {
                            console.log(result);
                            if (err) {
                                return res.status(500).send(err);
                            }
                           
                        });

                       
                      if (error) {
                        return db.rollback(function() {
                          throw error;
                        });
                      }
                      
                      db.commit(function(error) {
                        if (error) {
                          return db.rollback(function() {
                            throw error;
                            res.status(500).send(err);
                          });
                                      
                        }
                        res.redirect('/ordini');
                        console.log('success!');
    /*      visualizzo la lita ordini*/     
        //module.exports.viewlistaOrdinazioniPage(req, res);
              
                      });
                      
                      
            });//4
            });//3	
        });//2	
        });//1
      });//0
    });
    
 },
saveOrdinazione: (req, res) => {
    let schedaId = req.params.id;
   // let query = "SELECT * FROM angelina.an_schede WHERE idscheda = '" + schedaId + "' ";
            query ="SELECT * FROM angelina.an_dettaglioordine where idordine='" + schedaId + "' ";
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
viewDettaglioOrdinazione: (req, res) => {
    let schedaId = req.params.id;
   // let query = "SELECT * FROM angelina.an_schede WHERE idscheda = '" + schedaId + "' ";
    query = " SELECT idDettaglioOrdine, tipo, quantita, prezzo, utente, a.articolo, a.prezzounitario , f.ragionesociale"+
    " FROM angelina.an_dettaglioordine doo"+
    " LEFT JOIN angelina.an_articoli a on doo.idarticolo = a.idarticolo"+
    " LEFT JOIN angelina.an_fornitori f on a.ksfornitore = f.idfornitore"+
    " where '" + schedaId + "' ";
    db.query(query, (err, result) => {
      //  console.log(result);
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
deleteOrdinazione: (req, res) => {
    let schedaId = req.params.id;
   // let query = "SELECT * FROM angelina.an_schede WHERE idscheda = '" + schedaId + "' ";
    query = " DELETE FROM angelina.an_ordini WHERE idordine = '" + schedaId + "';";
    db.query(query, (err, result) => {
        console.log(result);
        if (err) {
            return res.status(500).send(err);
        }
        /*      visualizzo la lita ordini*/     
        module.exports.viewlistaOrdinazioniPage(req, res);
     
    });
}
}