const mongoose = require("mongoose");

// Connexion à MongoDB
module.exports = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/ProjetLSF", {});
    console.log("Connexion réussie à MongoDB");
  } catch (err) {
    console.error("Erreur de connexion à MongoDB :", err);
    throw err;
  }
};
