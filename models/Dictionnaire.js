const mongoose = require("mongoose");

// Test Dico
const dictionnaire = [
  {
    bonjour: {
      mot: "bonjour",
      categorie: "salutation",
      video: "videos/bonjour.mp4",
    },
    merci: {
      mot: "merci",
      categorie: "formule_politesse",
      video: "videos/merci.mp4",
    },
    chat: {
      mot: "chat",
      categorie: "animal",
      video: "videos/chat.mp4",
    },
  },
];

// Modèle dictionnaire
const dictionnaireSchema = new mongoose.Schema({
  mot: String,
  categorie: String,
  definition: String,
  video: String,
});

// Création du modèle
const Dictionnaire = mongoose.model("Dictionnaire", dictionnaireSchema);

// Exportation du modèle
module.exports = { Dictionnaire };
