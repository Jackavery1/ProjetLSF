const User = require("../models/User");

const requireAuth = async (req, res, next) => {
  if (!req.session.userId) {
    return res.redirect("/login");
  }
  next();
};

const requireAdmin = async (req, res, next) => {
  if (!req.session.userId) {
    return res.redirect("/login");
  }

  try {
    const user = await User.findById(req.session.userId);
    if (!user || user.role !== "admin") {
      return res.status(403).render("error", {
        message: "Accès refusé. Vous devez être administrateur.",
      });
    }
    next();
  } catch (err) {
    console.error("Erreur vérification admin :", err);
    res.redirect("/login");
  }
};

module.exports = { requireAuth, requireAdmin };

