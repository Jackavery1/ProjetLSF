const Dictionnaire = require("../models/Dictionnaire");

const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

// Contrôleur pour afficher le dictionnaire
const show = async (req, res) => {
  try {
    const { mot } = req.query;

    // Récupérer les catégories avec quelques mots par catégorie
    const categories = await Dictionnaire.distinct("categorie");
    const categoriesAvecMots = [];

    for (const categorie of categories) {
      //Vérification de la catégorie
      if (categorie && categorie.trim() !== "") {
        //Récupération des mots de la catégorie
        const mots = await Dictionnaire.find({ categorie })
          .limit(3)
          .select("mot")
          .lean();

        categoriesAvecMots.push({
          nom: categorie,
          mots: mots.map((m) => m.mot),
        });
      }
    }

    // Si pas de terme recherché -> afficher les catégories
    if (!mot || !mot.trim()) {
      return res.render("dictionnaire", {
        resultats: undefined,
        categoriesAvecMots,
        userId: req.session.userId,
        userRole: req.session.userRole,
      });
    }

    // Recherche insensible à la casse et caractères spéciaux
    const filtre = {
      mot: { $regex: new RegExp(escapeRegex(mot.trim()), "i") },
    };
    const resultats = await Dictionnaire.find(filtre).lean();

    res.render("dictionnaire", {
      resultats,
      categoriesAvecMots,
      userId: req.session.userId,
      userRole: req.session.userRole,
    });
  } catch (err) {
    console.error("Erreur lors de la récupération du dictionnaire :", err);
    res.render("dictionnaire", {
      resultats: [],
      categoriesAvecMots: [],
      userId: req.session.userId,
      userRole: req.session.userRole,
    });
  }
};

const add = async (req, res) => {
  try {
    const { mot, definition, categorie, video } = req.body;

    if (!mot || !definition) {
      return res.status(400).send("Le mot et la définition sont requis");
    }

    const existe = await Dictionnaire.findOne({
      mot: { $regex: new RegExp("^" + escapeRegex(mot) + "$", "i") },
    });
    if (existe) {
      return res.status(409).send("Ce mot existe déjà");
    }

    await Dictionnaire.create({
      mot,
      definition,
      categorie: categorie || "Général",
      video: video || "",
    });

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
