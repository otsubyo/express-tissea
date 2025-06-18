
---

## 🗂 Structure du projet
```
express-tissea/
├── backend/            # API Express
│   ├── models/         # Schémas Mongoose
│   ├── controllers/    # Logique des endpoints
│   ├── routes/         # Fichiers de routing
│   ├── server.js       # Point d’entrée backend
│   └── .env            # Variables d’environnement
├── frontend/           # Application React
│   ├── src/
│   │   ├── pages/      # Pages React (Home, Login, Signup, MapView)
│   │   ├── App.jsx     # Routing principal
│   │   └── index.css   # Thème bleu / noir
│   └── package.json
└── README.md
```

---

## ⚙️ Lancer le projet

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
npm start
```

---

## 🔐 Authentification
- `/api/users/signup` : créer un compte
- `/api/users/login` : obtention d'un token JWT

Le token doit être inclus dans les headers comme :
```http
Authorization: Bearer <token>
```

---

## 🧭 Fonctionnalités principales
### Backend (Express)
- CRUD des lignes, arrêts, catégories
- Calcul de distances entre arrêts / lignes
- JWT, protection des routes, validation

### Frontend (React + Leaflet)
- Pages : Accueil / Inscription / Connexion / Carte
- Affichage dynamique des lignes et de leurs arrêts
- Style bleu / noir pour correspondre à la charte Tisséa

---

## 🧪 Schéma de base de données
Modélisation MongoDB via Prisma ou Mongoose avec 5 entités :
- User
- Category (bus / tram / metro)
- Line (liée à Category)
- Stop (coordonnées GPS)
- LineStop (pivot entre Line et Stop avec l'ordre)

---

## 🗺 Carte Leaflet
Accessible via `/map` (connexion requise). Affiche toutes les lignes disponibles avec leurs arrêts géolocalisés.

---

## 👤 Auteur
- Nom : Premi
- Prénom : Carl
- Projet : Tisséa - Soutenance 2025
