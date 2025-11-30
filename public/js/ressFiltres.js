// Récupérer les éléments de la page
const recherche = document.getElementById("recherche");
const toutesLesCartes = Array.from(
  document.querySelectorAll(".carteRessource")
);
const boutonsCategories = Array.from(
  document.querySelectorAll(".boutonCategorie")
);

// Catégorie par défaut
let categorieActive = "all";

// Les filtres
function appliquerLesFiltres() {
  // Récupérer la recherche -> minuscule
  const texteRecherche = (recherche?.value || "").trim().toLowerCase();

  // Parcourir chaque carte de ressource
  toutesLesCartes.forEach((carte) => {
    // Récupérer les informations de la carte
    const titreCarte = carte.dataset.title || "";
    const descriptionCarte = carte.dataset.desc || "";
    const categorieCarte = carte.dataset.cat || "Autre";

    // Vérifier texte = titre ou description ou catégorie
    const correspondAuTexte =
      texteRecherche === "" ||
      titreCarte.includes(texteRecherche) ||
      descriptionCarte.includes(texteRecherche) ||
      categorieCarte.toLowerCase().includes(texteRecherche);

    // Vérifier catégorie = all ou catégorie de la carte
    const correspondACategorie =
      categorieActive === "all" || categorieCarte === categorieActive;

    //Si 2 conditions vraies, afficher la carte
    if (correspondAuTexte && correspondACategorie) {
      carte.style.display = "";
    } else {
      carte.style.display = "none";
    }
  });
}

recherche?.addEventListener("input", appliquerLesFiltres);

// Écouter les clics sur les boutons de catégories
boutonsCategories.forEach((bouton) => {
  bouton.addEventListener("click", () => {
    // Maj catégorie active
    categorieActive = bouton.dataset.cat;

    // Retirer le style "actif" de tous les boutons
    boutonsCategories.forEach((b) =>
      b.classList.remove("ring-2", "ring-[#00a8a3]/50", "border-[#00a8a3]")
    );

    // Ajouter le style "actif" au bouton cliqué
    bouton.classList.add("ring-2", "ring-[#00a8a3]/50", "border-[#00a8a3]");

    // Réappliquer les filtres
    appliquerLesFiltres();
  });
});

const boutonParDefaut = document.querySelector(
  '.boutonCategorie[data-cat="all"]'
);
boutonParDefaut?.classList.add(
  "ring-2",
  "ring-[#00a8a3]/50",
  "border-[#00a8a3]"
);
