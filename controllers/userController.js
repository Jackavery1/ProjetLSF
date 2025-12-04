const User = require("../models/User");
const Dictionnaire = require("../models/Dictionnaire");
const Ressources = require("../models/Ressources");

const show = async (req, res) => {
  try {
    const user = await User.findById(req.session.userId)
      .select("-password")
      .lean();

    if (!user) {
      return res.redirect("/login");
    }

    const categoriesMots = await Dictionnaire.distinct("categorie");
    const categoriesRessources = await Ressources.distinct("categorie");

    res.render("users/user", {
      user,
      categoriesMots,
      categoriesRessources,
      userId: req.session.userId,
      userRole: req.session.userRole,
    });
  } catch (err) {
    console.error("Erreur récupération profil utilisateur :", err);
    res.redirect("/login");
  }
};

module.exports = { show };
