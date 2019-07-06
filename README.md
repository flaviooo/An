"# mysql-crud-app"
#
# start : node app.js
# start : NODE_ENV=development node app.js

#INSTALL
mkdir node-mysql-crud-app 
cd node-mysql-crud-app 
npm init
npm install express express-fileupload body-parser mysql ejs req-flash dotenv --save
npm install nodemon -g


https://dev.to/achowba/build-a-simple-app-using-node-js-and-mysql-19me
ALTER TABLE `angelina`.`an_articoli` 
ADD FOREIGN KEY ksfornitore 
REFERENCES `angelina`.`an_fornitori`(idfornitore);

ALTER TABLE angelina.an_articoli
ADD FOREIGN KEY (ksfornitore) 
REFERENCES angelina.an_fornitori(idfornitore);

ALTER TABLE angelina.an_articoli 
ADD CONSTRAINT fk_ksfornitore 
FOREIGN KEY (ksfornitore)
REFERENCES angelina.an_fornitori(idfornitore);

ALTER TABLE `angelina`.`an_fornitori` 
ADD CONSTRAINT `fk_fornitore_articolo`
FOREIGN KEY (`idfornitore`)
REFERENCES `angelina`.`an_articoli` (`idarticolo`)
ON DELETE CASCADE
ON UPDATE CASCADE;

SELECT * -- , s.idscheda, s.tipo, a.articolo,f.ragionesociale
FROM angelina.an_articoli a 
               -- LEFT JOIN angelina.an_schede s on s.ksfornitore=a.ksfornitore
                -- LEFT JOIN angelina.an_fornitori f on a.ksfornitore = f.idfornitore
                --  where s.tipo='ANTIPASTI' -- and f.ragionesociale ='PASTA'
                 order by a.idarticolo
				 



SELECT '1' as ordine, s.ksArticolo, s.ksFornitore, tipo, '0', prezzounitario, 'utente_1'
-- idscheda, tipo, ragionesociale, articolo
FROM angelina.an_schede s
LEFT JOIN angelina.an_fornitori f on s.ksfornitore = f.idfornitore
LEFT JOIN angelina.an_articoli a on s.ksarticolo = a.idarticolo
 -- where tipo !='Antipasti' and tipo !='primi'
 
 
 SELECT idordine, dataordine, costo, DATE_FORMAT(dataUM, '%Y-%m-%d') as dataUM, stato, descrizione FROM angelina.an_ordini;
 
 
 SELECT * 
FROM angelina.an_dettaglioordine doo
LEFT JOIN angelina.an_articoli a on doo.idarticolo = a.idarticolo
LEFT JOIN angelina.an_fornitori f on a.ksfornitore = f.idfornitore
--SPOPOLAMENTO

SET FOREIGN_KEY_CHECKS=0;
TRUNCATE  `angelina`.`an_ordini` ;
TRUNCATE  `angelina`.`an_dettaglioordine`;
SET FOREIGN_KEY_CHECKS=1;


-- popolamento

