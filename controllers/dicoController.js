const Dictionnaire = require("../models/Dictionnaire");

const show = async (req, res) => {
  const mot = req.query.mot;

  if (!mot) {
    // Affiche juste le formulaire vide si rien trouvé
    return res.render("dictionnaire", {
      motRecherche: "",
      resultat: null,
      erreur: null,
    });
  }

  try {
    const resultat = await Dictionnaire.findOne({ mot });

    if (!resultat) {
      return res.render("dictionnaire", {
        motRecherche: mot,
        resultat: null,
        erreur: "Mot non trouvé",
      });
    }

    res.render("dictionnaire", {
      motRecherche: mot,
      resultat,
      erreur: null,
    });
  } catch (err) {
    console.error("Erreur lors de la recherche :", err);
    res.status(500).send("Erreur serveur");
  }
};

module.exports = {
  show,
};
