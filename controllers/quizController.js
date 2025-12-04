const Dictionnaire = require("../models/Dictionnaire");

const show = async (req, res) => {
  try {
    const mots = await Dictionnaire.find({ video: { $exists: true, $ne: "" } })
      .limit(10)
      .lean();

    const questions = mots.map((mot, i) => ({
      id: i + 1,
      video: mot.video,
      answer: mot.mot.toLowerCase(),
    }));

    res.render("quiz", {
      questions,
      userId: req.session.userId,
      userRole: req.session.userRole,
    });
  } catch (err) {
    console.error("Erreur quiz :", err);
    res.render("quiz", {
      questions: [],
      userId: req.session.userId,
      userRole: req.session.userRole,
    });
  }
};

module.exports = { show };
