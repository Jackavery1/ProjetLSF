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

const add = async (req, res) => {
  try {
    const validation = validateRequest(schemaAddRessource, req);

    if (validation.errors) {
      return res.status(400).send(validation.errors[0]);
    }

    const { titre, description, lien, categorie } = validation.value;

    const existe = await Ressource.findOne({
      titre: { $regex: new RegExp("^" + escapeRegex(titre) + "$", "i") },
    });
    if (existe) {
      return res.status(409).send("Cette ressource existe déjà");
    }

    await Ressource.create({
      titre,
      description: description || "",
      lien,
      categorie: categorie || "Général",
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
