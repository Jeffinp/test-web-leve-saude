// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCcFqb5Ct5DFSGXFPF3IfGAjALWI_v2gSk",
    authDomain: "feedbackhub-levesaude.firebaseapp.com",
    projectId: "feedbackhub-levesaude",
    storageBucket: "feedbackhub-levesaude.firebasestorage.app",
    messagingSenderId: "544874407695",
    appId: "1:544874407695:web:ce84a74f6e34fa053cc07a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Exporta os serviços que vamos usar no projeto
export const auth = getAuth(app); 
export const db = getFirestore(app); 