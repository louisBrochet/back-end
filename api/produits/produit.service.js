const pool = require("../../config/database");


module.exports = {
    createProduit: (data, callback) =>{
        pool.query(
            'insert into produits(nom, idCat, idFourn, origine) ' +
            'values(?,?,?,?)',
            [
                data.nom,
                data.categorie,
                data.fournisseur,
                data.origine
            ],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
    getProduitsAll: callBack => {
        pool.query(
            'select produits.id, produits.nom as nom, categories.nom as categorie, fournisseurs.nom as fournisseur, produits.origine as origine from produits \n' +
            'join categories on produits.idCat = categories.id \n' +
            'join fournisseurs on produits.idFourn = fournisseurs.id',
            [],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getProduits: (data, callBack) => {
        pool.query(
            'select produits.id, produits.nom as nom, categories.nom as categorie, fournisseurs.nom as fournisseur, produits.origine as origine from produits \n' +
                'join categories on produits.idCat = categories.id \n' +
                'join fournisseurs on produits.idFourn = fournisseurs.id \n' +
                'where produits.nom like \'%' + data.recherche +
                '%\' or categories.nom like \'%' + data.recherche +
                '%\' or fournisseurs.nom like \'%' + data.recherche +
                '%\' or produits.origine like \'%' + data.recherche + '%\' \n' +
                'order by produits.nom, produits.origine, fournisseurs.nom, categories.nom',
            [],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    updateProduit: (data, callBack) => {
        pool.query(
            'update produits set nom=?, idCat=(select idCat from categories where categories.nom=?), idFourn=(select idFourn from fournisseurs where fournisseurs.nom=?), origine=? where id = ?',
            [
                data.nom,
                data.categorie,
                data.fournisseur,
                data.origine,
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
    deleteProduit: (data, callBack) => {
        pool.query(
            'delete from produits where id = ?',
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
