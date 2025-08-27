// controllers/quizzController.js

// Format très simple et explicite
// - mediaType: "video" | "image"
// - src: chemin vers le fichier dans /public
// - mode: "input" (utilisateur tape le mot) ou "qcm" (choix)
// - answer: bonne réponse (pour input)
// - accepted: variantes acceptées (accents/casse gérés côté front)
// - choices: tableau de propositions (pour qcm)
// - tip: petit indice affiché après correction

const questions = [
  {
    id: 1,
    mediaType: "video",
    src: "/quiz/bonjour.mp4",
    mode: "input",
    answer: "bonjour",
    accepted: ["bonjour", "salut"],
    tip: "Signe d’accueil, main ouverte devant le visage.",
  },
  {
    id: 2,
    mediaType: "video",
    src: "/quiz/merci.mp4",
    mode: "qcm",
    choices: ["Bonjour", "Merci", "Pardon", "Au revoir"],
    answerIndex: 1,
    tip: "Main part de la bouche vers l’avant.",
  },
  {
    id: 3,
    mediaType: "image",
    src: "/quiz/famille.jpg",
    mode: "input",
    answer: "famille",
    accepted: ["famille", "la famille"],
    tip: "Cercle formé avec les mains, notion de groupe.",
  },
];

exports.index = (req, res) => {
  res.render("quizz", { questions });
};
