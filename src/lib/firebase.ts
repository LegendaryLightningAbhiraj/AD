import { initializeApp, getApps, getApp } from "firebase/app";

import {
  initializeAuth,
  getAuth,
  type Auth,
} from "firebase/auth";

import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD51a2cSbWBShABrlPUnPU-n1P7IlP9_Xs",
  authDomain: "focusly-f3db0.firebaseapp.com",
  projectId: "focusly-f3db0",
  storageBucket: "focusly-f3db0.firebasestorage.app",
  messagingSenderId: "427819838025",
  appId: "1:427819838025:web:d3cf8c580f85c7024aed98",
};

const app = getApps().length === 0
  ? initializeApp(firebaseConfig)
  : getApp();

let auth: Auth;

try {
  auth = initializeAuth(app);
} catch (error) {
  auth = getAuth(app);
}

const db = getFirestore(app);

export { app, auth, db };