/** Reducer always stores the most basic format, 
 * essentially, it is the data you get from your API
 */
import { CATEGORIES_ACTION_TYPES } from "./categories.type";

export const CATEGORIES_INITIAL_STATE = {
    categoriesMap: {}
}

/** categories Reducer is a fn that receives state which by default is equal to categories INITIAL STATE and then get an action.
If noaction is passed and the reducer runs by default, we pass an empty action object so that there's something to call.
*/
export const categoriesReducer = (state = CATEGORIES_INITIAL_STATE, action = {} ) => {

    const { type, payload } = action;

    switch(type){
        case CATEGORIES_ACTION_TYPES.SET_CATEGORIES_MAP:
            return {...state, categoriesMap: payload};
        default:
            return state;
    }
}