CREATE TABLE `an_ordini` (
  `idordine` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `dataordine` date DEFAULT NULL,
  `costo` decimal(6,2) NOT NULL DEFAULT '0.00',
  `dataUM` datetime DEFAULT NULL,
  `stato` varchar(45) COLLATE latin1_general_ci DEFAULT 'UNDEFINED',
  `descrizione` varchar(45) COLLATE latin1_general_ci DEFAULT NULL,
  PRIMARY KEY (`idordine`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci

CREATE TABLE `an_dettaglioordine` (
  `idDettaglioOrdine` int(11) NOT NULL AUTO_INCREMENT,
  `idOrdine` int(10) unsigned NOT NULL ,
  `idFornitore` int(10) unsigned DEFAULT NULL,
  `idArticolo` int(10) unsigned DEFAULT NULL,
  `tipo` varchar(45) COLLATE latin1_general_ci DEFAULT NULL,
  `quantita` int(10) unsigned DEFAULT '0',
  `prezzo` double DEFAULT '0',
  `utente` varchar(45) COLLATE latin1_general_ci DEFAULT NULL,
  PRIMARY KEY (`idDettaglioOrdine`),
  KEY `FK_idOrdine` (`idOrdine`),
  CONSTRAINT `FK_idOrdine` FOREIGN KEY (`idOrdine`) REFERENCES `an_ordini` (`idordine`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci

SET FOREIGN_KEY_CHECKS=0; 
Lock tables `angelina`.`an_ordini` write;

SET @ID_ORDINE=(IFNULL((SELECT MAX(idordine)+1 FROM `angelina`.`an_ordini`), 1));
INSERT INTO `angelina`.`an_ordini` (`dataordine`, `costo`, `dataUM`, `stato`, `descrizione`) VALUES 
(CURRENT_DATE(), '0.00',  NOW(), 'UNDEFINED', concat(@ID_ORDINE,concat('_Ordine_', DATE_FORMAT(dataUM, '%Y-%m-%d'))));
unlock tables;

INSERT INTO `angelina`.`an_dettaglioordine` (`idOrdine`, `idFornitore`, `idArticolo`, `tipo`, `quantita`, `prezzo`, `utente`) VALUES 
(@ID_ORDINE, '1', '1', 'ANTIPASTI', 0, 11.09, 'utente_1'), (@ID_ORDINE, '1', '1', 'ANTIPASTI', 0, 11.32, 'utente_1'), (@ID_ORDINE, '2', '1', 'ANTIPASTI', 0, 19.77, 'utente_1'), (@ID_ORDINE, '4', '1', 'ANTIPASTI', 0, 14.90, 'utente_1'), (@ID_ORDINE, '5', '1', 'ANTIPASTI', 0, 1.70, 'utente_1'), (@ID_ORDINE, '6', '1', 'ANTIPASTI', 0, 0.00, 'utente_1'), (@ID_ORDINE, '1', '4', 'ANTIPASTI', 0, 11.32, 'utente_1'), (@ID_ORDINE, '2', '4', 'ANTIPASTI', 0, 19.77, 'utente_1'), (@ID_ORDINE, '4', '4', 'ANTIPASTI', 0, 14.90, 'utente_1'), (@ID_ORDINE, '5', '4', 'ANTIPASTI', 0, 1.70, 'utente_1'), (@ID_ORDINE, '6', '4', 'ANTIPASTI', 0, 0.00, 'utente_1'), (@ID_ORDINE, '1', '5', 'ANTIPASTI', 0, 11.32, 'utente_1'), (@ID_ORDINE, '2', '5', 'ANTIPASTI', 0, 19.77, 'utente_1'), (@ID_ORDINE, '4', '5', 'ANTIPASTI', 0, 14.90, 'utente_1'), (@ID_ORDINE, '5', '5', 'ANTIPASTI', 0, 1.70, 'utente_1'), (@ID_ORDINE, '6', '5', 'ANTIPASTI', 0, 0.00, 'utente_1'), (@ID_ORDINE, '1', '6', 'ANTIPASTI', 0, 11.32, 'utente_1'), (@ID_ORDINE, '2', '6', 'ANTIPASTI', 0, 19.77, 'utente_1'), (@ID_ORDINE, '4', '6', 'ANTIPASTI', 0, 14.90, 'utente_1'), (@ID_ORDINE, '5', '6', 'ANTIPASTI', 0, 1.70, 'utente_1'), (@ID_ORDINE, '6', '6', 'ANTIPASTI', 0, 0.00, 'utente_1'),
(@ID_ORDINE, '1', '1', 'PRIMI', 0, 11.32, 'utente_1'), (@ID_ORDINE, '2', '1', 'PRIMI', 0, 19.77, 'utente_1'), (@ID_ORDINE, '3', '1', 'PRIMI', 0, 19.78, 'utente_1'), (@ID_ORDINE, '4', '1', 'PRIMI', 0, 14.90, 'utente_1'), (@ID_ORDINE, '5', '1', 'PRIMI', 0, 1.70, 'utente_1'), (@ID_ORDINE, '6', '1', 'PRIMI', 0, 0.00, 'utente_1'), (@ID_ORDINE, '1', '2', 'PRIMI', 0, 11.32, 'utente_1'), (@ID_ORDINE, '2', '2', 'PRIMI', 0, 19.77, 'utente_1'), (@ID_ORDINE, '3', '2', 'PRIMI', 0, 19.78, 'utente_1'), (@ID_ORDINE, '4', '2', 'PRIMI', 0, 14.90, 'utente_1'), (@ID_ORDINE, '5', '2', 'PRIMI', 0, 1.70, 'utente_1'), (@ID_ORDINE, '6', '2', 'PRIMI', 0, 0.00, 'utente_1'), (@ID_ORDINE, '1', '3', 'PRIMI', 0, 11.32, 'utente_1'), (@ID_ORDINE, '2', '3', 'PRIMI', 0, 19.77, 'utente_1'), (@ID_ORDINE, '3', '3', 'PRIMI', 0, 19.78, 'utente_1'), (@ID_ORDINE, '4', '3', 'PRIMI', 0, 14.90, 'utente_1'), (@ID_ORDINE, '5', '3', 'PRIMI', 0, 1.70, 'utente_1'), (@ID_ORDINE, '6', '3', 'PRIMI', 0, 0.00, 'utente_1'), (@ID_ORDINE, '1', '4', 'PRIMI', 0, 11.32, 'utente_1'), (@ID_ORDINE, '2', '4', 'PRIMI', 0, 19.77, 'utente_1'), (@ID_ORDINE, '3', '4', 'PRIMI', 0, 19.78, 'utente_1'), (@ID_ORDINE, '4', '4', 'PRIMI', 0, 14.90, 'utente_1'), (@ID_ORDINE, '5', '4', 'PRIMI', 0, 1.70, 'utente_1'), (@ID_ORDINE, '6', '4', 'PRIMI', 0, 0.00, 'utente_1'), (@ID_ORDINE, '1', '5', 'PRIMI', 0, 11.32, 'utente_1'), (@ID_ORDINE, '2', '5', 'PRIMI', 0, 19.77, 'utente_1'), (@ID_ORDINE, '3', '5', 'PRIMI', 0, 19.78, 'utente_1'), (@ID_ORDINE, '4', '5', 'PRIMI', 0, 14.90, 'utente_1'), (@ID_ORDINE, '5', '5', 'PRIMI', 0, 1.70, 'utente_1'), (@ID_ORDINE, '6', '5', 'PRIMI', 0, 0.00, 'utente_1'), (@ID_ORDINE, '1', '6', 'PRIMI', 0, 11.32, 'utente_1'), (@ID_ORDINE, '2', '6', 'PRIMI', 0, 19.77, 'utente_1'), (@ID_ORDINE, '3', '6', 'PRIMI', 0, 19.78, 'utente_1'), (@ID_ORDINE, '4', '6', 'PRIMI', 0, 14.90, 'utente_1'), (@ID_ORDINE, '5', '6', 'PRIMI', 0, 1.70, 'utente_1'), (@ID_ORDINE, '6', '6', 'PRIMI', 0, 0.00, 'utente_1'), (@ID_ORDINE, '1', '7', 'PRIMI', 0, 11.32, 'utente_1'), (@ID_ORDINE, '2', '7', 'PRIMI', 0, 19.77, 'utente_1'), (@ID_ORDINE, '3', '7', 'PRIMI', 0, 19.78, 'utente_1'), (@ID_ORDINE, '4', '7', 'PRIMI', 0, 14.90, 'utente_1'), (@ID_ORDINE, '5', '7', 'PRIMI', 0, 1.70, 'utente_1'), (@ID_ORDINE, '6', '7', 'PRIMI', 0, 0.00, 'utente_1'),
(@ID_ORDINE, '1', '1', 'SECONDI', 0, 11.32,  'utente_1'), (@ID_ORDINE, '2', '1', 'SECONDI', 0, 19.77,  'utente_1'), (@ID_ORDINE, '3', '1', 'SECONDI', 0, 19.78,  'utente_1'), (@ID_ORDINE, '4', '1', 'SECONDI', 0, 14.90,  'utente_1'), (@ID_ORDINE, '5', '1', 'SECONDI', 0, 1.70,  'utente_1'), (@ID_ORDINE, '6', '1', 'SECONDI', 0, 0.00,  'utente_1'), (@ID_ORDINE, '1', '2', 'SECONDI', 0, 11.32,  'utente_1'), (@ID_ORDINE, '2', '2', 'SECONDI', 0, 19.77,  'utente_1'), (@ID_ORDINE, '3', '2', 'SECONDI', 0, 19.78,  'utente_1'), (@ID_ORDINE, '4', '2', 'SECONDI', 0, 14.90,  'utente_1'), (@ID_ORDINE, '5', '2', 'SECONDI', 0, 1.70,  'utente_1'), (@ID_ORDINE, '6', '2', 'SECONDI', 0, 0.00,  'utente_1'), (@ID_ORDINE, '1', '3', 'SECONDI', 0, 11.32,  'utente_1'), (@ID_ORDINE, '2', '3', 'SECONDI', 0, 19.77,  'utente_1'), (@ID_ORDINE, '3', '3', 'SECONDI', 0, 19.78,  'utente_1'), (@ID_ORDINE, '4', '3', 'SECONDI', 0, 14.90,  'utente_1'), (@ID_ORDINE, '5', '3', 'SECONDI', 0, 1.70,  'utente_1'), (@ID_ORDINE, '6', '3', 'SECONDI', 0, 0.00,  'utente_1'), (@ID_ORDINE, '1', '4', 'SECONDI', 0, 11.32,  'utente_1'), (@ID_ORDINE, '2', '4', 'SECONDI', 0, 19.77,  'utente_1'), (@ID_ORDINE, '3', '4', 'SECONDI', 0, 19.78,  'utente_1'), (@ID_ORDINE, '4', '4', 'SECONDI', 0, 14.90,  'utente_1'), (@ID_ORDINE, '5', '4', 'SECONDI', 0, 1.70,  'utente_1'), (@ID_ORDINE, '6', '4', 'SECONDI', 0, 0.00,  'utente_1'), (@ID_ORDINE, '1', '5', 'SECONDI', 0, 11.32,  'utente_1'), (@ID_ORDINE, '2', '5', 'SECONDI', 0, 19.77,  'utente_1'), (@ID_ORDINE, '3', '5', 'SECONDI', 0, 19.78,  'utente_1'), (@ID_ORDINE, '4', '5', 'SECONDI', 0, 14.90,  'utente_1'), (@ID_ORDINE, '5', '5', 'SECONDI', 0, 1.70,  'utente_1'), (@ID_ORDINE, '6', '5', 'SECONDI', 0, 0.00,  'utente_1'), (@ID_ORDINE, '1', '6', 'SECONDI', 0, 11.32,  'utente_1'), (@ID_ORDINE, '2', '6', 'SECONDI', 0, 19.77,  'utente_1'), (@ID_ORDINE, '3', '6', 'SECONDI', 0, 19.78,  'utente_1'), (@ID_ORDINE, '4', '6', 'SECONDI', 0, 14.90,  'utente_1'), (@ID_ORDINE, '5', '6', 'SECONDI', 0, 1.70,  'utente_1'), (@ID_ORDINE, '6', '6', 'SECONDI', 0, 0.00,  'utente_1'), (@ID_ORDINE, '1', '7', 'SECONDI', 0, 11.32,  'utente_1'), (@ID_ORDINE, '2', '7', 'SECONDI', 0, 19.77,  'utente_1'), (@ID_ORDINE, '3', '7', 'SECONDI', 0, 19.78,  'utente_1'), (@ID_ORDINE, '4', '7', 'SECONDI', 0, 14.90,  'utente_1'), (@ID_ORDINE, '5', '7', 'SECONDI', 0, 1.70,  'utente_1'), (@ID_ORDINE, '6', '7', 'SECONDI', 0, 0.00,  'utente_1'),
(@ID_ORDINE, '1', '1', 'PIZZERIA', 0, 11.32,  'utente_1'), (@ID_ORDINE, '2', '1', 'PIZZERIA', 0, 19.77,  'utente_1'), (@ID_ORDINE, '3', '1', 'PIZZERIA', 0, 19.78,  'utente_1'), (@ID_ORDINE, '4', '1', 'PIZZERIA', 0, 14.90,  'utente_1'), (@ID_ORDINE, '5', '1', 'PIZZERIA', 0, 1.70,  'utente_1'), (@ID_ORDINE, '6', '1', 'PIZZERIA', 0, 0.00,  'utente_1'), (@ID_ORDINE, '1', '2', 'PIZZERIA', 0, 11.32,  'utente_1'), (@ID_ORDINE, '2', '2', 'PIZZERIA', 0, 19.77,  'utente_1'), (@ID_ORDINE, '3', '2', 'PIZZERIA', 0, 19.78,  'utente_1'), (@ID_ORDINE, '4', '2', 'PIZZERIA', 0, 14.90,  'utente_1'), (@ID_ORDINE, '5', '2', 'PIZZERIA', 0, 1.70,  'utente_1'), (@ID_ORDINE, '6', '2', 'PIZZERIA', 0, 0.00,  'utente_1'), (@ID_ORDINE, '1', '3', 'PIZZERIA', 0, 11.32,  'utente_1'), (@ID_ORDINE, '2', '3', 'PIZZERIA', 0, 19.77,  'utente_1'), (@ID_ORDINE, '3', '3', 'PIZZERIA', 0, 19.78,  'utente_1'), (@ID_ORDINE, '4', '3', 'PIZZERIA', 0, 14.90,  'utente_1'), (@ID_ORDINE, '5', '3', 'PIZZERIA', 0, 1.70,  'utente_1'), (@ID_ORDINE, '6', '3', 'PIZZERIA', 0, 0.00,  'utente_1'), (@ID_ORDINE, '1', '4', 'PIZZERIA', 0, 11.32,  'utente_1'), (@ID_ORDINE, '2', '4', 'PIZZERIA', 0, 19.77,  'utente_1'), (@ID_ORDINE, '3', '4', 'PIZZERIA', 0, 19.78,  'utente_1'), (@ID_ORDINE, '4', '4', 'PIZZERIA', 0, 14.90,  'utente_1'), (@ID_ORDINE, '5', '4', 'PIZZERIA', 0, 1.70,  'utente_1'), (@ID_ORDINE, '6', '4', 'PIZZERIA', 0, 0.00,  'utente_1'), (@ID_ORDINE, '1', '5', 'PIZZERIA', 0, 11.32,  'utente_1'), (@ID_ORDINE, '2', '5', 'PIZZERIA', 0, 19.77,  'utente_1'), (@ID_ORDINE, '3', '5', 'PIZZERIA', 0, 19.78,  'utente_1'), (@ID_ORDINE, '4', '5', 'PIZZERIA', 0, 14.90,  'utente_1'), (@ID_ORDINE, '5', '5', 'PIZZERIA', 0, 1.70,  'utente_1'), (@ID_ORDINE, '6', '5', 'PIZZERIA', 0, 0.00,  'utente_1'), (@ID_ORDINE, '1', '6', 'PIZZERIA', 0, 11.32,  'utente_1'), (@ID_ORDINE, '2', '6', 'PIZZERIA', 0, 19.77,  'utente_1'), (@ID_ORDINE, '3', '6', 'PIZZERIA', 0, 19.78,  'utente_1'), (@ID_ORDINE, '4', '6', 'PIZZERIA', 0, 14.90,  'utente_1'), (@ID_ORDINE, '5', '6', 'PIZZERIA', 0, 1.70,  'utente_1'), (@ID_ORDINE, '6', '6', 'PIZZERIA', 0, 0.00,  'utente_1'), (@ID_ORDINE, '1', '7', 'PIZZERIA', 0, 11.32,  'utente_1'), (@ID_ORDINE, '2', '7', 'PIZZERIA', 0, 19.77,  'utente_1'), (@ID_ORDINE, '3', '7', 'PIZZERIA', 0, 19.78,  'utente_1'), (@ID_ORDINE, '4', '7', 'PIZZERIA', 0, 14.90,  'utente_1'), (@ID_ORDINE, '5', '7', 'PIZZERIA', 0, 1.70,  'utente_1'), (@ID_ORDINE, '6', '7', 'PIZZERIA', 0, 0.00,  'utente_1'),
(@ID_ORDINE, '1', '1', 'PESCE', 0, 11.32,  'utente_1'), (@ID_ORDINE, '2', '1', 'PESCE', 0, 19.77,  'utente_1'), (@ID_ORDINE, '4', '1', 'PESCE', 0, 14.90,  'utente_1'), (@ID_ORDINE, '5', '1', 'PESCE', 0, 1.70,  'utente_1'), (@ID_ORDINE, '6', '1', 'PESCE', 0, 0.00,  'utente_1'), (@ID_ORDINE, '1', '2', 'PESCE', 0, 11.32,  'utente_1'), (@ID_ORDINE, '2', '2', 'PESCE', 0, 19.77,  'utente_1'), (@ID_ORDINE, '4', '2', 'PESCE', 0, 14.90,  'utente_1'), (@ID_ORDINE, '5', '2', 'PESCE', 0, 1.70,  'utente_1'), (@ID_ORDINE, '6', '2', 'PESCE', 0, 0.00,  'utente_1'), (@ID_ORDINE, '1', '3', 'PESCE', 0, 11.32,  'utente_1'), (@ID_ORDINE, '2', '3', 'PESCE', 0, 19.77,  'utente_1'), (@ID_ORDINE, '4', '3', 'PESCE', 0, 14.90,  'utente_1'), (@ID_ORDINE, '5', '3', 'PESCE', 0, 1.70,  'utente_1'), (@ID_ORDINE, '6', '3', 'PESCE', 0, 0.00,  'utente_1'), (@ID_ORDINE, '1', '4', 'PESCE', 0, 11.32,  'utente_1'), (@ID_ORDINE, '2', '4', 'PESCE', 0, 19.77,  'utente_1'), (@ID_ORDINE, '4', '4', 'PESCE', 0, 14.90,  'utente_1'), (@ID_ORDINE, '5', '4', 'PESCE', 0, 1.70,  'utente_1'), (@ID_ORDINE, '6', '4', 'PESCE', 0, 0.00,  'utente_1'), (@ID_ORDINE, '1', '5', 'PESCE', 0, 11.32,  'utente_1'), (@ID_ORDINE, '2', '5', 'PESCE', 0, 19.77,  'utente_1'), (@ID_ORDINE, '4', '5', 'PESCE', 0, 14.90,  'utente_1'), (@ID_ORDINE, '5', '5', 'PESCE', 0, 1.70,  'utente_1'), (@ID_ORDINE, '6', '5', 'PESCE', 0, 0.00,  'utente_1'), (@ID_ORDINE, '1', '6', 'PESCE', 0, 11.32,  'utente_1'), (@ID_ORDINE, '2', '6', 'PESCE', 0, 19.77,  'utente_1'), (@ID_ORDINE, '4', '6', 'PESCE', 0, 14.90,  'utente_1'), (@ID_ORDINE, '5', '6', 'PESCE', 0, 1.70,  'utente_1'), (@ID_ORDINE, '6', '6', 'PESCE', 0, 0.00,  'utente_1'), (@ID_ORDINE, '1', '7', 'PESCE', 0, 11.32,  'utente_1'), (@ID_ORDINE, '2', '7', 'PESCE', 0, 19.77,  'utente_1'), (@ID_ORDINE, '4', '7', 'PESCE', 0, 14.90,  'utente_1'), (@ID_ORDINE, '5', '7', 'PESCE', 0, 1.70,  'utente_1'), (@ID_ORDINE, '6', '7', 'PESCE', 0, 0.00,  'utente_1');
SET FOREIGN_KEY_CHECKS=0;

