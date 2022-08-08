/** With a selector, you can transform 
 * that data into the final shape that you want it to be 
 * 
 * Such that you can have multiple different selectors that perfom different transformations 
 * on the base format of the data you have
 * 
 * */
export const selectCategoriesMap = (state) => state.categories.categoriesMap;