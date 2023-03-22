import { getFirestore } from "firebase-admin/firestore";
import admin from "firebase-admin";
import serviceAccount from "./firebaseConfig.json" assert { type: "json" };

const firebaseApp = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export const db = getFirestore(firebaseApp);
