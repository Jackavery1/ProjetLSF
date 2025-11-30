const express = require("express");
const router = express.Router();
const dicoController = require("../controllers/dicoController");
const quizController = require("../controllers/quizController");
const ressController = require("../controllers/ressController");

// Ajout de mot Dico
router.post("/dictionnaire", dicoController.add);

//Supprimer mot Dico
router.post("/dictionnaire/:id", dicoController.remove);

// Ajout de ressources
router.post("/ressources", ressController.add);

//Supprimer ressources
router.post("/ressources/:id", ressController.remove);

module.exports = router;
