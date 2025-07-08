const express = require("express");
const router = express.Router();
const dicoController = require("./dicoController");

//Router dico
router.get("/dictionnaire/signe/:mot", dicoController.show);

module.exports = router;
