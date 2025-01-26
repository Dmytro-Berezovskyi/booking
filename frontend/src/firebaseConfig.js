import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"

const API_KEY = process.env.REACT_APP_API_KEY;


const firebaseConfig = {
    apiKey: "AIzaSyBnU34s9jzyZqUv3H6w3vrxX9elmBnGIZM",
    authDomain: "petprojectbooking.firebaseapp.com",
    projectId: "petprojectbooking",
    storageBucket: "petprojectbooking.firebasestorage.app",
    messagingSenderId: "483803110592",
    appId: "1:483803110592:web:15752bc420198701082125"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);