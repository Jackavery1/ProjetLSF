require("dotenv").config();
const express = require("express");
const session = require("express-session");
const path = require("path");
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static("public"));

// Configuration de la session
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

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
