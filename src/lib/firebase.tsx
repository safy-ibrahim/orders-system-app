
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// firebase setting
const firebaseConfig = {
  apiKey: "AIzaSyA5ei856WcKi-h_OycBEa-fYKVPedu_YhU",
  authDomain: "myposkdsapp.firebaseapp.com",
  projectId: "myposkdsapp",
  storageBucket: "myposkdsapp.appspot.com",
  messagingSenderId: "1013361838260",
  appId: "1:1013361838260:web:fb35e97909ac4070752fe1",
  measurementId: "G-DEFTLVLHH5"
};


const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

console.log("Firestore initialized with debugging enabled.");

export { db };
