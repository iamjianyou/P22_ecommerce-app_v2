// import SHOP_DATA from '../../shop-data.json'
import { useContext } from 'react'
import { ProductsContext } from '../../contexts/product.context'

const Shop = () => {
    const {products} = useContext(ProductsContext)
    console.log('products -> ', products)
    return (
        <div>
            {products.map(({id, name})=>(
                <div key={id}>
                    <h1> {name} </h1>
                </div>
            ) )}
        </div>
    )
}

export default Shop


