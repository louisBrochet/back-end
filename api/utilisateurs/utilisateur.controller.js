const { createUtilisateur, getUtilisateurs, updateUtilisateur, deleteUtilisateur, getUtilisateurByUtilisateurEmail } = require("./utilisateur.service");

const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");
const Cookies = require("cookies");
const mailer = require("nodemailer");


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
                    httpOnly: false,
                    secure: false,
                    domain: "idlunch.wt1-2.ephec-ti.be:3000"
                });
                console.log(res);
                console.log(req);
                return res.json({
                    success: 1,
                    message: "connecté avec succès",
                    token: jsontoken
                });
            } else {
                return res.json({
                    success: 0,
                    data: "email ou mot de passe non valide"
                });
            }
        });
    },
    email: (req, res) => {
        const data = req.body;
        console.log(data);
        const smtpTransport = mailer.createTransport( {
            service: "Gmail",
            auth: {
                user: process.env.MAIL,
                pass: process.env.MAIL_PASSWORD
            },
            tls: {
                rejectUnauthorized: false
            }
        });
        const mail = {
            from: data.email,
            to: process.env.MAIL,
            subject: data.sujet,
            html: data.message
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
