const express = require("express");
const router = express.Router();
const dicoController = require("../controllers/dicoController");
const quizController = require("../controllers/quizController");
const ressController = require("../controllers/ressController");
const adminController = require("../controllers/adminController");
const userController = require("../controllers/userController");
const { requireAuth, requireAdmin } = require("../middleware/auth");

// Router Accueil
router.get("/", (req, res) => {
  res.render("accueil", {
    userId: req.session.userId,
    userRole: req.session.userRole,
  });
});

// Router Dico
router.get("/dictionnaire", dicoController.show);

// Router Quiz
router.get("/quiz", quizController.show);

//Router ressources
router.get("/ressources", ressController.show);

// Router Login
router.get("/login", (req, res) => {
  res.render("users/login", {
    userId: req.session.userId,
    userRole: req.session.userRole,
  });
});

// Router Register
router.get("/register", (req, res) => {
  res.render("users/register", {
    userId: req.session.userId,
    userRole: req.session.userRole,
  });
});

// Router User x requireAuth
router.get("/user", requireAuth, userController.show);

// Router Admin x requireAuth x requireAdmin
router.get("/admin", requireAuth, requireAdmin, adminController.show);

module.exports = router;
