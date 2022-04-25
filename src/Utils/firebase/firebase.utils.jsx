 import {initializeApp} from 'firebase/app'
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider} from 'firebase/auth'
import {  
  getFirestore,
  doc,
  getDoc,
  setDoc,

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

// set up authentication
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();
export const signInwithGooglePopup = () => signInWithPopup(auth, provider);

// Firestore

export const db = getFirestore();
export const createUserDocumentFromAuth = async (userAuth) => {
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
        createAt
      });
    } catch (error){
      console.log('error-when creating the user', error.message);
    }
  }
  // if not exists, then create set user snapshot then return user doc ref
  return userDocRef;











}

