import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {getAuth} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyCIOJYiXwbhZEuNGJjCnWt4y8jkww6rOsM",
  authDomain: "lists-b1aeb.firebaseapp.com",
  projectId: "lists-b1aeb",
  storageBucket: "lists-b1aeb.appspot.com",
  messagingSenderId: "1051205023956",
  appId: "1:1051205023956:web:8477e14731a0de82da2341",
  measurementId: "G-QGXX4V462Q"
};


const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);

export {db, auth};