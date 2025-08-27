const mongoose = require("mongoose");

// Modèle ressources
const RessourceSchema = new mongoose.Schema({
  titre: String,
  description: String,
  lien: String,
  categorie: String,
});

// Exportation du modèle
module.exports = mongoose.model("Ressource", RessourceSchema);
