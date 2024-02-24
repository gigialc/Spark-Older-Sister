// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import "firebase/auth";
import "firebase/firestore";
import { getFirestore } from "firebase/firestore"; 
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBlcx2YFJrJBu85IDpM1UAlO1MN3pf78_c",
  authDomain: "older-sister-info.firebaseapp.com",
  projectId: "older-sister-info",
  storageBucket: "older-sister-info.appspot.com",
  messagingSenderId: "865074943413",
  appId: "1:865074943413:web:d59f4cb420cf9d0feeb5fc",
  measurementId: "G-ZT8F74SWP0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const db = getFirestore(app);

export { db };