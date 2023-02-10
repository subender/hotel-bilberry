import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAfI782_75GlozRbZufKeCcYS-JTZ_Rvgc",
  authDomain: "hotelbilberry-65fa5.firebaseapp.com",
  databaseURL:
    "https://hotelbilberry-65fa5-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "hotelbilberry-65fa5",
  storageBucket: "hotelbilberry-65fa5.appspot.com",
  messagingSenderId: "954475453734",
  appId: "1:954475453734:web:7489e045a7912ec368b5e7",
  measurementId: "G-JYX42QV3X8",
};

const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);

const firestore = getFirestore(app);
const storage = getStorage(app);

export { app, firestore, storage };
