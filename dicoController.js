const Dictionnaire = require("./models/Dictionnaire");

// get signe par mot
async function show(req, res) {
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
}

exports.show = show;
