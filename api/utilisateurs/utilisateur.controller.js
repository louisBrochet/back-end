const { createUtilisateur, getUtilisateurs, updateUtilisateur, deleteUtilisateur, getUtilisateurByUtilisateurEmail, getAdministrateurByUtilisateurId } = require("./utilisateur.service");

const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");
const Cookies = require("cookies");
const mailer = require("nodemailer");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;


module.exports = {
    createUtilisateur: (req, res) => {
        const body = req.body;
        const salt = genSaltSync(10);
        body.mdp = hashSync(body.mdp, salt);
        createUtilisateur(body, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "erreur de connexion à la base de données"
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },
    getUtilisateurs: (req, res) => {
        getUtilisateurs((err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            return res.json({
                success: 1,
                data: results
            });
        });
    },
    updateUtilisateur: (req, res) => {
        const body = req.body;
        const salt = genSaltSync(10);
        body.mdp = hashSync(body.mdp, salt);
        updateUtilisateur(body, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results) {
                return res.json({
                    success: 0,
                    message: "échec mise à jour de l'utilisateur"
                });
            }
            return res.json({
                success: 1,
                message: "mise à jour réussie"
            });
        });
    },
    deleteUtilisateur: (req, res) => {
        const data = req.query;
        deleteUtilisateur(data, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results) {
                return res.json({
                    success: 0,
                    message: "données non trouvées"
                });
            }
            return res.json({
                success: 1,
                message: "utilisateur supprimé avec succès"
            });
        });
    },
    login: (req, res) => {
        const body = req.body;
        getUtilisateurByUtilisateurEmail(body.email, (err, results) => {
            if (err) {
                return;
            }
            if (!results) {
                return res.json({
                    success: 0,
                    data: "email ou mot de passe non valide"
                });
            }
            const result = compareSync(body.mdp, results.mdp);
            if (result) {
                results.mdp = undefined;
                const jsontoken = sign({ result : results }, process.env.CLE_TOKEN, {
                    expiresIn: "1h"
                });
                new Cookies(req,res).set('access_token', jsontoken, {
                    httpOnly: true,
                    secure: true,
                    domain: "idlunch.wt1-2.ephec-ti.be",
                    sameSite: "None"
                });
                getAdministrateurByUtilisateurId(results.id, (erreur, resultat) => {
                    if (erreur) {
                        return;
                    }
                    if (!resultat) {
                        return res.json({
                            success: 1,
                            data: " utilisateur connecté avec succès",
                            token: jsontoken
                        });
                    }
                    if (resultat) {
                        return res.json({
                            success: 2,
                            data: "administrateur connecté avec succès",
                            token: jsontoken
                        });
                    }
                });
            } else {
                return res.json({
                    success: 0,
                    data: "email ou mot de passe non valide"
                });
            }
        });
    },
    logout: (req, res) => {
        res.clearCookie('access_token');
        return res.json({
            success: 1,
            data: "cookie supprimé"
        });
    },
    email: (req, res) => {
        const data = req.body;
        const oauth2Client = new OAuth2(
            "44658939913-saf0lmlgqhafgq08laupid2409ub6tgp.apps.googleusercontent.com", // ClientID
            "p350o2ZY-LsBjLUdoBqpES9I", // Client Secret
            "https://developers.google.com/oauthplayground" // Redirect URL
        );
        oauth2Client.setCredentials({
            refresh_token: "1//04aJSwMYntQ3ICgYIARAAGAQSNwF-L9IreeJyJWSeep_GNX3Gjc7CXVyO68PLca7iDvF-8VcO-OoEEOImaf_-RZYGjxp31M95qlo"
        });
        const accessToken = oauth2Client.getAccessToken()
        const smtpTransport = mailer.createTransport({
            service: "gmail",
            auth: {
                type: "OAuth2",
                user: "idLunchContact@gmail.com",
                clientId: "44658939913-saf0lmlgqhafgq08laupid2409ub6tgp.apps.googleusercontent.com",
                clientSecret: "p350o2ZY-LsBjLUdoBqpES9I",
                refreshToken: "1//04aJSwMYntQ3ICgYIARAAGAQSNwF-L9IreeJyJWSeep_GNX3Gjc7CXVyO68PLca7iDvF-8VcO-OoEEOImaf_-RZYGjxp31M95qlo",
                accessToken: accessToken
            }
        });
        const mail = {
            from: data.email,
            to: process.env.MAIL,
            subject: data.sujet,
            html: '<h1>FROM: ' + data.email + '</h1>' + '<h2>' + data.message + '</h2>' + '<h2>' + data.nom + '</h2>'
        }
        smtpTransport.sendMail(mail,function(error, response){
            if (error){
                console.log(error);
                return;
            }
            smtpTransport.close();
            return res.json({
                success: 1,
                data: response,
                message: "email envoyé"
            });
        });
    }
};
