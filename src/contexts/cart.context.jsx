import { createContext, useState, useEffect} from "react";

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

/** 
 * product
 * { id, name, price, imageUrl  * }
 * 
 * cart Item
 * { id, name, price, imageUrl, quantity  * }
 */

export const CartProvider =({children}) => {
    const [isCartOpen, setIsCartOpen] = useState(false)
    const [cartItems, setCartItems] = useState([])
    const [cartCount, setCartCount] = useState(0)
    const [cartTotal, setCartTotal] = useState(0)
    

    useEffect(() => {
        // pass a calback fn, and this runs everytime when the deps array changes
        const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0)
        setCartCount(newCartCount)
    }, [cartItems])

    useEffect(() => {
        const newCartTotal = cartItems.reduce((total, cartItem) => total + cartItem.quantity * cartItem.price, 0)
        setCartTotal(newCartTotal)
    }, [cartItems])
    
    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd));
    }
    const removeItemToCart = (cartItemToRemove) => {
        setCartItems(removeCartItem(cartItems, cartItemToRemove));
    }

    const clearItemFromCart = (cartItemToClear) => {
        setCartItems(clearCartItem(cartItems, cartItemToClear));
    }

    const value = {isCartOpen, setIsCartOpen, addItemToCart, removeItemToCart, clearItemFromCart, cartItems, cartCount, cartTotal};
    return (
        <CartContext.Provider value={value}> {children} </CartContext.Provider>
    )
}