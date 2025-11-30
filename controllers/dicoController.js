const Dictionnaire = require("../models/Dictionnaire");

// Contrôleur pour afficher le dictionnaire
const show = async (req, res) => {
  try {
    const { mot } = req.query;

    // Si pas de terme recherché -> ne trouve rien -> n'affiche rien
    if (!mot || !mot.trim()) {
      return res.render("dictionnaire", {
        resultats: undefined,
      });
    }

    // Recherche insensible à la casse
    const filtre = { mot: { $regex: new RegExp(mot.trim(), "i") } };
    const resultats = await Dictionnaire.find(filtre).lean();

    res.render("dictionnaire", {
      resultats,
    });
  } catch (err) {
    console.error("Erreur lors de la récupération du dictionnaire :", err);
    res.render("dictionnaire", {
      resultats: [],
    });
  }
};

const add = async (req, res) => {
  const { mot, definition, categorie, video } = req.body;

  // Vérification des champs obligatoires
  if (!mot || !definition) {
    return res.status(400).send("Mot et définition requis");
  }

  try {
    // Vérifie si le mot existe déjà
    const existe = await Dictionnaire.findOne({
      mot: { $regex: new RegExp("^" + mot + "$", "i") },
    });
    if (existe) {
      return res.status(409).send("Ce mot existe déjà");
    }

    // Création du document
    await Dictionnaire.create({
      mot: String(mot).trim(),
      definition: String(definition || "").trim(),
      categorie: String(categorie || "Général").trim(),
      video: String(video || "").trim(),
    });

    // Redirection vers la liste dictionnaire
    res.redirect("/dictionnaire");
  } catch (err) {
    console.error("Erreur ajout mot :", err);
    res.status(500).send("Erreur serveur");
  }
};

//Contrôlur pour supprimer mot Dico
const remove = async (req, res) => {
  try {
    const document = await Dictionnaire.findByIdAndDelete(req.params.id);
    if (!document) {
      return res.status(404).send("Mot introuvable");
    }
    res.redirect("/dictionnaire");
  } catch (err) {
    console.error("Erreur suppression mot :", err);
    res.status(500).send("Erreur de suppression");
  }
};

module.exports = { show, add, remove };
