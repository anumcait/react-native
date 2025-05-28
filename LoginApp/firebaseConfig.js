// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';


const firebaseConfig = {
  apiKey: "AIzaSyBxTpf1WMTYqSEElFLmKmtLqJsL45lpMGY",
  authDomain: "loginapp-1eef6.firebaseapp.com",
  projectId: "loginapp-1eef6",
  storageBucket: "loginapp-1eef6.firebasestorage.app",
  messagingSenderId: "716053006485",
  appId: "1:716053006485:web:1f6bd3cc778b617554b39c"
};

const app = initializeApp(firebaseConfig);
//const auth = getAuth(app);

//export { auth };


// import { initializeApp } from "firebase/app";
// import { getMessaging } from "firebase/messaging";
// import { getAnalytics } from "firebase/analytics";
// import 'firebase/messaging';

// export const firebaseConfig = {
//     apiKey: "AIzaSyCN-xufjU2dketo9ncbel_vjKzOeKUvpDU",
//     authDomain: "primedevelopers-dev.firebaseapp.com",
//     projectId: "primedevelopers-dev",
//     storageBucket: "primedevelopers-dev.appspot.com",
//     messagingSenderId: "170251945449",
//     appId: "1:170251945449:web:556bd18edab7373f027778",
//     measurementId: "G-1KSWQ1Y4M1"
// };

// export const firebase = initializeApp(firebaseConfig);
// export const messaging = getMessaging(firebase);
// export const analytics = getAnalytics(firebase);