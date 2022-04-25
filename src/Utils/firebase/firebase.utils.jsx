 import {initializeApp} from 'firebase/app'
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider} from 'firebase/auth'

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

