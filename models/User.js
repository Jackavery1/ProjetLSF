const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// Modèle utilisateur
const UserSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  quizScore: {
    type: Number,
    default: 0,
  },
});

// Hash du mot de passe avant la sauvegarde
UserSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

// Compare le mot de passe avec le mot de passe hashé
UserSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

// Exportation du modèle
module.exports = mongoose.model("User", UserSchema);
