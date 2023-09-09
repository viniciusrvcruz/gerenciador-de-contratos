import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyBGqOWsjNAf0_oD5hmwcO0cjsMs0ISkgX4",
  authDomain: "gerenciador-de-contratos-8fc5c.firebaseapp.com",
  projectId: "gerenciador-de-contratos-8fc5c",
  storageBucket: "gerenciador-de-contratos-8fc5c.appspot.com",
  messagingSenderId: "680452412230",
  appId: "1:680452412230:web:b791770f0388b386f94b47"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);