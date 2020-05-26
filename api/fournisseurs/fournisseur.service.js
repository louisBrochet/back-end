const pool = require("../../config/database");


module.exports = {
    createFournisseur: (data, callback) =>{
        pool.query(
            'insert into fournisseurs(nom, adresse, idCat) ' +
            'values(?,?,?)',
            [
                data.nom,
                data.adresse,
                data.categorie
            ],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
    getFournisseurs: callBack => {
        pool.query(
            'select fournisseurs.id, fournisseurs.nom as nom, fournisseurs.adresse as adresse, categories.nom as categorie from fournisseurs \n' +
                'join categories on fournisseurs.idCat = categories.id \n' +
                'order by fournisseurs.nom, categories.nom',
            [],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    updateFournisseur: (data, callBack) => {
        pool.query(
            'update fournisseurs set nom=?, adresse=? where id = ?',
            [
                data.nom,
                data.adresse,
                //data.categorie,
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
    deleteFournisseur: (data, callBack) => {
        pool.query(
            'delete from fournisseurs where id = ?',
            [data.id],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    }
};
