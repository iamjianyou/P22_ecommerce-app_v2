/** The sotre is a combined place where all of redux happens.
    - where it receive actions 
    - dispatch them into reducers
    - generate the store object that will be used inside of application.
*/

import { compose, createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';

import { rootReducer } from './root-reducer';
import { rootSaga } from './root-saga';

// import {configureStore} from '@reduxjs/toolkit';
// This logger is essentially something that allows us to see what the state looks like before an action
// is dispatched, what the action is, and then how the state in turn, looks after the action.

const sagaMiddleware = createSagaMiddleware();





// middleware only applis when its actually inside of development env or return empty[]
const middlewares = [
  process.env.NODE_ENV !== 'production' && logger,
  sagaMiddleware 
].filter(Boolean); 

// const middlewares = [logger]
const composeEnhacer = 
  (process.env.NODE_ENV !== 'production' &&
  window &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || 
  compose;

/** Redux-persist */
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['cart'],
  // blacklist: ['user', ]
}


const persistedReducer = persistReducer(persistConfig, rootReducer)
const composedEnhancers = composeEnhacer(applyMiddleware(...middlewares))

/**
 * here's what fundamentally creates a store ? 
 * This store is just in order to
 * facilitate the movement and passing of actions through these reducers.
 */
// export const store = configureStore(rootReducer, undefined, composedEnhances);



export const store = createStore(
  persistedReducer,
  undefined,
  composedEnhancers,
);

sagaMiddleware.run(rootSaga);
export const persistor = persistStore(store);

