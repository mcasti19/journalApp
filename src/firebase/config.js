// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";
import { getEnvironments } from "../helpers";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// console.log( import.meta.env );
// console.log(process.env);

const {
    VITE_APIKEY,
    VITE_AUTHDOMAIN,
    VITE_PROJECTID,
    VITE_STORAGEBUCKET,
    VITE_MESSAGINGSENDERID,
    VITE_APPID,
    VITE_MEASUREMENTID,
} = getEnvironments();


// Your web app's Firebase configuration
//! DEV/PROD
// const firebaseConfig = {
//     apiKey: "AIzaSyBF5QtQ382d2r8d1flPkINpfrQNgRI-9y8",
//     authDomain: "react-cursos-50d02.firebaseapp.com",
//     projectId: "react-cursos-50d02",
//     storageBucket: "react-cursos-50d02.appspot.com",
//     messagingSenderId: "605411294522",
//     appId: "1:605411294522:web:29034c341538b36d33a403"
// };

//! TESTING
const firebaseConfig = {

    apiKey: VITE_APIKEY,
    authDomain: VITE_AUTHDOMAIN,
    projectId: VITE_PROJECTID,
    storageBucket: VITE_STORAGEBUCKET,
    messagingSenderId: VITE_MESSAGINGSENDERID,
    appId: VITE_APPID,
    measurementId: VITE_MEASUREMENTID,
};

// console.log( firebaseConfig );

// Initialize Firebase
export const FirebaseApp = initializeApp( firebaseConfig );
export const FirebaseAuth = getAuth( FirebaseApp );
export const FirebaseDB = getFirestore( FirebaseApp );