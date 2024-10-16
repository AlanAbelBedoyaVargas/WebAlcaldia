import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.2/firebase-app.js";
import {
  getFirestore,
  collection,
  getDocs,
} from "https://www.gstatic.com/firebasejs/9.6.2/firebase-firestore.js";

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyD-_OVF7ku7TlSO-F1XFEmDIiZoOMMrwXs",
  authDomain: "mepath-d5180.firebaseapp.com",
  projectId: "mepath-d5180",
  storageBucket: "mepath-d5180.appspot.com",
  messagingSenderId: "67417498402",
  appId: "1:67417498402:web:e09ed7dc3f57375737fb7b",
};

// Inicializa Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore();

// Obtener los usuarios desde Firebase
export const getUsers = async () => {
  const usersCol = collection(db, "users");
  const usersSnapshot = await getDocs(usersCol);
  const usersList = usersSnapshot.docs.map((doc) => doc.data());
  return usersList;
};

// Obtener los trayectos desde Firebase
export const getTrayectos = async () => {
  const trayectosCol = collection(db, "trayectos");
  const trayectosSnapshot = await getDocs(trayectosCol);
  const trayectosList = trayectosSnapshot.docs.map((doc) => doc.data());
  return trayectosList;
};
