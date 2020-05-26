const pool = require("../../config/database");


module.exports = {
    createCategorie: (data, callback) =>{
        pool.query(
            'insert into categories(nom, details) ' +
            'values(?,?)',
            [
                data.nom,
                data.details,
            ],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
    getCategories: callBack => {
        pool.query(
            'select id, nom, details from categories \n' +
                'order by nom',
            [],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    updateCategorie: (data, callBack) => {
        pool.query(
            'update categories set nom=?, details=? where id = ?',
            [
                data.nom,
                data.details,
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
    deleteCategorie: (data, callBack) => {
        pool.query(
            'delete from categories where id = ?',
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
