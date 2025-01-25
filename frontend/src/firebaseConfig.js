import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const API_KEY = process.env.REACT_APP_API_KEY;


const firebaseConfig = {
    apiKey: "API_KEY",
    authDomain: "petprojectbooking.firebaseapp.com",
    projectId: "petprojectbooking",
    storageBucket: "petprojectbooking.firebasestorage.app",
    messagingSenderId: "483803110592",
    appId: "1:483803110592:web:15752bc420198701082125"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);