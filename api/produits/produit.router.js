const { createProduit, getProduits, getProduitsAll, updateProduit, deleteProduit } = require("./produit.controller");
const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");

router.post("/", checkToken, createProduit);
router.get("/:recherche", checkToken, getProduits);
router.get("/recherche/all", checkToken, getProduitsAll);
router.patch("/", checkToken, updateProduit);
router.delete("/", checkToken, deleteProduit);

module.exports = router;
