/** To replace context with reducers 
 *  And use reducers inside of context
*/

// Use contexts with Reducers
/** The components drive actions into reducers, 
 * the reducers drive their corresponding values to their components.
*/

import { createContext, useEffect, useReducer } from 'react';
import { onAuthStateChangedListener, createUserDocumentFromAuth} from '../Utils/firebase/firebase.utils';
import createAction from '../Utils/reducer/reducer.utils';

// As the actual value to get access
export const UserContext = createContext({
    setCurrentUser: () => null,
    currentUser: null,
  });

/** Action types */
export const USER_ACTION_TYPES = {
  SET_CURRENT_USER: 'SET_CURRENT_USER',
};

const INITIAL_STATE = {
  currentUser: null,
};

const userReducer = (state, action ) => {
  // console.log('state--> ', state)
  // console.log('dispatched')
  // console.log('action -> ', action)
  const {type, payload} = action;
  // return back an object with those valuses depending on the type
  // ...state => spread through the previous state in all of the current values for the object
  switch(type){
    case USER_ACTION_TYPES.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: payload,
         
      }
    default:
      throw new Error(`Unhandled type: ${type} in userReducer`)
  }
}



  /** Istead to use reducer inside of Context */
  export const UserProvider = ({ children }) => {
    // to utilize the userReducer by using useReducer hook
    // [state(currentUser), dispatch]
    // current values thats being stored by the reducer
    // its a fn that whenever you call it, you pass it an action object
    const [{currentUser}, dispatch] = useReducer(userReducer, INITIAL_STATE)

    console.log('currentUser --> ', currentUser)

    const setCurrentUser = (user) => {
      dispatch(
        createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user)
      )
    }


    // const [currentUser, setCurrentUser] = useState(null);
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


