import { getApp, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// const firebaseConfig = {
//   apiKey: "AIzaSyCg00ntkfOqWslxQoRz9BwDhfeBS1erpwE",
//   authDomain: "mjpsmadnai.firebaseapp.com",
//   projectId: "mjpsmadnai",
//   storageBucket: "mjpsmadnai.appspot.com",
//   messagingSenderId: "966036400672",
//   appId: "1:966036400672:web:cf6d72355bae3fc90b2a45",
//   measurementId: "G-1GRRW4TS5H"
// };

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
  measurementId: process.env.MEASUREMENT_ID
};



function createFirebaseApp() {
  try {
    return getApp();
  } catch {
    return initializeApp(firebaseConfig);
    
  }
}

export const app = createFirebaseApp();
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
