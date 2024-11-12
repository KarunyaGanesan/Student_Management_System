import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "",
  authDomain: "student-management-1a6da.firebaseapp.com",
  projectId: "student-management-1a6da",
  storageBucket: "student-management-1a6da.appspot.com",
  messagingSenderId: "909868949431",
  appId: "1:909868949431:web:88a85041c3138e470fd232",
  measurementId: "G-JTZ8MT28WK"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export{ db, auth};
