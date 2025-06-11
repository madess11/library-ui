# Library UI

**Interface utilisateur moderne** pour la recherche et la consultation de livres, construite avec React, TypeScript, Vite, TailwindCSS et l'API Open Library.


  
---

## Démo

 En local : `npm run dev`  
---

## Tech Stack

| Technologie     | Usage                           |
|----------------|----------------------------------|
| React + TypeScript | Base de l'application           |
| Vite            | Bundler ultra-rapide             |
| TailwindCSS     | Styling utilitaire                |
| React Router    | Navigation                        |
| Open Library API| Récupération des données livres  |
| Jest + Testing Library | Tests unitaires & composants UI |

---

## Installation

1. **Cloner le dépôt** :
   ```bash
   git clone git@github.com:madess11/library-ui.git
   cd library-ui
   ```

2. **Installer les dépendances** :
   ```bash
   npm install
   ```

3. **Lancer le serveur de développement** :
   ```bash
   npm run dev
   ```

---

## Tests

Lancer les tests unitaires :

```bash
npm test
```

Couverture : composants principaux & logique de navigation

---

## Structure

```
library-ui/
├── src/
│   ├── components/      # Composants UI réutilisables
│   ├── pages/           # Pages : SearchPage, ResultsPage
│   ├── services/        # API clients
│   ├── hooks/           # Hooks personnalisés
│   ├── types/           # Typage TypeScript
│   └── i18nlibrary-ui/            # Internationalisation
├── tests/               # Tests unitaires
├── public/              # Fichiers statiques
├── babel.config.js
├── jest.config.js
├── tailwind.config.js
├── vite.config.ts
└── README.md
```

---

## Fonctionnalités principales

- Recherche de livres par titre / auteur
- Suggestions via Open Library
- Design responsive et moderne