import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, initializeFirestore } from 'firebase/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyAqvi-nOjXIENfyto3VaZxwug-Rj7sc5js",
    authDomain: "chavapro-9a967.firebaseapp.com",
    projectId: "chavapro-9a967",
    storageBucket: "chavapro-9a967.appspot.com",
    messagingSenderId: "705461988689",
    appId: "1:705461988689:web:2ad708cf6ec30c47367770",
    measurementId: "G-BV05K7C3S0"
  };


  export const FirebaseApp = initializeApp(firebaseConfig);
  export const FirebaseAuth = getAuth(FirebaseApp);
  // export const FirebaseDB = getFirestore(FirebaseApp);
  export const FirebaseDB = initializeFirestore(FirebaseApp, {
    experimentalForceLongPolling: true,
  });
  




 