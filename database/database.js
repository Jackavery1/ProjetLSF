const mongoose = require("mongoose");

// Connexion à MongoDB
module.exports = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI;
    await mongoose.connect(mongoUri, {});
    console.log("Connexion réussie à MongoDB");
  } catch (err) {
    console.error("Erreur de connexion à MongoDB :", err);
    throw err;
  }
};
