// Import the functions you need from the SDKs you need
import{ initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDBNJjjVtbsNQ7Zz-zRrMBTHuefKPnkKl0",
  authDomain: "clone-a7800.firebaseapp.com",
  projectId: "clone-a7800",
  storageBucket: "clone-a7800.appspot.com",
  messagingSenderId: "517529698821",
  appId: "1:517529698821:web:1f1fe2c738bf8e6ff2526c",
  measurementId: "G-P9YYGYPLKW",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const analytics = getAnalytics(app);
export const db = getFirestore(app);
