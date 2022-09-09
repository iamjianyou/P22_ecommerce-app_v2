/** The sotre is a combined place where all of redux happens.
    - where it receive actions 
    - dispatch them into reducers
    - generate the store object that will be used inside of application.
*/

import { compose, applyMiddleware } from 'redux';
import { legacy_createStore as createStore} from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage';
import logger from 'redux-logger'; 
import { rootReducer } from './root-reducer' // root-reducer

// import {configureStore} from '@reduxjs/toolkit';
// This logger is essentially something that allows us to see what the state looks like before an action
// is dispatched, what the action is, and then how the state in turn, looks after the action.






/** Redux-persist */
const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['user']
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

// middleware only applis when its actually inside of development env or return empty[]
const middlewares = [ process.env.NODE_ENV !== 'production' && logger].filter(Boolean);
// const middlewares = [logger]
const composeEnhacer = 
  (process.env.NODE_ENV !== 'production' &&
  window &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || 
  compose;

const composedEnhances = composeEnhacer(applyMiddleware(...middlewares))

/**
 * here's what fundamentally creates a store ? 
 * This store is just in order to
 * facilitate the movement and passing of actions through these reducers.
 */
// export const store = configureStore(rootReducer, undefined, composedEnhances);


export const store = createStore(persistedReducer, undefined, composedEnhances);
export const persistor = persistStore(store);

