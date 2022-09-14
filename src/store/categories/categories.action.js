import { CATEGORIES_ACTION_TYPES } from './categories.type'
import { createAction } from '../../Utils/reducer/reducer.utils'
import {getCategoriesAndDocuments} from '../../Utils/firebase/firebase.utils'

export const setCategories = (categories) =>
  createAction(CATEGORIES_ACTION_TYPES.SET_CATEGORIES, categories);


export const fetchCategoriesStart = () => createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START);

export const fetchCategoriesSuccess = (categoriesArray) => createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS, categoriesArray);

export const fetchCategoriesFailure  = (error) => createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED, error);


export const fetchCategoriesAsync = () => async (dispatch) => {
  dispatch(fetchCategoriesStart());
  
  // handle situation of success/failure
  try {
    const categoriesArray = await getCategoriesAndDocuments('categories')
    dispatch(fetchCategoriesSuccess(categoriesArray))
  }catch (error){
    dispatch(fetchCategoriesFailure (error));
  }

}

// export const fetchCategoriesStart = () =>
//   createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START);

// export const fetchCategoriesSuccess = (categoriesArray) =>
//   createAction(
//     CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS,
//     categoriesArray
//   );

// export const fetchCategoriesFailure = (error) =>
//   createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED, error);


// export const fetchCategoriesAsync = () => async(dispatch) => {
//   dispatch(fetchCategoriesStart());

//   try{
//     const categoriesArray = await getCategoriesAndDocuments('categories');
//     dispatch(fetchCategoriesSuccess(categoriesArray));
//   }catch(error){
//     dispatch(fetchCategoriesFailure(error));

//   }
// }
// export const fetchCategoriesAsync = () => {
//   return async (dispatch) => {
//     dispatch(fetchCategoriesStart());
//     try {
//       const categoriesArray = await getCategoriesAndDocuments('categories');
//       dispatch(fetchCategoriesSuccess(categoriesArray));
//     } catch (error) {
//       dispatch(fetchCategoriesFailure(error));
//     }
//   };
// };