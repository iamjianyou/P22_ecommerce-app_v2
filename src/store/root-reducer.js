import { combineReducers } from "redux";
import { userReducer } from './user/user.reducer'

export const rootReducer = combineReducers({
    // key: user
    // value: userReducer
    user: userReducer
    
});