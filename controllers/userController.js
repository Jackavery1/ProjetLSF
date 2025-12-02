const User = require("../models/User");

const show = async (req, res) => {
  try {
    const user = await User.findById(req.session.userId).select("-password").lean();

    if (!user) {
      return res.redirect("/login");
    }

    // Vue déplacée dans views/users/user.ejs
    res.render("users/user", {
      user,
    });
  } catch (err) {
    console.error("Erreur récupération profil utilisateur :", err);
    res.redirect("/login");
  }
};

module.exports = { show };

