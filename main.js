const express = require("express");
const app = express();
const connectDB = require("./database");
const port = 3000;
const router = require("./router");
const Dictionnaire = require("./models/Dictionnaire");
const dicoController = require("./dicoController");

// Connexion à MongoDb (la base de données)
connectDB();

//Router
app.use("/dictionnaire/signe/:mot", dicoController);

//Connexion Localhost
app.listen(port, () => {
  console.log(`Serveur démarré sur le port ${port}`);
});
