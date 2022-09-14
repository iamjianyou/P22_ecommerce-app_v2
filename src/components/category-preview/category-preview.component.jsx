import { Fragment } from 'react'
import { useSelector } from 'react-redux'
import ProductCard from '../product-card/product-card.component'
import './category-preview.styles.scss'
import { Link } from 'react-router-dom'
import Spinner from '../../components/spinner/spinner.component'
import { selectIsLoading } from '../../store/categories/categories.selector'


const CategoryPreview = ({title, products}) => {
    // will live in shop component
    const isLoading = useSelector(selectIsLoading)
    return (


        <Fragment> 
       
        {
            isLoading ? <Spinner /> : (
                <div className="category-preview-container">
                <h2>
                    <Link className="title" to={title}> {title.toUpperCase()}</Link>
    
                </h2>
                <div className="preview">
                    {
                        products.filter((_, idx)=> idx < 4) // keep it if idx is less than 4
                        .map(product => 
                            <ProductCard key={product.id} product={product}/>
                            )
                    }
                </div>
            </div>
            )
        }

</Fragment>
       
    )

}

export default CategoryPreview