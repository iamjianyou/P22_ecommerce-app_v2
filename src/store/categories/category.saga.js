import { takeLatest, all, call, put } from 'redux-saga/effects';

import { getCategoriesAndDocuments } from '../../Utils/firebase/firebase.utils';
import { fetchCategoriesSuccess, fetchCategoriesFailed } from './categories.action'
import { CATEGORIES_ACTION_TYPES } from './categories.type'

// export const fetchCategoriesAsync = () => async (dispatch) => {
//     dispatch(fetchCategoriesStart());
    
//     // handle situation of success/failure
//     try {
//       const categoriesArray = await getCategoriesAndDocuments('categories')
//       dispatch(fetchCategoriesSuccess(categoriesArray))
//     }catch (error){
//       dispatch(fetchCategoriesFailure (error));
//     }
  
//   }

export function* fetchCategoriesAsync(){
    try {
        const categoriesArray = yield call(getCategoriesAndDocuments, 'categories');
        yield put(fetchCategoriesSuccess(categoriesArray))

      }catch (error){
        yield put(fetchCategoriesFailed(error))
      }

}

export function* onFetchCategories() {
    /** if it hears a bunch of the same action, give me the latest one */
    yield takeLatest(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START, fetchCategoriesAsync)
}

export function* categoriesSaga() {
  /** Run everything inside and only complete when all of it is done */
  yield all ([call(onFetchCategories)])
}