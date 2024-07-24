import {initializeApp} from 'firebase/app';
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  onSnapshot,
  doc,
  deleteDoc,
  updateDoc,
  query,
  where,
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBAbA0-wHyBOGZ9JTyeV0GT0mH1OPVXDeg',
  authDomain: 'fir-crudapp-4980b.firebaseapp.com',
  projectId: 'fir-crudapp-4980b',
  storageBucket: 'fir-crudapp-4980b.appspot.com',
  messagingSenderId: '99574906396',
  appId: '1:99574906396:web:d0d05b88fb8d669564e9d9',
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const firestore = getFirestore(app);

export {
  db,
  collection,
  getDocs,
  addDoc,
  onSnapshot,
  doc,
  deleteDoc,
  updateDoc,
  query,
  where,
  firestore
};
