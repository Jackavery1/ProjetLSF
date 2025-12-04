const User = require("../models/User");
const Dictionnaire = require("../models/Dictionnaire");
const Ressources = require("../models/Ressources");

const show = async (req, res) => {
  try {
    const stats = {
      utilisateurs: await User.countDocuments(),
      mots: await Dictionnaire.countDocuments(),
      ressources: await Ressources.countDocuments(),
    };

    const motsRecents = await Dictionnaire.find()
      .sort({ _id: -1 })
      .limit(5)
      .select("mot categorie definition")
      .lean();

    const ressourcesRecentes = await Ressources.find()
      .sort({ _id: -1 })
      .limit(5)
      .select("titre categorie description")
      .lean();

    const categoriesMots = await Dictionnaire.distinct("categorie");
    const categoriesRessources = await Ressources.distinct("categorie");

    res.render("users/admin", {
      stats,
      motsRecents,
      ressourcesRecentes,
      categoriesMots,
      categoriesRessources,
      userId: req.session.userId,
      userRole: req.session.userRole,
    });
  } catch (err) {
    console.error("Erreur récupération données admin :", err);
    res.render("users/admin", {
      stats: { utilisateurs: 0, mots: 0, ressources: 0 },
      motsRecents: [],
      ressourcesRecentes: [],
      categoriesMots: [],
      categoriesRessources: [],
      userId: req.session.userId,
      userRole: req.session.userRole,
    });
  }
};

module.exports = { show };
