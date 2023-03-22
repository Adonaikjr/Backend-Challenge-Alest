import { getFirestore } from "firebase-admin/firestore";
import admin from "firebase-admin";
import {firebaseConfig} from "./firebaseConfig.js" 

const firebaseApp = admin.initializeApp({
  credential: admin.credential.cert(firebaseConfig),
});

export const db = getFirestore(firebaseApp);
