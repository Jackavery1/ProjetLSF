const express = require("express");
const app = express();
const connectDB = require("./database/database");
const port = 3001;
const path = require("path");
const router = require("./routes/router");
const Dictionnaire = require("./models/Dictionnaire");
const dicoController = require("./controllers/dicoController");

// Connexion à MongoDb (la base de données)
connectDB();

// Configuration EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Configuration des fichiers statiques
app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Utilisation du routeur
app.use("/", router);

//Connexion Localhost
app.listen(port, () => {
  console.log(`Serveur démarré sur le port ${port}`);
});
