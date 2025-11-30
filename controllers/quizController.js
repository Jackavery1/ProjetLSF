const Dictionnaire = require("../models/Dictionnaire");

function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function generateQuestions(mots) {
  if (!mots || mots.length === 0) {
    return [];
  }

  const questions = [];
  const motsAvecVideo = mots.filter((m) => m.video && m.video.trim() !== "");

  if (motsAvecVideo.length === 0) {
    return [];
  }

  const motsMelanges = shuffleArray(motsAvecVideo);
  const nombreQuestions = Math.min(10, motsMelanges.length);

  for (let i = 0; i < nombreQuestions; i++) {
    const mot = motsMelanges[i];
    const mode = i % 2 === 0 ? "input" : "qcm";

    if (mode === "input") {
      questions.push({
        id: i + 1,
        mediaType: "video",
        src: mot.video,
        mode: "input",
        answer: mot.mot.toLowerCase(),
        accepted: [mot.mot.toLowerCase()],
        tip: mot.definition || `Catégorie : ${mot.categorie || "Général"}`,
      });
    } else {
      const autresMots = motsMelanges
        .filter((m) => m._id.toString() !== mot._id.toString())
        .map((m) => m.mot);
      const choixIncorrects = shuffleArray(autresMots).slice(0, 3);
      const tousLesChoix = shuffleArray([mot.mot, ...choixIncorrects]);
      const indexCorrect = tousLesChoix.indexOf(mot.mot);

      questions.push({
        id: i + 1,
        mediaType: "video",
        src: mot.video,
        mode: "qcm",
        choices: tousLesChoix,
        answerIndex: indexCorrect,
        tip: mot.definition || `Catégorie : ${mot.categorie || "Général"}`,
      });
    }
  }

  return questions;
}

const show = async (req, res) => {
  try {
    const tousLesMots = await Dictionnaire.find({}).lean();
    const questions = generateQuestions(tousLesMots);

    if (questions.length === 0) {
      return res.render("quiz", {
        questions: [],
        message: "Aucun mot avec vidéo disponible pour le quiz.",
      });
    }

    res.render("quiz", { questions });
  } catch (err) {
    console.error("Erreur lors de la récupération du quiz :", err);
    res.render("quiz", {
      questions: [],
      message: "Erreur lors du chargement du quiz.",
    });
  }
};

module.exports = { show };
