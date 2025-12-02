require("dotenv").config();
const express = require("express");
const session = require("express-session");
const path = require("path");
const app = express();
const port = 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static("public"));

// Configuration de la session
// La session permet de stocker des données côté serveur pour chaque utilisateur
// secret : Clé secrète pour signer les cookies de session (stockée dans .env)
// resave : false = ne pas sauvegarder la session si elle n'a pas été modifiée
// saveUninitialized : false = ne pas créer de session vide
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

// Middleware personnalisé : Partage des données de session avec toutes les vues EJS
// res.locals : Variables disponibles dans TOUTES les vues EJS
// Ce middleware permet à la navbar et autres vues d'afficher du contenu selon l'état de connexion
app.use((req, res, next) => {
  res.locals.userId = req.session.userId;
  res.locals.userRole = req.session.userRole;
  next();
});

// Routes
const routerfront = require("./routes/routerfront");
const routerback = require("./routes/routerback");

//Utilisation routers
app.use("/", routerfront);
app.use("/api", routerback);

// Connexion MongoDB + import
const initDB = require("./database/database");
initDB();

// Connexion localhost
app.listen(port, () => {
  console.log(`Serveur lancé : http://localhost:${port}`);
});
