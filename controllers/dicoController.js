const Dictionnaire = require("../models/Dictionnaire");

// Contrôleur pour afficher le dictionnaire
const show = async (req, res) => {
  try {
    const { mot } = req.query; // mot recherché (optionnel)

    // Si pas de terme recherché -> n'affiche rien (pas de find({}))
    if (!mot || !mot.trim()) {
      return res.render("dictionnaire", {
        resultats: undefined, // laisse la vue décider de n'afficher aucun bloc
        siteTitle: "LSF - Dictionnaire",
      });
    }

    // Recherche insensible à la casse si un terme est fourni
    const filtre = { mot: { $regex: new RegExp(mot.trim(), "i") } };
    const resultats = await Dictionnaire.find(filtre).lean();

    res.render("dictionnaire", {
      resultats,
      siteTitle: "LSF - Dictionnaire",
    });
  } catch (err) {
    console.error("Erreur lors de la récupération du dictionnaire :", err);
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

//Contrôlur pour supprimer mot Dico
const remove = async (req, res) => {
  const { id } = req.params;
  await Dictionnaire.findByIdAndDelete(id);
  res.redirect("/dictionnaire");
};

module.exports = { show, add, remove };
