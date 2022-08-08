// import SHOP_DATA from '../../shop-data.json'
import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import CategoriesPreview from '../categories-preview/categories-preview.component'
import Category from '../category/category.component'
import { getCategoriesAndDocuments } from '../../Utils/firebase/firebase.utils'
import { setCategories } from '../../store/categories/categories.action'

import './shop.styles.scss'

const Shop = () => {
    const dispatch = useDispatch();

    useEffect(() => {
      const getCategoriesMap = async () => {
        const categories = await getCategoriesAndDocuments('categories');
        dispatch(setCategories(categories));
        
    };
    
      getCategoriesMap();
      }, []);

    return (
        
        <Routes>  
            <Route index element={ <CategoriesPreview/>} />
            <Route path=":category" element={ <Category /> } />
        </Routes>
        
    )   
}




export default Shop

/**
 * DIFFERENCE between Context and Redux is that
 * Redux will always wrap the entire application by design - global state management
 * Context is very similar but it also allows you to wrap parts of your application instead of entire application.
 * 
 */

/** Data Flow of Redux vs Context 
 * 
 * Reducer A Context A
 * Context A is going to have a dispatch that fires actions into reducer A
 * Pass that dispatch directly to component one and two or might create action generator functions inside of context and then pass that down.
 * So component 1/2 in trun potentially dispatch actions that update reducer A, 
 * Reducer A then will have some values which get consumed by component 1/2. 
 * The component drive actions into the reducers, then drive thier corresponding values to their components.
 *{
 * component 1 
 * component 2
 * }
 * 
 * 
 * 
 * Reducer B Context B
 * 
 * C3 dispatchs actions to Reducer B to be using reducer B, 
 * unique dispatch and then reducer B pass values to C3 which is what context be wraps around.
 * 
 *{
 * component 3 
 * }
 * 
*/



/** Redux Store 
 * see screenshot folder
*/



