const { createProduit, getProduits, getProduitsAll, updateProduit, deleteProduit } = require("./produit.service");


module.exports = {
    createProduit: (req, res) => {
        const data = req.body;
        createProduit(data, (err, results) => {
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
    getProduitsAll: (req, res) => {
        getProduitsAll( (err, results) => {
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
    getProduits: (req, res) => {
        const data = req.params;
        getProduits(data, (err, results) => {
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
    updateProduit: (req, res) => {
        const data = req.body;
        updateProduit(data, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results) {
                return res.json({
                    success: 0,
                    message: "échec mise à jour du produit"
                });
            }
            return res.json({
                success: 1,
                message: "mise à jour réussie"
            });
        });
    },
    deleteProduit: (req, res) => {
        const data = req.query;
        deleteProduit(data, (err, results) => {
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
                message: "produit supprimé avec succès"
            });
        });
    }
};
