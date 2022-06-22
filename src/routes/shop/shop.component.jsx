// import SHOP_DATA from '../../shop-data.json'
import { useContext, Fragment} from 'react'
import { CategoriesContext } from '../../contexts/categories.context'

import CategoryPreview from '../../components/category-preview/category-preview.component'

import './shop.styles.scss'

const Shop = () => {
    const {categoriesMap} = useContext(CategoriesContext)
    console.log('categoriesMap ----> ', categoriesMap)
    return (
        <div className="shop-container">
        {Object.keys(categoriesMap).map(title => {

            const products = categoriesMap[title];
            return <CategoryPreview key={title} title={title} products={products} />

                // <Fragment key={title}>
                //     <h2> {title} </h2>
                //     <div className='products-container'>
                //         {categoriesMap[title].map((product)=> (
                //             <ProductCard key={product.id} product={product} />
                //         ))}

                //     </div>
                // </Fragment>
                
        })}

        </div>
    )
}

export default Shop


