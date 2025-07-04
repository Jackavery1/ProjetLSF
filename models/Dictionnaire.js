const mongoose = require("mongoose");

// Modèle dictionnaire
const DictionnaireSchema = new mongoose.Schema({
  mot: String,
  categorie: String,
  definition: String,
  video: String,
});

// Exportation du modèle
module.exports = mongoose.model("Dictionnaire", DictionnaireSchema);
