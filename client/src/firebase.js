import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDsG5FQ0x2cL9qwSLrjid7-iAAxWXR-h5M",
  authDomain: "gym-website-d45dd.firebaseapp.com",
  projectId: "gym-website-d45dd",
  storageBucket: "gym-website-d45dd.firebasestorage.app",
  messagingSenderId: "737733047580",
  appId: "1:737733047580:web:6b7b47a080cf1d542276d9",
  measurementId: "G-673G0WMRNF"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();