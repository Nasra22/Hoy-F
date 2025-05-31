import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyCgkGfziU2v4-cEHER1wMuxNvqexXsAec8",
    authDomain: "hoyfinder.firebaseapp.com",
    projectId: "hoyfinder",
    storageBucket: "hoyfinder.firebasestorage.app",
    messagingSenderId: "346863496300",
    appId: "1:346863496300:web:489d0c569233c6d06abc49",
    measurementId: "G-ET913F8YNS"
  };
  

const app = initializeApp(firebaseConfig)

export default app;