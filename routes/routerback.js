const express = require("express");
const router = express.Router();
const dicoController = require("../controllers/dicoController");
const quizController = require("../controllers/quizController");
const ressController = require("../controllers/ressController");
const authController = require("../controllers/authController");
const { requireAuth } = require("../middleware/auth");

// Ajout de mot Dico x requireAuth
router.post("/dictionnaire", requireAuth, dicoController.add);

// Supprimer mot Dico x requireAuth
router.post("/dictionnaire/:id", requireAuth, dicoController.remove);

// Ajout de ressources x requireAuth
router.post("/ressources", requireAuth, ressController.add);

// Supprimer ressources x requireAuth
router.post("/ressources/:id", requireAuth, ressController.remove);

// Authentification
router.post("/auth/login", authController.login);
router.post("/auth/register", authController.register);
router.post("/auth/logout", authController.logout);

module.exports = router;
