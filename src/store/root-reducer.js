import { combineReducers } from "redux";
import { userReducer } from './user/user.reducer'
import { categoriesReducer } from './categories/categories.reducer'
import { cartReducer } from './cart/cart.reducer'

export const rootReducer = combineReducers({
    // key: user
    // value: userReducer
    user: userReducer,
    categories: categoriesReducer,
    cart: cartReducer,
});