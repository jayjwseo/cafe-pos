import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDv_rJPKmjeph_XVdWqsqSldn0ggEQp9EU",
  authDomain: "cafepos-6d6c4.firebaseapp.com",
  projectId: "cafepos-6d6c4",
  storageBucket: "cafepos-6d6c4.appspot.com",
  messagingSenderId: "432029458867",
  appId: "1:432029458867:web:c52ee19409ffab072f6bc6",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
