const { createFournisseur, getFournisseurs, updateFournisseur, deleteFournisseur } = require("./fournisseur.service");


module.exports = {
    createFournisseur: (req, res) => {
        const data = req.body;
        createFournisseur(data, (err, results) => {
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
    getFournisseurs: (req, res) => {
        getFournisseurs((err, results) => {
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
    updateFournisseur: (req, res) => {
        const data = req.body;
        updateFournisseur(data, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results) {
                return res.json({
                    success: 0,
                    message: "échec mise à jour du fournisseur"
                });
            }
            return res.json({
                success: 1,
                message: "mise à jour réussie"
            });
        });
    },
    deleteFournisseur: (req, res) => {
        const data = req.query;
        deleteFournisseur(data, (err, results) => {
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
                message: "fournisseur supprimé avec succès"
            });
        });
    }
};
