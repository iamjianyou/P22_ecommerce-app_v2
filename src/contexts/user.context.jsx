import { Children, createContext, useState, useEffect} from 'react';
import { onAuthStateChangedListener } from '../Utils/firebase/firebase.utils';

// As the actual value to get access
export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null,

})

// provider
export const UserProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(null)
    const value = {currentUser, setCurrentUser}
    useEffect(() => {
        const unsubscribe = onAuthStateChangedListener((user)=> {
            console.log('unsubscribe user -> ', user)
        })

        return unsubscribe // unsubscribe when unmounted
     }, [])

    return <UserContext.Provider value={value}> {children} </UserContext.Provider>
}

