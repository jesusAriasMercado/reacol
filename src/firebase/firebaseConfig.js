// src/firebase/firebaseConfig.js

// Importa las funciones necesarias del SDK de Firebase
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Configuración de Firebase para tu aplicación
const firebaseConfig = {
  apiKey: "AIzaSyAKb6OTeSWOgtAuXVk-bT7Ck7itUTYtGdY",
  authDomain: "sena-95b17.firebaseapp.com",
  projectId: "sena-95b17",
  storageBucket: "sena-95b17.appspot.com",  // Asegúrate de que este dominio esté correcto
  messagingSenderId: "143958750809",
  appId: "1:143958750809:web:a27095816f1d27aa0d2348"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Exporta `app` como exportación predeterminada
export default app; // Esto exporta la instancia de la app de Firebase

// Si necesitas Firestore o Auth, también puedes exportarlos aquí
export const db = getFirestore(app);
