// controllers/dicoController.js
const Dictionnaire = require("../models/Dictionnaire");

/**
 * GET /dictionnaire
 * - Affiche la page du dictionnaire
 * - Si ?mot=... est présent, fait une recherche insensible à la casse
 */
const show = async (req, res) => {
  // 1) Récupération du terme recherché (optionnel)
  const motRechercher = (req.query.mot || "").trim();

  try {
    let resultats = [];

    // 2) Recherche seulement si un terme est fourni
    if (motRechercher) {
      console.log("🔎 Recherche pour :", motRechercher);

      // Recherche insensible à la casse (regex "i")
      resultats = await Dictionnaire.find({
        mot: { $regex: new RegExp(motRechercher, "i") },
      });

      console.log("➡️ Résultats trouvés :", resultats.length);
    }

    // 3) Rendu de la page (toujours passer un tableau)
    res.render("dictionnaire", {
      resultats,
      siteTitle: "LSF - Dictionnaire",
    });
  } catch (err) {
    console.error("❌ Erreur GET /dictionnaire :", err);

    // En cas d’erreur, on affiche quand même la page (sans planter)
    res.render("dictionnaire", {
      resultats: [],
      siteTitle: "LSF - Dictionnaire",
    });
  }
};

const add = async (req, res) => {
  const { mot, definition, categorie, video } = req.body;

  // Vérification des champs obligatoires
  if (!mot || !definition) {
    return res.status(400).send("Mot et définition sont requis.");
  }

  try {
    // Vérifie si le mot existe déjà (insensible à la casse)
    const existe = await Dictionnaire.findOne({
      mot: { $regex: new RegExp("^" + mot + "$", "i") },
    });
    if (existe) {
      return res.status(409).send("Ce mot existe déjà.");
    }

    // Création du document
    await Dictionnaire.create({
      mot: String(mot).trim(),
      definition: String(definition || "").trim(),
      categorie: String(categorie || "Général").trim(),
      video: String(video || "").trim(),
    });

    // Redirection vers la liste dictionnaire (comme ressController fait vers /ressources)
    res.redirect("/dictionnaire");
  } catch (err) {
    console.error("Erreur ajout mot :", err);
    res.status(500).send("Erreur serveur.");
  }
};

module.exports = { show, add };
