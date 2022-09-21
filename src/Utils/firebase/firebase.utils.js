import {initializeApp} from 'firebase/app'
import { getAuth,
  signInWithRedirect, 
  signInWithPopup, 
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth'

import {  
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs


}from 'firebase/firestore'



// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAUt7xR0MdMQzM6vAw7YZn0cq_s_z9YS5M",
    authDomain: "crwn-clothing-db-33c07.firebaseapp.com",
    projectId: "crwn-clothing-db-33c07",
    storageBucket: "crwn-clothing-db-33c07.appspot.com",
    messagingSenderId: "666208830596",
    appId: "1:666208830596:web:5458bca42ab1c8e6d1eed1"
  };
  
// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const googleProvider = new GoogleAuthProvider();

// set up authentication with Google Provider

googleProvider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();
console.log('get auth -> ', auth)
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider)

// Firestore

export const db = getFirestore();

//param:  collectionKey, userKey
export const addCollectionAndDocuments= async (collectionKey, objectsToAdd) => {
  const collectionRef = collection(db, collectionKey); 
  const batch = writeBatch(db);

  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object)
  })

  await batch.commit();
  console.log('Done!')
}
// get data from Firestore
export const getCategoriesAndDocuments= async () => {
  const collectionRef = collection(db, 'categories');
  const q = query(collectionRef);
  // await Promise.reject(new Error('Cannot find categories oops!'));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => doc.data());
};

export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {
  if(!userAuth) return;

  const userDocRef = doc(db, 'users', userAuth.uid);

  console.log('userDocRef', userDocRef)

  const userSnapshot = await getDoc(userDocRef)
  console.log('userSnapshot= >', userSnapshot.exists())

  // if user data NOT exists
  if(!userSnapshot.exists()){
    const {displayName, email} = userAuth;
    const createAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createAt,
        ...additionalInformation
      });
    } catch (error){
      console.log('error-when creating the user', error.message);
    }
  }
  // if not exists, then create set user snapshot then return user doc ref
  return userSnapshot;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};


export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async() => await signOut(auth)

// user signIn/signOut means Auth change, both change will get Callback invoked
// whenever instantiated this function, it need a call back to the inside function
export const onAuthStateChangedListener = (callback) =>{
  onAuthStateChanged(auth, callback);
}

export const getCurrentUser = () => {
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