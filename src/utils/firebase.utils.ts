import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithPopup,
  signInWithRedirect,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
  NextOrObserver,
} from 'firebase/auth';

import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  getDocs,
  query,
  QueryDocumentSnapshot,
} from 'firebase/firestore';
import { Category } from '../store/categories/cartegories.types';
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDlZFNYHtORaNWUlfFJOOMSHu-KIZvgWMY',
  authDomain: 'crown-clothing-db-177ae.firebaseapp.com',
  projectId: 'crown-clothing-db-177ae',
  storageBucket: 'crown-clothing-db-177ae.appspot.com',
  messagingSenderId: '670522940298',
  appId: '1:670522940298:web:6356969852a1a64fcd4673',
};

// Initialize Firebase
initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

// use select account prompt
googleProvider.setCustomParameters({
  prompt: 'select_account',
});

export const auth = getAuth(); // This keeps track of the authentication state through out the application

export const signInWithGooglePopUp = () =>
  signInWithPopup(auth, googleProvider);

export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, googleProvider);

// get the dbinstance
export const db = getFirestore();

// create seed data
export const createSeedData = async <T extends { title: string }>(
  key: string,
  objects: T[]
): Promise<void> => {
  // creates the colection refrenece
  const collectionRef = collection(db, key);
  // create a batch writer function
  const batch = writeBatch(db);
  objects.forEach((object) => {
    // get the documentRef
    const documentRef = doc(collectionRef, object['title'].toLowerCase());
    // create a batch set for write function
    batch.set(documentRef, object);
  });
  //this is applied to enable successful transaction
  await batch.commit();
};

// get collections and documents
export const getCategories = async (): Promise<Category[]> => {
  const collectionRef = collection(db, 'categories');
  // this generates a query off the collection reference
  const q = query(collectionRef);
  // this generates the snapshots of documents in the collection reference
  const querySnapShot = await getDocs(q);
  return querySnapShot.docs.map(
    (docSnapshot) => docSnapshot.data() as Category
  );
};

export type ObjectProperties = {
  displayName?: string;
};

export type UserData = {
  createdAt: Date;
  displayName: string;
  email: string;
};
// create user document
export const createUserDoc = async (
  userAuth: User,
  objProps = {} as ObjectProperties
): Promise<void | QueryDocumentSnapshot<UserData>> => {
  if (!userAuth || !db) return;
  // get the database reference
  const userDocRef = doc(db, 'users', userAuth.uid); // dbInstance , collectionName/identifier , userAuthenticationId(uid)
  // get the document snapshot
  const userSnapShot = await getDoc(userDocRef);
  // Only create a new document if the snapshot doesnt exist
  if (!userSnapShot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      // set the document and store in the database
      await setDoc(userDocRef, { displayName, email, createdAt, ...objProps });
    } catch (err) {
      console.log('Error Creating the user', err);
    }
  }
  return userSnapShot as QueryDocumentSnapshot<UserData>;
};

export const createAuthUserWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  if (!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  if (!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback: NextOrObserver<User>) =>
  onAuthStateChanged(auth, callback);

export const getCurrentUser = (): Promise<User | null> => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (userAuth) => {
        unsubscribe();
        resolve(userAuth);
      },
      reject
    );
  });
};
