const pool = require("../../config/database");


module.exports = {
    createUtilisateur: (data, callback) =>{
        pool.query(
            'insert into utilisateurs(nom, prenom, genre, email, mdp, adresse, telephone) ' +
            'values(?,?,?,?,?,?,?)',
            [
                data.nom,
                data.prenom,
                data.genre,
                data.email,
                data.mdp,
                data.adresse,
                data.telephone
            ],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
    getUtilisateurs: callBack => {
        pool.query(
            'select id, nom, prenom, genre, email, adresse, telephone from utilisateurs \n' +
                'order by nom, prenom',
            [],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getUtilisateurByUtilisateurEmail: (email, callBack) => {
        pool.query(
            'select * from utilisateurs where email = ?',
            [email],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    },
    updateUtilisateur: (data, callBack) => {
        pool.query(
            'update utilisateurs set nom=?, prenom=?, genre=?, email=?, mdp=?, adresse=?, telephone=? where id = ?',
            [
                data.nom,
                data.prenom,
                data.genre,
                data.email,
                data.mdp,
                data.adresse,
                data.telephone,
                data.id
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    deleteUtilisateur: (data, callBack) => {
        pool.query(
            'delete from utilisateurs where id = ?',
            [data.id],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getAdministrateurByUtilisateurId: (data, fonction) => {
        pool.query(
            'select * from administrateurs where idUti = ?',
            [data],
            (error, results, fields) => {
                if (error) {
                    return fonction(error);
                }
                return fonction(null, results[0]);
            }
        );
    }
};
