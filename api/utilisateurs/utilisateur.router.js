const { createUtilisateur, getUtilisateurs, updateUtilisateur, deleteUtilisateur, login, email } = require("./utilisateur.controller");
const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");

router.post("/", checkToken, createUtilisateur);
router.get("/", checkToken, getUtilisateurs);
router.patch("/", checkToken, updateUtilisateur);
router.delete("/", checkToken, deleteUtilisateur);
router.post("/login", login);
router.post("/email", email);

module.exports = router;
