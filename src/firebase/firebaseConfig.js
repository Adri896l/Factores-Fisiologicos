import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "------------------------------------",
    authDomain: "---------------------------------",
    databaseURL: "--------------------------------------",
    projectId: "----------------------------------",
    storageBucket: "---------------------------------",
    messagingSenderId: "------------------------------",
    appId: "------------------------------------------------"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Exportar la base de datos
export { database };
