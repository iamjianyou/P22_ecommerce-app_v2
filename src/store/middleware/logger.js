/******************************************** demo *******************************************/
const curryFunc = (a) => (b, c) => {
    // a + b - c
  }
  const withA = curryFunc(3) // 
  withA(2, 4);// 3 + 2 - 4
  /******************************************** demo *******************************************/
  
  
  
  
  /**
   * Middle wears our kind of like little library helpers that run before an action hits the reducer.
     So whenever you dispatch an action before that action hits the reducers, it hits the middleware first.
   */
  
  /** The first function receives the store object, 
    this return the 'next' method that allows us to pass on the action.
   and /return/recived the action.
  */
   export const loggerMiddleware = (store) => (next) => (action) => {
  
      if (!action.type){
        return next(action)
      }
      
      console.log('action type :', action.type)
      console.log('playload: ', action.payload)
      console.log('current state: ', store.getState())
  
      next(action);
  
      console.log('next state: ', store.getState())
    }
  