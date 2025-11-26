const express = require("express");
const router = express.Router();
const dicoController = require("../controllers/dicoController");
const quizzController = require("../controllers/quizzController");
const ressController = require("../controllers/ressController");

// Router Accueil
router.get("/", (req, res) => {
  res.render("accueil");
});

// Router Dico
router.get("/dictionnaire", dicoController.show);

// Router Quizz
router.get("/quizz", quizzController.index);

//Router ressources
router.get("/ressources", ressController.index);

module.exports = router;
