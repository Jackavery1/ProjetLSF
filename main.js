const express = require("express");
const app = express();
const { connectDB } = require("./database");
const { Dictionnaire } = require("./models/Dictionnaire");
const port = 3000;

app.listen(port, () => {
  console.log(`Serveur démarré sur le port ${port}`);
});
