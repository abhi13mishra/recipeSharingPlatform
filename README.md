# Recipe Sharing Platform

A modern and interactive web application where users can create, share, discover, and bookmark delicious recipes. Built using **React**, **Firebase**, and **CSS**.

---

##  Features

*  User Authentication (Login/Register with Firebase)
*  Create and Edit Recipes (Title, Image, Ingredients, Instructions)
* View All Recipes in a feed
* View Recipe Details (Rich Text)
*  Bookmark Recipes (localStorage)
*  User-specific Recipe Management
*  Protected Routes (Only logged-in users can access create/edit)

---

##     Tech Stack

* **Frontend**: React, React Router, Context API
* **Backend/DB**: Firebase Authentication + Realtime Database
* **Styling**: CSS Modules (Upgradable to Tailwind or Chakra)
* **Deployment**: Vercel / Netlify (optional)

---

##     Folder Structure

```
recipe-sharing-platform/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   ├── context/
│   ├── pages/
│   ├── styles/
│   ├── firebase.js
│   ├── App.jsx
│   └── main.jsx
├── package.json
└── README.md
```

---

##   Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/your-username/recipe-sharing-platform.git
cd recipe-sharing-platform
```

### 2. Install dependencies

```bash
npm install
```

### 3. Firebase Setup

* Create a Firebase project at [https://firebase.google.com](https://firebase.google.com)
* Enable Authentication (Email/Password)
* Enable Realtime Database
* Copy your Firebase config and replace it in `src/firebase.js`

### 4. Run the app

```bash
npm run dev
```

---

## 🌐 Live Demo

[Live Site](https://your-live-site-url.vercel.app)

---

## 📸 Screenshots

*Add your app screenshots here*

---

## 🙏 Acknowledgments

* [Firebase Docs](https://firebase.google.com/docs)
* [React Router](https://reactrouter.com/en/main)
* Masai School for the project guidance

---

## 🧫 Future Improvements

* Commenting system
* Recipe collaboration
* Meal planner dashboard
* Like/share feature
* Search & Filter system

---

## 📬 Contact

Made with ❤️ by \[Your Name]
