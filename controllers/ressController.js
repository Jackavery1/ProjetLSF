const Ressource = require("../models/Ressources");

// Contrôleurur pour afficher ressources
const index = async (req, res) => {
  try {
    const { titre } = req.query;
    const filtre = titre ? { titre: { $regex: new RegExp(titre, "i") } } : {};

    const ressources = await Ressource.find(filtre).lean();
    res.render("ressources", {
      ressources,
    });
  } catch (err) {
    console.error("Erreur lors de la récupération des ressources :", err);
    res.render("ressources", {
      ressources: [],
    });
  }
};

// Contrôleur pour ajouter ressources
const add = async (req, res) => {
  const { titre, description, lien, categorie } = req.body;
  if (!titre || !lien)
    return res.status(400).send("Titre et lien sont requis.");

  try {
    const existe = await Ressource.findOne({
      titre: { $regex: new RegExp("^" + titre + "$", "i") },
    });
    if (existe) return res.status(409).send("Cette ressource existe déjà.");

    await Ressource.create({
      titre: String(titre).trim(),
      description: String(description || "").trim(),
      lien: String(lien).trim(),
      categorie: String(categorie || "Général").trim(),
    });

    res.redirect("/ressources");
  } catch (err) {
    console.error("Erreur ajout ressource :", err);
    res.status(500).send("Erreur serveur.");
  }
};

//Contrôlur pour supprimer ressources
const remove = async (req, res) => {
  try {
    const document = await Ressource.findByIdAndDelete(req.params.id);
    if (!document) {
      return res.status(404).send("Ressource introuvable");
    }
    res.redirect("/ressources");
  } catch (err) {
    console.error("Erreur suppression ressource :", err);
    res.status(500).send("Erreur de suppression");
  }
};

module.exports = { index, add, remove };
