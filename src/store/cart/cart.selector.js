import { createSelector } from 'reselect';

//get the cart slice that is governed by this silice of Reducer
const selectCartReducer = (state) => state.cart;


export const selectIsCartOpen = createSelector(
  [selectCartReducer],
  (cart) => cart.isCartOpen
);
  
// get cart actual items
export const selectCartItems = createSelector(
  [selectCartReducer],
  (cart) => cart.cartItems
);

  
  export const selectCartTotal = createSelector([selectCartItems], (cartItems) =>

    cartItems.reduce((total, cartItem) => total + cartItem.quantity * cartItem.price, 0 )
   
)
  
 
   

export const selectCartCount = createSelector([selectCartItems], (cartItems) =>
  cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0)
);






// const newCartCount = cartItems.reduce(
//     (total, cartItem) => total + cartItem.quantity,
//     0
// );
// const newCartTotal = cartItems.reduce(
//     (total, cartItem) => total + cartItem.quantity * cartItem.price,
//     0
// );