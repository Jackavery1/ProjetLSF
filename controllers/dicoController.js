const Dictionnaire = require("../models/Dictionnaire");

// Contrôleur pour afficher la page du dictionnaire
const show = async (req, res) => {
  const mot = req.query.mot;

  try {
    let resultats = [];

    // Si un mot est recherché, on effectue une recherche insensible à la casse
    if (mot) {
      resultats = await Dictionnaire.find({
        mot: { $regex: new RegExp(mot, "i") },
      });
    }

    // On envoie toujours un tableau "resultats" (vide ou non) pour éviter toute erreur dans la vue
    res.render("dictionnaire", {
      resultats,
      siteTitle: "LSF Express",
    });
  } catch (err) {
    console.error("Erreur lors de la recherche :", err);

    // En cas d’erreur, on affiche la page sans plantage
    res.render("dictionnaire", {
      resultats: [],
      siteTitle: "LSF Express",
    });
  }
};

// Contrôleur pour ajouter un mot au dictionnaire
const add = async (req, res) => {
  const { mot, definition, categorie, video } = req.body;

  // Vérifie que les champs essentiels sont remplis
  if (!mot || !definition) {
    return res.status(400).send("Mot et définition requis.");
  }

  try {
    // Empêche l'ajout d'un mot déjà existant
    const existe = await Dictionnaire.findOne({ mot });
    if (existe) {
      return res.status(409).send("Ce mot existe déjà.");
    }

    // Ajoute le nouveau mot à la base
    await Dictionnaire.create({
      mot,
      definition,
      categorie,
      video: video, // Attention : le champ dans le modèle est bien "lien_video"
    });

    // Redirection vers la recherche du mot ajouté
    res.redirect("/dictionnaire?mot=" + encodeURIComponent(mot));
  } catch (err) {
    console.error("Erreur ajout mot :", err);
    res.status(500).send("Erreur serveur.");
  }
};

module.exports = {
  show,
  add,
};
