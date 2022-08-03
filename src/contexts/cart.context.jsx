import { createContext, useReducer } from "react";
import createAction from '../Utils/reducer/reducer.utils'

/***
 * Add new products and keep tracking of the quantity
 */
const addCartItem = (cartItems, productToAdd) => {
    // find if cartItems contains productToAdd
    const existingCartItems = cartItems.find((cartItem) => cartItem.id === productToAdd.id);
    
    // if found , increment quantity

    if (existingCartItems){
        return cartItems.map((cartItem) => cartItem.id === productToAdd.id // if match return a new cartItem object
        ? {...cartItem, quantity: cartItem.quantity + 1 } // return a brand new object by spreading through all of the old properties, except quantity will add a new one.
        : cartItem 
    ); // if not match, so return the origianl one   
}

    //return new array with modified cartitems/ new cart item

    // [{...productToAdd, quantity: 1}]
    /* return -> 
    * ...productToAdd: create a new array and spread through all of the existing cart items
    * {...productToAdd} : add as an additional (new)product
    * quantity: 1  ---> add this quantity of one
    */
    return [...cartItems, { ...productToAdd, quantity: 1 }];
}

/** ******************************************************************************************************************************** */


const removeCartItem = (cartItems, cartItemToRemove) => {

    // find the cart item to remove
    const existingCartItem = (cartItems.find(
        (cartItem) => cartItem.id === cartItemToRemove.id)
        );

    // check if quantity is equal to 1, if it is , remove it from the cart
    // by using Filter that gives it back a new array where the array is going to have removed whatever matches
    // keep the value: if carItemId not equals to cartItemToRemove.id
    // remove the value: carItemId eauals to cartItemToRemove
    if (existingCartItem.quantity === 1) {
        return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id); 
    }

    return cartItems.map((cartItem) =>
        cartItem.id === cartItemToRemove.id
        ? {...cartItem, quantity: cartItem.quantity - 1}
        : cartItem
    );
    // return cartItems.map((cartItem) => cartItem.id === productToAdd.id // if match return a new cartItem object
    //     ? {...cartItem, quantity: cartItem.quantity + 1 } // return a brand new object by spreading through all of the old properties, except quantity will add a new one.
    //     : cartItem ) // if not match, so return the origianl one

}
// Clear cart item 
const clearCartItem = (cartItems, cartItemToClear) => cartItems.filter(cartItem => cartItem.id !== cartItemToClear.id); 

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [], 
    addItemToCart: () => {},
    clearItemFromCart: () => {},
    cartCount: 0,
    cartTotal: 0
})

const CART_ACTION_TYPES = {
    SET_CART_ITEMS: 'SET_CART_ITEMS',
    SET_IS_CART_OPEN: 'SET_IS_CART_OPEN'
}

/**  Integrate Reducer to React Context 
 * 1:  Create initial state
 * 2:  Create cartReducer
 * 3:  Create Actions
*/

/** 1 Create initial state*/
const INITIAL_STATE = {
    isCartOpen: false,
    cartItems: [], 
    cartCount: 0,
    cartTotal: 0
}
/** 2 Create cart Reducer */
const cartReducer = (state, action) => {
    // Destruct the two properties that comes to the action
    const {type, payload} = action;

    // 

    // setup the reducer
    switch(type) {
        case CART_ACTION_TYPES.SET_CART_ITEMS:
            return {
                ...state,
                ...payload

            }
        case CART_ACTION_TYPES.SET_IS_CART_OPEN:
            return {
                ...state,
                isCartOpen: payload,
            }    
        default:
            throw new Error(`unhandled type of ${type} in cartReducer`);
    }

}

/** 3 Create Actions */
// const AddToCartAction = (itemToAdd) => {
//     dispatch({type: 'ADD_TO_CART', payload: itemToAdd})
    
    
// }





/** 
 * product
 * { id, name, price, imageUrl  * }
 * 
 * cart Item
 * { id, name, price, imageUrl, quantity  * }
 */

