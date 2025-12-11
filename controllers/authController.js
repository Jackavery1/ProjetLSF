const User = require("../models/User");

//Contrôleur de connexion
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    //Vérification des champs obligatoires
    if (!email || !password) {
      return res.render("users/login", {
        error: "Email et mot de passe requis",
        userId: req.session.userId,
        userRole: req.session.userRole,
      });
    }

    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.render("users/login", {
        error: "Identifiants incorrects",
        userId: req.session.userId,
        userRole: req.session.userRole,
      });
    }

    req.session.userId = user._id;
    req.session.userRole = user.role;

    if (user.role === "admin") {
      return res.redirect("/admin");
    }
    res.redirect("/user");
  } catch (err) {
    console.error("Erreur connexion :", err);
    res.render("users/login", {
      error: "Erreur serveur lors de la connexion",
      userId: req.session.userId,
      userRole: req.session.userRole,
    });
  }
};

//Contrôleur d'inscription
const register = async (req, res) => {
  try {
    const { nom, email, password } = req.body;

    if (!nom || !email || !password) {
      return res.render("users/register", {
        error: "Tous les champs sont requis",
        userId: req.session.userId,
        userRole: req.session.userRole,
      });
    }

    const existe = await User.findOne({ email });
    if (existe) {
      return res.render("users/register", {
        error: "Cet email est déjà utilisé",
        userId: req.session.userId,
        userRole: req.session.userRole,
      });
    }

    const user = await User.create({
      nom,
      email,
      password,
    });

    req.session.userId = user._id;
    req.session.userRole = user.role;

    res.redirect("/user");
  } catch (err) {
    console.error("Erreur inscription :", err);
    if (err.code === 11000) {
      return res.render("users/register", {
        error: "Cet email est déjà utilisé",
        userId: req.session.userId,
        userRole: req.session.userRole,
      });
    }
    res.render("users/register", {
      error: "Erreur serveur lors de l'inscription",
      userId: req.session.userId,
      userRole: req.session.userRole,
    });
  }
};

//Contrôleur de déconnexion
const logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Erreur déconnexion :", err);
    }
    res.redirect("/");
  });
};

module.exports = {
  login,
  register,
  logout,
};
