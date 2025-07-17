const express = require("express");
const router = express.Router();
const dicoController = require("../controllers/dicoController");

//Router dico
router.get("/dictionnaire", dicoController.show);

module.exports = router;
