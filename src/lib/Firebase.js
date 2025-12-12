import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCLaItKY5zJUcaMfQVS6x13TGPRgSByv2g",
  authDomain: "future-star-65bf5.firebaseapp.com",
  databaseURL: "https://future-star-65bf5-default-rtdb.firebaseio.com",
  projectId: "future-star-65bf5",
  storageBucket: "future-star-65bf5.firebasestorage.app",
  messagingSenderId: "286190317486",
  appId: "1:286190317486:web:2cce296f69bf30221f623f",
  measurementId: "G-B8BWJC2C7N"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getDatabase(app);