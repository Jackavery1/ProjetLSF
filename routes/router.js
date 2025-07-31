const express = require("express");
const router = express.Router();
const dicoController = require("../controllers/dicoController");

// Router Accueil
router.get("/", (req, res) => {
  res.send("Bienvenue sur l’API Projet LSF");
});

//Router Dico
router.get("/dictionnaire", dicoController.show);

module.exports = router;
