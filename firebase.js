// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCgkGfziU2v4-cEHER1wMuxNvqexXsAec8",
  authDomain: "hoyfinder.firebaseapp.com",
  projectId: "hoyfinder",
  storageBucket: "hoyfinder.firebasestorage.app",
  messagingSenderId: "346863496300",
  appId: "1:346863496300:web:489d0c569233c6d06abc49",
  measurementId: "G-ET913F8YNS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
