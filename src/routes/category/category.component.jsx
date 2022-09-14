
import { useParams } from 'react-router-dom'
import { useState, Fragment, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { selectIsLoading, selectCategoriesMap } from '../../store/categories/categories.selector'

import './category.styles.jsx'
import ProductCard from '../../components/product-card/product-card.component'
import Spinner from '../../components/spinner/spinner.component';
import { CategoryContainer, Title } from './category.styles';

// const Category = () => {
//     const { category } = useParams();
//     const categoriesMap = useSelector(selectCategoriesMap);
//     //console.log('rendering category');
//     const [products, setProducts] = useState(categoriesMap[category]);
    
   //console.log('redner/re-rendering category component');


    // const { categoriesMap } = useContext(CategoriesContext)
    // const products = categoriesMap[category]
    // const [ products, setProducts ] = useState(categoriesMap[category])
    // useEffect(() => {
    //     // console.log('efffect fired calling set products')
    //     setProducts(categoriesMap[category]);
    //   }, [category, categoriesMap]);

    const Category = () => {
        const { category } = useParams();
        const categoriesMap = useSelector(selectCategoriesMap);
        const isLoading = useSelector(selectIsLoading)
        console.log('is loading -> ', isLoading)
        const [products, setProducts] = useState(categoriesMap[category]);
      
        useEffect(() => {
          setProducts(categoriesMap[category]);
        }, [category, categoriesMap]);

    return(
        <Fragment>
      <Title>{category.toUpperCase()}</Title>

      {isLoading ? (
        <Spinner />
      ) : (
        <CategoryContainer>
          {products &&
            products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
        </CategoryContainer>
      )}
    </Fragment>
  );
};

export default Category