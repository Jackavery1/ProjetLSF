const mongoose = require("mongoose");
const Dictionnaire = require("../models/Dictionnaire");
const Ressources = require("../models/Ressources");

// Connexion à MongoDB
module.exports = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/ProjetLSF", {});
    console.log("Connexion réussie à MongoDB");

    console.log("Données ajoutées à la base de données");
  } catch (err) {
    console.error("Erreur de connexion à MongoDB :", err);
    throw err;
  }
};
