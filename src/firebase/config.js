// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBF5QtQ382d2r8d1flPkINpfrQNgRI-9y8",
    authDomain: "react-cursos-50d02.firebaseapp.com",
    projectId: "react-cursos-50d02",
    storageBucket: "react-cursos-50d02.appspot.com",
    messagingSenderId: "605411294522",
    appId: "1:605411294522:web:29034c341538b36d33a403"
};

// Initialize Firebase
export const FirebaseApp = initializeApp( firebaseConfig );
export const FirebaseAuth = getAuth( FirebaseApp );
export const FirebaseDB = getFirestore( FirebaseApp );