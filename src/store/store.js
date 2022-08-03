/** The sotre is a combined place where all of redux happens.
    - where it receive actions 
    - dispatch them into reducers
    - generate the store object that will be used inside of application.
*/

import { compose, createstore, applyMiddleware } from 'redux';

// This logger is essentially something that allows us to see what the state looks like before an action
// is dispatched, what the action is, and then how the state in turn, looks after the action.
import logger from 'redux-logger'; 

import { rootReducer } from './root-reducer' // root-reducer


/**
 * Middle wears our kind of like little library helpers that run before an action hits the reducer.
   So whenever you dispatch an action before that action hits the reducers, it hits the middleware first.
 */
const middlewares = [logger]

const composedEnhances = compose(applyMiddleware(...middlewares))
/**
 * here's what fundamentally creates a store ? 
 * This store is just in order to
 * facilitate the movement and passing of actions through these reducers.
 */
export const store = createstore(rootReducer, undefined, composedEnhances);

