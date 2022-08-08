import { CATEGORIES_ACTION_TYPES } from './categories.type'
import { createAction } from '../../Utils/reducer/reducer.utils'

export const setCategories = (categories) =>
  createAction(CATEGORIES_ACTION_TYPES.SET_CATEGORIES, categories);