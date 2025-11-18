import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCMZXMwBJnHfftkGgNzRratwTWKLmSFXGs",
  authDomain: "my-ecommerce-react-6ff68.firebaseapp.com",
  projectId: "my-ecommerce-react-6ff68",
  storageBucket: "my-ecommerce-react-6ff68.firebasestorage.app",
  messagingSenderId: "783394979430",
  appId: "1:783394979430:web:3be78b414347e5df71f7a7",
  measurementId: "G-B2WKB6REQS"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
