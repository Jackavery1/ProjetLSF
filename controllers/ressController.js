const Ressource = require("../models/Ressources");

// Regex caractères spéciaux
const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

// Contrôleur pour afficher ressources
const show = async (req, res) => {
  try {
    // Récupérer le paramètre de recherche
    const { titre } = req.query;
    // filtre MongoDB : si titre = filtre, sinon tout
    const filtre = titre
      ? { titre: { $regex: new RegExp(escapeRegex(titre.trim()), "i") } }
      : {};

    const ressources = await Ressource.find(filtre).lean();
    res.render("ressources", {
      ressources,
      userId: req.session.userId,
      userRole: req.session.userRole,
    });
  } catch (err) {
    console.error("Erreur lors de la récupération des ressources :", err);
    res.render("ressources", {
      ressources: [],
      userId: req.session.userId,
      userRole: req.session.userRole,
    });
  }
};

// Contrôleur pour ajouter ressources
const add = async (req, res) => {
  const { titre, description, lien, categorie } = req.body;
  if (!titre || !lien)
    return res.status(400).send("Titre et lien sont requis.");

  try {
    // Vérifie si la ressource existe déjà
    const existe = await Ressource.findOne({
      titre: { $regex: new RegExp("^" + escapeRegex(titre.trim()) + "$", "i") },
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
    res.status(500).send("Erreur serveur");
  }
};

//Contrôleur pour supprimer ressources
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

module.exports = { show, add, remove };
