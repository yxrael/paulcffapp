import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, initializeFirestore } from 'firebase/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyAnIiiRniDTp9NOHvsCIRqfMLsN8xgU-P8",
    authDomain: "paulcff-d427c.firebaseapp.com",
    projectId: "paulcff-d427c",
    storageBucket: "paulcff-d427c.appspot.com",
    messagingSenderId: "111680108168",
    appId: "1:111680108168:web:6bef6b3e8a4f55c438d13d",
    measurementId: "G-519G5DHT4W"
  };


  export const FirebaseApp = initializeApp(firebaseConfig);
  export const FirebaseAuth = getAuth(FirebaseApp);
  // export const FirebaseDB = getFirestore(FirebaseApp);
  export const FirebaseDB = initializeFirestore(FirebaseApp, {
    experimentalForceLongPolling: true,
  });
  




 