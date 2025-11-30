const express = require("express");
const router = express.Router();
const dicoController = require("../controllers/dicoController");
const quizController = require("../controllers/quizController");
const ressController = require("../controllers/ressController");

// Router Accueil
router.get("/", (req, res) => {
  res.render("accueil");
});

// Router Dico
router.get("/dictionnaire", dicoController.show);

// Router Quiz
router.get("/quiz", quizController.show);

//Router ressources
router.get("/ressources", ressController.show);

module.exports = router;
