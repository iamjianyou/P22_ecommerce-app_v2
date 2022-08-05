import { USER_ACTION_TYPES } from '../../store/user/user.types'

const INITIAL_STATE = {
  currentUser: null,
};

/** ***** Reducer in Redux **********
* receive EVERY single action that gets dispatched ever,
* as a result it return the default state.
*
* Actions pass to every single reducer by default needs to retrun the previous state if none of the cases match to the type. 
*
*/

/**
Actions pass to every single reducer
*/


// Because no reducerhooks thus set inital state with default INITIAL_STATE
// we need to 


export const userReducer = (state = INITIAL_STATE, action={} ) => {

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
      return state;
      // throw new Error(`Unhandled type: ${type} in userReducer`)
  }
}
