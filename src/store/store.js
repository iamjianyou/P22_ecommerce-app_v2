/** The sotre is a combined place where all of redux happens.
    - where it receive actions 
    - dispatch them into reducers
    - generate the store object that will be used inside of application.
*/

import { compose, applyMiddleware } from 'redux';
import { legacy_createStore as createStore} from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage';


// import {configureStore} from '@reduxjs/toolkit';

// This logger is essentially something that allows us to see what the state looks like before an action
// is dispatched, what the action is, and then how the state in turn, looks after the action.
import logger from 'redux-logger'; 

import { rootReducer } from './root-reducer' // root-reducer


/** demo */

const curryFunc = (a) => (b, c) => {
  // a + b - c
}

const withA = curryFunc(3) // 

withA(2, 4);// 3 + 2 - 4






/**
 * Middle wears our kind of like little library helpers that run before an action hits the reducer.
   So whenever you dispatch an action before that action hits the reducers, it hits the middleware first.
 */

/** The first function receives the store object, 
  this return the 'next' method that allows us to pass on the action.
 and /return/recived the action.
*/
 const loggerMiddleware = (store) => (next) => (action) => {
    // 
    if (!action.type){
      return next(action)
    }
    console.log('action type :', action.type)
    console.log('playload: ', action.payload)
    console.log('current state: ', store.getState())

    next(action);

    console.log('next state: ', store.getState())
  }



/** Redux-persist */
const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['user']
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const middlewares = [loggerMiddleware]
// const middlewares = [logger]


const composedEnhances = compose(applyMiddleware(...middlewares))

/**
 * here's what fundamentally creates a store ? 
 * This store is just in order to
 * facilitate the movement and passing of actions through these reducers.
 */
// export const store = configureStore(rootReducer, undefined, composedEnhances);


export const store = createStore(persistedReducer, undefined, composedEnhances);
export const persistor = persistStore(store);

