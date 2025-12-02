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

    const utilisateursRecents = await User.find()
      .sort({ _id: -1 })
      .limit(5)
      .select("nom email role")
      .lean();

    res.render("users/admin", {
      stats,
      utilisateursRecents,
    });
  } catch (err) {
    console.error("Erreur récupération données admin :", err);
    res.render("users/admin", {
      stats: { utilisateurs: 0, mots: 0, ressources: 0 },
      utilisateursRecents: [],
    });
  }
};

module.exports = { show };
