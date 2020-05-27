const { createCategorie, getCategories, updateCategorie, deleteCategorie } = require("./categorie.controller");
const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");

router.post("/", checkToken, createCategorie);
router.get("/", checkToken, getCategories);
router.put("/", checkToken, updateCategorie);
router.delete("/", checkToken, deleteCategorie);

module.exports = router;