export const CartProvider =({children}) => {
    // const [isCartOpen, setIsCartOpen] = useState(false)
    // const [cartItems, setCartItems] = useState([])
    // const [cartCount, setCartCount] = useState(0)
    // const [cartTotal, setCartTotal] = useState(0)
    
    const [{cartItems, isCartOpen, cartCount, cartTotal}, dispatch] = useReducer(cartReducer, INITIAL_STATE)

    // useEffect(() => {
    //     // pass a calback fn, and this runs everytime when the deps array changes
    //     const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0)
    //     setCartCount(newCartCount)
    // }, [cartItems])

    // useEffect(() => {
    //     const newCartTotal = cartItems.reduce((total, cartItem) => total + cartItem.quantity * cartItem.price, 0)
    //     setCartTotal(newCartTotal)
    // }, [cartItems])

    // update new values after carItems have been updated
    // by receiving new cartItems
    const updateCartItemsReducer = (newCartItems) => {
        const newCartCount = newCartItems.reduce((total, cartItem) => total + cartItem.quantity, 0)        
        const newCartTotal = newCartItems.reduce((total, cartItem) => total + cartItem.quantity * cartItem.price, 0)
        // setCartTotal(newCartTotal) // setCartCount(newCartCount)
        dispatch(
            createAction(
                CART_ACTION_TYPES.SET_CART_ITEMS, 
                {cartItems: newCartItems, cartTotal: newCartTotal, cartCount: newCartCount })
            )

                // type: CART_ACTION_TYPES.SET_CART_ITEMS,
                // payload: 
                //     {
                //         cartItems: newCartItems, 
                //         cartTotal: newCartTotal, 
                //         cartCount: newCartCount 
                //     } 
                // )
       
        
        
        /**
         * generate newCartTotal
         * 
         * generate newCount
         * 
         * dispatch new action with payload  = {
         * newCartItems,
         * newCartTotal, 
         * newCartCount
         * }
         * 
         * 
         */

    }
    
    const addItemToCart = (productToAdd) => {
        // setCartItems(addCartItem(cartItems, productToAdd));
        const newCartItems = addCartItem(cartItems, productToAdd);
        updateCartItemsReducer(newCartItems);
    }
    const removeItemToCart = (cartItemToRemove) => {
        // setCartItems(removeCartItem(cartItems, cartItemToRemove));
        const newCartItems = removeCartItem(cartItems, cartItemToRemove)
        updateCartItemsReducer(newCartItems);
    }

    const clearItemFromCart = (cartItemToClear) => {
        // setCartItems(clearCartItem(cartItems, cartItemToClear));
        const newCartItems = clearCartItem(cartItems, cartItemToClear)
        updateCartItemsReducer(newCartItems);
    }

    const setIsCartOpen = (bool) => {
        // dispatch({ type: CART_ACTION_TYPES.SET_IS_CART_OPEN, payload: bool });
        dispatch(
            createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool)
        )
    }

    const value = {isCartOpen, setIsCartOpen, setCartIsOpen: () => {}, addItemToCart, removeItemToCart, clearItemFromCart, cartItems, cartCount, cartTotal};
    return (
        <CartContext.Provider value={value}> {children} </CartContext.Provider>
    )
}

/**
 * DIFFERENCE between Context and Redux is that
 * Redux will always wrap the entire application by design - global state management
 * Context is very similar but it also allows you to wrap parts of your application instead of entire application.
 * 
 */

/** Data Flow of Redux vs Context 
 * 
 * Reducer A Context A
 * Context A is going to have a dispatch that fires actions into reducer A
 * Pass that dispatch directly to component one and two or might create action generator functions inside of context and then pass that down.
 * So component 1/2 in trun potentially dispatch actions that update reducer A, 
 * Reducer A then will have some values which get consumed by component 1/2. 
 * The component drive actions into the reducers, then drive thier corresponding values to their components.
 *{
 * component 1 
 * component 2
 * }
 * 
 * 
 * 
 * Reducer B Context B
 * 
 * C3 dispatchs actions to Reducer B to be using reducer B, 
 * unique dispatch and then reducer B pass values to C3 which is what context be wraps around.
 * 
 *{
 * component 3 
 * }
 * 
*/