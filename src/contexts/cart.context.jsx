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
        : cartItem ) // if not match, so return the origianl one

        
    }

    //return new array with modified cartitems/ new cart item

    // [{...productToAdd, quantity: 1}]
    /* return -> 
    * ...productToAdd: create a new array and spread through all of the existing cart items
    * {...productToAdd} : add as an additional (new)product
    * quantity: 1  ---> add this quantity of one
    */
    return[...cartItems, {...productToAdd, quantity: 1 }];
}

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [], 
    addItemToCart: () => {},
    cartCount: 0,
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

    useEffect(() => {
        // pass a calback fn, and this runs everytime when the deps array changes
        const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0)
        setCartCount(newCartCount)
    }, [cartItems])
    
    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd));
    }

    const value = {isCartOpen, setIsCartOpen, addItemToCart, cartItems, cartCount};
    return (
        <CartContext.Provider value={value}> {children} </CartContext.Provider>
    )
}