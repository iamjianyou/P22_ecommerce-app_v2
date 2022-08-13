/** 
import { createContext, useState, useEffect } from 'react';
import { onAuthStateChangedListener, createUserDocumentFromAuth} from '../Utils/firebase/firebase.utils';

// As the actual value to get access
export const UserContext = createContext({
    setCurrentUser: () => null,
    currentUser: null,
  });
  
  export const UserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const value = { currentUser, setCurrentUser };
  
    useEffect(() => {
      const unsubscribe = onAuthStateChangedListener((user) => {
        if (user) {
          createUserDocumentFromAuth(user);
        }
        setCurrentUser(user);
      });
  
      return unsubscribe; // unsubscribe when unmounted
    }, []);
  
    return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
  };


  /** Normally ContextAPI and Redux are not used at the same time
   *  Reason: Redux concept is that all of your state should be stored at one place --- Redux store.
   *  If user data gets stored in context and redux which will lead to confusing.
   *
   */
