/** Reducer always stores the most basic format, 
 * essentially, it is the data you get from your API
 */
import { Category } from './categories.type';

import {
  fetchCategoriesStart,
  fetchCategoriesSuccess,
  fetchCategoriesFailed,
} from './categories.action';
import { AnyAction } from 'redux';


export type CategoriesState = {
  readonly categories: Category[];
  readonly isLoading: boolean;
  readonly error: Error | null;
};

export const CATEGORIES_INITIAL_STATE: CategoriesState = {
  categories: [],
  isLoading: false,
  error: null,
};

export const categoriesReducer = (
  state = CATEGORIES_INITIAL_STATE,
  action = {} as AnyAction
): CategoriesState => {
  if (fetchCategoriesStart.match(action)) {
    return { ...state, isLoading: true };
  }

  if (fetchCategoriesSuccess.match(action)) {
    return { ...state, categories: action.payload, isLoading: false };
  }

  if (fetchCategoriesFailed.match(action)) {
    return { ...state, error: action.payload, isLoading: false };
  }

  return state;
};
// export type CategoriesState = {
//   readonly categories: Category[];
//   readonly isLoading: boolean;
//   readonly error: Error | null;
// };

// export const CATEGORIES_INITIAL_STATE: CategoriesState = {
//   categories: [],
//   isLoading: false,
//   error: null,
// };

// /** categories Reducer is a fn that receives state which by default is equal to categories INITIAL STATE and then get an action.
// If noaction is passed and the reducer runs by default, we pass an empty action object so that there's something to call.
// */
// export const categoriesReducer = (
//     state = CATEGORIES_INITIAL_STATE,
//     action = {} as AnyAction
//   ): CategoriesState => {
//     if (fetchCategoriesStart.match(action)){
//       return {...state, isLoading: true};
//     }

//     if (fetchCategoriesSuccess.match(action)) {
//       return { ...state, categories: action.payload, isLoading: false };
//     }

//     if (fetchCategoriesFailed.match(action)) {
//       return { ...state, error: action.payload, isLoading: false };
//     }

//     return state;
//   }