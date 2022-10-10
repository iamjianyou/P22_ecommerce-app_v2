import { CATEGORIES_ACTION_TYPES, Category, CategoryItem } from './categories.type'
import { createAction, Action, withMatcher, ActionWithPayload } from '../../Utils/reducer/reducer.utils'


// export const setCategories = (categories) =>
//   createAction(CATEGORIES_ACTION_TYPES.SET_CATEGORIES, categories);

export type FetchCategoriesStart = Action<CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START>

export type FetchCategoriesSuccess = ActionWithPayload<CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS, Category[]>

export type FetchCategoriesFailed = ActionWithPayload<CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED, Error>


export type CategoryAction = 
    | FetchCategoriesStart 
    | FetchCategoriesSuccess
    | FetchCategoriesFailed;


// export const fetchCategoriesStart = (): FetchCategoriesStart =>
//     createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START);

export const fetchCategoriesStart = withMatcher(() =>
    createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START)
  );

export const fetchCategoriesSuccess = withMatcher(
    (categoriesArray: Category[]) =>
      createAction(
        CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS,
        categoriesArray
      )
  );
  
export const fetchCategoriesFailed = withMatcher((error: Error) =>
    createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED, error)
  );
