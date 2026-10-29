// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC_9Q62etwEYBRZFo9L23g0UBkLj5rv1qk",
  authDomain: "miniblog-23922.firebaseapp.com",
  projectId: "miniblog-23922",
  storageBucket: "miniblog-23922.firebasestorage.app",
  messagingSenderId: "158185320013",
  appId: "1:158185320013:web:f0045ea689c8f9186b3604",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };
