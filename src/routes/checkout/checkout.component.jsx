import {useContext} from 'react'   
import { CartContext } from '../../contexts/cart.context'
import './checkout.styles.scss'

const Checkout = () => {

    const {cartItems, addItemToCart, removeItemToCart} = useContext(CartContext)
    return (
        <div>
            <h1> Check Out page</h1>
            <div>
                {
                 cartItems.map((cartItem) =>  {
                    const {id, name, quantity} = cartItem;
                    return(
                    <div key={id}>
                        <h2>{name}</h2>
                        <sapn>{quantity}</sapn>
                        <br />
                        <span onClick={() => removeItemToCart(cartItem)}>decrement</span>
                        <br /><br />
                        <span onClick={() => addItemToCart(cartItem)}>increment</span>
                    </div>
                    );
                 })}
            </div>
        </div>
    )
}

export default Checkout