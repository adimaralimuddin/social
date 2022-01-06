

import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyABHQp5_pLva9lSPr5xMj2at6_oQ36yh94",
    authDomain: "social-8f837.firebaseapp.com",
    projectId: "social-8f837",
    storageBucket: "social-8f837.appspot.com",
    messagingSenderId: "14029931055",
    appId: "1:14029931055:web:aa96e0a038563bdded7cda"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)