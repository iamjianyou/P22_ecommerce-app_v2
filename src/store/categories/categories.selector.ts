import { createSelector } from 'reselect';
import { CategoriesState } from './categories.reducer';
import { CategoryMap } from './categories.type'


const selectCategoryReducer = (state: any): CategoriesState => {
  console.log('selector 000 fireed')
  return state.categories;
}


export const selectCategories = createSelector(
  [selectCategoryReducer],
  (categoriesSlice) => 
    // console.log('selector 1: fired')
    categoriesSlice.categories

);



/** With a selector, you can transform 
 * that data into the final shape that you want it to be 
 * 
 * Such that you can have multiple different selectors that perfom different transformations 
 * on the base format of the data you have
 * 
 * */
export const selectCategoriesMap = createSelector(
  [selectCategories],
  (categories): CategoryMap =>
    categories.reduce((acc, category) => {
      const { title, items } = category;
      acc[title.toLowerCase()] = items;
      return acc;
    }, {} as CategoryMap)
);

export const selectIsLoading = createSelector(
  [selectCategoryReducer],
  (categoriesSlice) => categoriesSlice.isLoading
);

console.log('selectIsLoading--> ', selectIsLoading)