# ProjetLSF - Application d'apprentissage de la Langue des Signes Française

Application web interactive pour découvrir et apprendre la Langue des Signes Française (LSF). Le projet propose un dictionnaire de signes, des quiz interactifs et des ressources pédagogiques.

## 📋 Table des matières

- [Fonctionnalités](#-fonctionnalités)
- [Technologies utilisées](#-technologies-utilisées)
- [Prérequis](#-prérequis)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Utilisation](#-utilisation)
- [Structure du projet](#-structure-du-projet)
- [Scripts disponibles](#-scripts-disponibles)
- [Déploiement sur Render](#-déploiement-sur-render)
- [Design Responsive et Mobile-First](#-design-responsive-et-mobile-first)
- [Sécurité](#-sécurité)
- [Contribution](#-contribution)

## ✨ Fonctionnalités

### Fonctionnalités publiques

- **Dictionnaire LSF** : Recherche et consultation de mots avec leurs signes correspondants
- **Quiz interactifs** : Tests de connaissances pour évaluer votre apprentissage
- **Ressources pédagogiques** : Accès à une bibliothèque de ressources utiles pour l'apprentissage de la LSF

### Fonctionnalités utilisateur

- **Inscription et connexion** : Système d'authentification sécurisé
- **Profil utilisateur** : Gestion de votre compte et suivi de vos scores de quiz
- **Ajout de contenu** : Possibilité d'ajouter des mots au dictionnaire et des ressources (après authentification)

### Fonctionnalités administrateur

- **Panneau d'administration** : Interface dédiée pour la gestion du contenu
- **Modération** : Suppression de mots du dictionnaire et de ressources
- **Gestion des utilisateurs** : Administration complète de la plateforme

## 🛠 Technologies utilisées

### Backend

- **Node.js** : Environnement d'exécution JavaScript
- **Express.js 5.1.0** : Framework web pour Node.js
- **MongoDB** : Base de données NoSQL
- **Mongoose 8.17.0** : ODM pour MongoDB
- **bcrypt 6.0.0** : Hachage sécurisé des mots de passe
- **express-session 1.18.2** : Gestion des sessions utilisateur

### Frontend

- **EJS 3.1.10** : Moteur de template
- **Tailwind CSS 3.4.18** : Framework CSS utility-first avec approche **mobile-first**
- **PostCSS** : Traitement CSS avec autoprefixer

### Outils de développement

- **nodemon 3.1.10** : Redémarrage automatique du serveur en développement
- **dotenv 17.2.3** : Gestion des variables d'environnement

## 📦 Prérequis

Avant de commencer, assurez-vous d'avoir installé :

- **Node.js** (version 14 ou supérieure)
- **npm** (généralement inclus avec Node.js)
- **MongoDB** (local ou instance cloud comme MongoDB Atlas)

## 🚀 Installation

1. **Cloner le repository**

   ```bash
   git clone https://github.com/Jackavery1/ProjetLSF.git
   cd ProjetLSF
   ```

2. **Installer les dépendances**

   ```bash
   npm install
   ```

3. **Configurer les variables d'environnement**

   Créez un fichier `.env` à la racine du projet avec le contenu suivant :

   ```env
   PORT=3000
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database
   SESSION_SECRET=votre_secret_session_aleatoire_et_securise
   ```

   > **⚠️ Important** :
   >
   > - Remplacez `MONGODB_URI` par votre URI de connexion MongoDB (locale ou MongoDB Atlas)
   > - Pour `SESSION_SECRET`, utilisez une chaîne aléatoire et sécurisée (vous pouvez en générer une avec `openssl rand -base64 32` ou un générateur en ligne)
   > - **Ne commitez jamais** le fichier `.env` dans Git (il est déjà dans `.gitignore`)

4. **Compiler les styles CSS** (pour la production)
   ```bash
   npm run build
   ```

## ⚙️ Configuration

### Configuration MongoDB

- **MongoDB local** : Assurez-vous que MongoDB est démarré sur votre machine
- **MongoDB Atlas** : Utilisez l'URI de connexion fournie par Atlas dans `MONGODB_URI`

## 💻 Utilisation

### Mode développement

Démarrer le serveur en mode développement avec rechargement automatique :

```bash
npm run dev
```

Le serveur sera accessible à l'adresse : `http://localhost:3000`

### Mode production

1. Compiler les assets CSS :

   ```bash
   npm run build
   ```

2. Démarrer le serveur :
   ```bash
   npm start
   ```

### Compilation CSS en mode watch (développement)

Pour compiler automatiquement les styles Tailwind CSS lors des modifications :

```bash
npm run build:css
```

## 📁 Structure du projet

```
ProjetLSF/
├── controllers/          # Contrôleurs pour la logique métier
│   ├── adminController.js
│   ├── authController.js
│   ├── dicoController.js
│   ├── quizController.js
│   ├── ressController.js
│   └── userController.js
├── database/             # Configuration de la base de données
│   └── database.js
├── middleware/           # Middlewares Express
│   └── auth.js
├── models/               # Modèles Mongoose
│   ├── Dictionnaire.js
│   ├── Ressources.js
│   └── User.js
├── public/               # Fichiers statiques
│   ├── css/
│   ├── images/
│   ├── js/
│   ├── output.css
│   └── tailwind.css
├── routes/               # Définition des routes
│   ├── routerback.js    # Routes API (backend)
│   └── routerfront.js   # Routes frontend
├── views/                # Templates EJS
│   ├── accueil.ejs
│   ├── dictionnaire.ejs
│   ├── quiz.ejs
│   ├── ressources.ejs
│   ├── partials/        # Partials réutilisables
│   └── users/           # Vues utilisateur
├── main.js               # Point d'entrée de l'application
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── .env                  # Variables d'environnement (à créer)
```

## 📜 Scripts disponibles

| Script                   | Description                                           |
| ------------------------ | ----------------------------------------------------- |
| `npm start`              | Démarre le serveur en mode production                 |
| `npm run dev`            | Démarre le serveur en mode développement avec nodemon |
| `npm run build`          | Compile les styles CSS pour la production             |
| `npm run build:css`      | Compile les styles CSS en mode watch (développement)  |
| `npm run build:css:prod` | Compile et minifie les styles CSS pour la production  |

## 🚀 Déploiement sur Render

Ce guide vous explique comment déployer l'application sur [Render](https://render.com), une plateforme de déploiement cloud.

### Prérequis

- Un compte [Render](https://render.com) (gratuit ou payant)
- Un cluster MongoDB Atlas (gratuit disponible)
- Votre code poussé sur GitHub

### Étapes de déploiement

1. **Créer un nouveau service Web sur Render**

   - Connectez-vous à votre compte Render
   - Cliquez sur "New +" puis sélectionnez "Web Service"
   - Connectez votre repository GitHub
   - Sélectionnez le repository `ProjetLSF`

2. **Configurer le service**

   - **Name** : `projetlsf` (ou le nom de votre choix)
   - **Environment** : `Node`
   - **Build Command** : `npm install && npm run build`
   - **Start Command** : `npm start`
   - **Plan** : Choisissez votre plan (Free tier disponible)

3. **Configurer les variables d'environnement**

   Dans la section "Environment Variables", ajoutez les variables suivantes :

   | Variable         | Valeur                                                                                        |
   | ---------------- | --------------------------------------------------------------------------------------------- |
   | `PORT`           | `10000` (Render définit automatiquement le port, mais cette valeur est utilisée en fallback)  |
   | `MONGODB_URI`    | Votre URI de connexion MongoDB Atlas (ex: `mongodb+srv://user:password@cluster.mongodb.net/`) |
   | `SESSION_SECRET` | Une chaîne aléatoire et sécurisée (générez-en une avec un générateur de secrets)              |

   > **Note importante** : Render définit automatiquement la variable `PORT` via `process.env.PORT`. Votre application utilise déjà `process.env.PORT || 3000` dans `main.js`, ce qui est parfait.

4. **Déployer**

   - Cliquez sur "Create Web Service"
   - Render va automatiquement :
     - Installer les dépendances (`npm install`)
     - Exécuter le build (`npm run build` qui compile les CSS)
     - Démarrer l'application (`npm start`)

### Points importants

- **Compilation CSS** : Le script `build` dans `package.json` compile automatiquement les styles Tailwind CSS avant le démarrage
- **Variables d'environnement** : Ne commitez jamais votre fichier `.env` dans Git. Utilisez uniquement les variables d'environnement de Render
- **MongoDB Atlas** : Assurez-vous que votre cluster MongoDB Atlas autorise les connexions depuis n'importe quelle IP (`0.0.0.0/0`) ou ajoutez l'IP de Render dans les Network Access
- **Sessions** : Les sessions sont stockées en mémoire par défaut. Pour la production, considérez l'utilisation d'un store de sessions (MongoDB, Redis) pour la persistance

### Vérification du déploiement

Une fois déployé, votre application sera accessible à l'URL fournie par Render (ex: `https://projetlsf.onrender.com`).

### Mise à jour du déploiement

À chaque push sur la branche principale de votre repository GitHub, Render redéploiera automatiquement votre application.

## 📱 Design Responsive et Mobile-First

Le projet suit une approche **mobile-first** avec Tailwind CSS :

- **Design adaptatif** : L'interface s'adapte automatiquement à tous les types d'écrans (mobile, tablette, desktop)
- **Navigation responsive** : Menu burger sur mobile, navigation horizontale sur desktop
- **Grilles flexibles** : Les grilles passent d'une colonne sur mobile à plusieurs colonnes sur les écrans plus grands
- **Breakpoints Tailwind** : Utilisation des breakpoints standards (`sm:`, `md:`, `lg:`, `xl:`) pour une expérience optimale sur tous les appareils

### Exemples de classes responsive utilisées :

- `flex flex-col md:flex-row` : Colonne sur mobile, ligne sur desktop
- `grid grid-cols-1 md:grid-cols-3` : 1 colonne sur mobile, 3 colonnes sur desktop
- `text-3xl md:text-4xl` : Tailles de texte adaptatives
- `hidden md:flex` : Éléments masqués sur mobile, visibles sur desktop

## 🔐 Sécurité

- Les mots de passe sont hachés avec bcrypt avant stockage
- Les sessions sont sécurisées avec un secret configurable
- Les routes sensibles sont protégées par des middlewares d'authentification
- Les actions d'administration nécessitent le rôle `admin`

## 🤝 Contribution

Les contributions sont les bienvenues ! Pour contribuer :

1. Fork le projet
2. Créez une branche pour votre fonctionnalité (`git checkout -b feature/AmazingFeature`)
3. Committez vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request

## 📝 Licence

Ce projet est sous licence ISC.

## 🐛 Signaler un bug

Si vous rencontrez un bug, veuillez ouvrir une issue sur [GitHub](https://github.com/Jackavery1/ProjetLSF/issues) en décrivant le problème de manière détaillée.

## 📧 Contact

Pour toute question ou suggestion, n'hésitez pas à ouvrir une issue sur le repository GitHub.

---

**Développé avec ❤️ pour l'apprentissage de la Langue des Signes Française**
