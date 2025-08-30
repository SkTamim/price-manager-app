import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBWAAtklpykCFHBNFP9QpVoeK869zBP-_s',
  authDomain: 'sks-price-manager.firebaseapp.com',
  projectId: 'sks-price-manager',
  storageBucket: 'sks-price-manager.appspot.com',
  messagingSenderId: '778978809610',
  appId: '1:778978809610:web:3c21cf36b4534f4be70cf3',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
