// import SHOP_DATA from '../../shop-data.json'
import { useContext } from 'react'
import { ProductsContext } from '../../contexts/product.context'
import ProductCard from '../../components/product-card/product-card.component'
import './shop.styles.scss'

const Shop = () => {
    const {products} = useContext(ProductsContext)
    console.log('products -> ', products)
    return (
        <div className='products-container'>
            {products.map((product)=> (
                <ProductCard key={product.id} product={product} />
            ))}
            
            {/* {products.map(({id, name})=>(
                <div key={id}>
                    <h1> {name} </h1>
                </div>
            ) )} */}
        </div>
    )
}

export default Shop


