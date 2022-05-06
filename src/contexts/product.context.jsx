import { createContext, useState} from 'react'

import PRODUCTS from '../shop-data.json' 

// intitia Context
export const ProductsContext = createContext({
    products: [], 
    // fucntions...

});

// Provider
// return product contex.provider
// pass the product value
export const ProductsProvider = ({children}) => {
    const [products, setProducts] = useState(PRODUCTS);
    console.log('value products -> ', products)
    const value = { products }

    return (
        <ProductsContext.Provider value={value}> {children} </ProductsContext.Provider>
    );
};