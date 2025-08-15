const express = require("express");
const router = express.Router();
const dicoController = require("../controllers/dicoController");

// Router Accueil
router.get("/", (req, res) => {
  res.render("accueil");
});

//Router Dico
router.get("/dictionnaire", dicoController.show);

// Ajout de mot Dico
router.post("/api/mots", dicoController.add);

//Router ressources
router.get("/ressources", (req, res) => {
  res.render("ressources");
});

module.exports = router;
