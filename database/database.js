const mongoose = require("mongoose");
const Dictionnaire = require("../models/Dictionnaire");
const data = require("../public/data");

// Connexion à MongoDB
module.exports = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/ProjetLSF", {});
    console.log("Connexion réussie à MongoDB");
    await Dictionnaire.deleteMany({});
    await Dictionnaire.insertMany(data);
    console.log("Données ajoutées à la base de données");
  } catch (err) {
    console.error("Erreur de connexion à MongoDB :", err);
    throw err;
  }
};
