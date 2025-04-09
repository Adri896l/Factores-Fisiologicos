import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyANjKwn8s-LVoueQVMH2-3NL4l96nfeUr0",
    authDomain: "encuesta-782fa.firebaseapp.com",
    databaseURL: "https://encuesta-782fa-default-rtdb.firebaseio.com",
    projectId: "encuesta-782fa",
    storageBucket: "encuesta-782fa.firebasestorage.app",
    messagingSenderId: "692300698679",
    appId: "1:692300698679:web:bda96edbce7d48df721bb2"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Exportar la base de datos
export { database };
