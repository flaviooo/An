const fs = require('fs');

module.exports = {
    addSchedaPage: (req, res) => {
        res.render('add-scheda.ejs', {
            title: "Welcome to Socka | Add a new scheda"
            ,message: ''
        });
    },
    addScheda: (req, res) => {
        if (!req.files) {
            return res.status(400).send("No files were uploaded.");
        }

        let message = '';
        let first_name = req.body.first_name;
        let last_name = req.body.last_name;
        let position = req.body.position;
        let number = req.body.number;
        let username = req.body.username;
        let uploadedFile = req.files.image;
        let image_name = uploadedFile.name;
        let fileExtension = uploadedFile.mimetype.split('/')[1];
        image_name = username + '.' + fileExtension;

        let query = "SELECT idarticolo, articolo, f.ragionesociale, prezzounitario FROM angelina.an_articoli as a"+ 
        " LEFT JOIN angelina.an_fornitori f on a.ksfornitore = f.idfornitore;"; // query database to get all the players

        let usernameQuery = "SELECT * FROM angelina.an_articoli as a WHERE user_name = '" + username + "'";

        db.query(usernameQuery, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            if (result.length > 0) {
                message = 'Username already exists';
                res.render('add-scheda.ejs', {
                    message,
                    title: "Welcome to Socka | Add a new scheda"
                });
            } else {
                // check the filetype before uploading it
                if (uploadedFile.mimetype === 'image/png' || uploadedFile.mimetype === 'image/jpeg' || uploadedFile.mimetype === 'image/gif') {
                    // upload the file to the /public/assets/img directory
                    uploadedFile.mv(`public/assets/img/${image_name}`, (err ) => {
                        if (err) {
                            return res.status(500).send(err);
                        }
                        // send the scheda's details to the database
                        let query = "INSERT INTO `schedas` (first_name, last_name, position, number, image, user_name) VALUES ('" +
                            first_name + "', '" + last_name + "', '" + position + "', '" + number + "', '" + image_name + "', '" + username + "')";
                        db.query(query, (err, result) => {
                            if (err) {
                                return res.status(500).send(err);
                            }
                            res.redirect('/');
                        });
                    });
                } else {
                    message = "Invalid File format. Only 'gif', 'jpeg' and 'png' images are allowed.";
                    res.render('add-scheda.ejs', {
                        message,
                        title: "Welcome to Socka | Add a new scheda"
                    });
                }
            }
        });
    },
    editSchedaPage: (req, res) => {
        let schedaId = req.params.id;
        let query = "SELECT * FROM angelina.an_schede WHERE idscheda = '" + schedaId + "' ";
        query = "SELECT s.idscheda, s.tipo, a.articolo,f.ragionesociale"+
                " FROM angelina.an_schede s "+
                " LEFT JOIN angelina.an_articoli a on s.ksarticolo=a.idarticolo"+
                " LEFT JOIN angelina.an_fornitori f on a.idarticolo= f.idfornitore";
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.render('edit-scheda.ejs', {
                title: "Edit  Scheda"
                ,scheda: result[0]
                ,message: ''
            });
        });
    },
    viewScheda: (req, res) => {
        let schedaId = req.params.id;
        let query = "SELECT * FROM angelina.an_schede WHERE idscheda = '" + schedaId + "' ";
        query = "SELECT s.idscheda, s.tipo, a.articolo,f.ragionesociale"+
                " FROM angelina.an_schede s "+
                " LEFT JOIN angelina.an_articoli a on s.ksarticolo=a.idarticolo"+
                " LEFT JOIN angelina.an_fornitori f on a.idarticolo= f.idfornitore";
        db.query(query, (err, result) => {
            console.log(result);
            if (err) {
                return res.status(500).send(err);
            }
            res.render('viewSchede.ejs', {
                title: "View  Schede"
                ,scheda: result
                ,message: ''
            });
        });
    },
    editScheda: (req, res) => {
        let schedaId = req.params.id;
        let first_name = req.body.first_name;
        let last_name = req.body.last_name;
        let position = req.body.position;
        let number = req.body.number;

        let query = "UPDATE `scheda` SET `first_name` = '" + first_name + "', `last_name` = '" + last_name + "', `position` = '" + position + "', `number` = '" + number + "' WHERE `schedas`.`id` = '" + schedaId + "'";
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.redirect('/');
        });
    },
    deleteScheda: (req, res) => {
        let schedaId = req.params.id;
        let getImageQuery = 'SELECT image from `schedas` WHERE id = "' + schedaId + '"';
        let deleteUserQuery = 'DELETE FROM schedas WHERE id = "' + schedaId + '"';

        db.query(getImageQuery, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }

            let image = result[0].image;

            fs.unlink(`public/assets/img/${image}`, (err) => {
                if (err) {
                    return res.status(500).send(err);
                }
                db.query(deleteUserQuery, (err, result) => {
                    if (err) {
                        return res.status(500).send(err);
                    }
                    res.redirect('/');
                });
            });
        });
    }
};