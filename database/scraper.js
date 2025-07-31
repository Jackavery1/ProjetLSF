const puppeteer = require("puppeteer");
const mongoose = require("mongoose");
const Dictionnaire = require("../models/Dictionnaire");

const mots = [
  "bonjour",
  "merci",
  "oui",
  "non",
  "papa",
  "maman",
  "chat",
  "chien",
  "boire",
  "manger",
];

async function getMotInfo(mot, browser) {
  const page = await browser.newPage();
  const url = `https://dico.elix-lsf.fr/dictionnaire/${mot}`;

  try {
    await page.goto(url, { waitUntil: "networkidle2", timeout: 15000 });

    const data = await page.evaluate(() => {
      const definitionEl = document.querySelector(".word-explanation");
      const iframe = document.querySelector("iframe[src*='player.vimeo.com']");
      const categorieEl = document.querySelector(".word-category");

      return {
        definition:
          definitionEl?.innerText?.trim() || "Définition indisponible",
        video: iframe?.src || null,
        categorie: categorieEl?.innerText?.trim() || "non catégorisé",
      };
    });

    await page.close();

    if (!data.video) {
      console.warn(`⚠️ Pas de vidéo trouvée pour : ${mot}`);
      return null;
    }

    return {
      mot,
      definition: data.definition,
      categorie: data.categorie,
      video: data.video,
    };
  } catch (err) {
    console.error(`❌ Erreur pour ${mot} : ${err.message}`);
    await page.close();
    return null;
  }
}

async function run() {
  const browser = await puppeteer.launch();
  await mongoose.connect("mongodb://localhost:27017/ProjetLSF");

  console.log("✅ MongoDB & navigateur prêts");

  for (const mot of mots) {
    const info = await getMotInfo(mot, browser);
    if (info) {
      await Dictionnaire.updateOne({ mot: info.mot }, info, { upsert: true });
      console.log(`✅ ${mot} inséré`);
    }
  }

  await mongoose.disconnect();
  await browser.close();
  console.log("✅ Terminé.");
}

run();
