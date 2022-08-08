
import { useParams } from 'react-router-dom'
import { useState, Fragment, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { selectCategoriesMap } from '../../store/categories/categories.selector'

import './category.styles.scss'
import ProductCard from '../../components/product-card/product-card.component'

const Category = () => {
    const { category } = useParams();
    const categoriesMap = useSelector(selectCategoriesMap);
    console.log('rendering category');
    const [products, setProducts] = useState(categoriesMap[category]);
    
    console.log('redner/re-rendering category component');


    // const { categoriesMap } = useContext(CategoriesContext)
    // const products = categoriesMap[category]
    // const [ products, setProducts ] = useState(categoriesMap[category])
    useEffect(() => {
        console.log('efffect fired calling set products')
        setProducts(categoriesMap[category]);
      }, [category, categoriesMap]);

    return(
        <Fragment> 
            <h2 className="category-title"> {category.toUpperCase()} </h2>
            <div className="category-container">
                  { products &&
                    products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
        </Fragment>
            
        
        
    )
}

export default Category