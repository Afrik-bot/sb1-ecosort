import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyCjnanPcooavhSPxi_SuvVxqSvVFtunk-8",
  authDomain: "ecosort-42c86.firebaseapp.com",
  projectId: "ecosort-42c86",
  storageBucket: "ecosort-42c86.firebasestorage.app",
  messagingSenderId: "775061760283",
  appId: "1:775061760283:web:caac7abd677c5db4fd8bbe",
  measurementId: "G-P3GHNLPN5N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const analytics = getAnalytics(app);

export default app;