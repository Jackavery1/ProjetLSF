const express = require("express");
const router = express.Router();
const dicoController = require("../controllers/dicoController");
const quizzController = require("../controllers/quizzController");
const ressController = require("../controllers/ressController");

// Ajout de mot Dico
router.post("/api/dictionnaire", dicoController.add);

//Supprimer mot Dico
router.post("/api/dictionnaire/:id", dicoController.remove);

// Ajout de ressources
router.post("/api/ressources", ressController.add);

//Supprimer ressources
router.post("/api/ressources/:id", ressController.remove);

module.exports = router;
