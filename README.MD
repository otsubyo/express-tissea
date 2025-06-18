
---

## Structure du projet
```
express-tissea/
├── backend/
│   ├── controllers/
│   ├── generated/
│   ├── middlewares/
│   ├── models/
│   ├── prisma/
│   ├── routes/
│   ├── .env
│   ├── app.js
│   ├── package-lock.json
│   ├── package.json
│   ├── seed.js
│   └── server.js

├── frontend/
│   ├── public/
│   ├── src/
│   ├── .gitignore
│   ├── eslint.config.js
│   ├── index.html
│   ├── package-lock.json
│   ├── package.json
│   ├── README.md
│   └── vite.config.mjs

└── prisma/
└── README.md
└── .gitignore
```

---

## Lancer le projet

### Prérequis :
- Node.js >= 18
- MongoDB local

### 1. Installation des dépendances
```bash
cd backend
npm install
cd ../frontend
npm install
```

### 2. Lancer l'API
```bash
cd backend
npm run dev
```

### 3. Lancer le frontend
```bash
cd frontend
npm run dev
```

---

## Authentification
- `/api/users/signup` : créer un compte
- `/api/users/login` : obtention d'un token JWT

Le token doit être inclus dans les headers comme :
```http
Authorization: Bearer <token>
```

---

## Fonctionnalités principales
### Backend (Express)
- CRUD des lignes, arrêts, catégories
- Calcul de distances entre arrêts / lignes
- JWT, protection des routes, validation

### Frontend (React + Leaflet)
- Pages : Accueil / Inscription / Connexion / Carte
- Affichage dynamique des lignes et de leurs arrêts
- Style bleu / noir pour correspondre à la charte Tisséa

---

## Schéma de base de données
Modélisation MongoDB via Prisma ou Mongoose avec 5 entités :
- User
- Category (bus / tram / metro)
- Line (liée à Category)
- Stop (coordonnées GPS)
- LineStop (pivot entre Line et Stop avec l'ordre)

---

## Carte Leaflet
Accessible via `/map` (connexion requise). Affiche toutes les lignes disponibles avec leurs arrêts géolocalisés.

---

## Auteur
- Nom : Premi
- Prénom : Carl
- Projet : Tisséa - Soutenance 2025
