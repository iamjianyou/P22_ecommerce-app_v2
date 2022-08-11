
import { createSelector } from 'reselect';

const selectCategoryReducer = (state) => {
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
  (categories) =>

    categories.reduce((acc, category) => {
      const { title, items } = category;
      acc[title.toLowerCase()] = items;
      return acc;
    }, {})
);