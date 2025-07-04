const express = require("express");
const app = express();
const { connectDB } = require("./database");
const { Dictionnaire } = require("./models/Dictionnaire");
const port = 3000;

// Connexion à MongoDb (la base de données)
connectDB().catch((err) => {
  console.error("Erreur de connexion :", err);
});

// get signe par mot
app.get("/dictionnaire/signe", async (req, res) => {
  try {
    const mot = req.params.mot;
    const signe = await Dictionnaire.findOne({ mot: mot });

    if (!signe) {
      return res.status(404).send("Signe non trouvé");
    }

    res.json(signe);
  } catch (err) {
    console.error("Erreur lors de la recherche :", err);
    res.status(500).send("Erreur serveur");
  }
});

//Connexion Localhost
app.listen(port, () => {
  console.log(`Serveur démarré sur le port ${port}`);
});
