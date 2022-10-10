import {AnyAction} from 'redux';
import { CART_ACTION_TYPES, CartItem } from './cart.types'
import { setIsCartOpen, setCartItems } from './cart.action';



export type CartState = {
    isCartOpen: boolean;
    cartItems: CartItem[];
  };

export const CART_INITIAL_STATE = {
    isCartOpen: false,
    cartItems: [],
    // cartCount: 0,
    // cartTotal: 0,
};

export const cartReducer = (state = CART_INITIAL_STATE, action: AnyAction): CartState => {
    
    if (setIsCartOpen.match(action)) {
        return {
          ...state,
          isCartOpen: action.payload,
        };
      }
    
      if (setCartItems.match(action)) {
        return {
          ...state,
          cartItems: action.payload,
        };
      }
    
      return state;
    
    };
    // const { type, payload } = action;

    // switch (type){
    //     case CART_ACTION_TYPES.SET_CART_ITEMS:
    //         return {
    //             ...state,
    //             // ...payload,
    //             cartItems: payload,
    //         };
    //     case CART_ACTION_TYPES.SET_IS_CART_OPEN:
    //         return {
    //             ...state,
    //             // cartItems: payload,
    //             isCartOpen: payload,
    //         };
    //     default:
    //         return state;
    // }

