const admin = require("firebase-admin");
import { config } from 'dotenv';

config();   // set env variables from dotenv

// initialize firebase admin
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY!);

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount)
// });
export const auth = admin.auth();
export const verifyIdToken = admin.auth().verifyIdToken;