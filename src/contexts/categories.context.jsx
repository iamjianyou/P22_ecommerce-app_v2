import { createContext, useState, useEffect} from 'react'

import { addCollectionAndDocuments, getCategoriesAndDocuments} from '../Utils/firebase/firebase.utils';

// import SHOP_DATA from '../shop-data.js' 

// intitia Context
export const CategoriesContext = createContext({
    categoriesMap: {}, 
    // fucntions...

});

// Provider
// return product contex.provider
// pass the product value
export const CategoriesProvider = ({children}) => {
    const [categoriesMap, setCategoriesMap] = useState({});

    // useEffect(()=>{
    //     addCollectionAndDocuments('categories', SHOP_DATA)
    // }, [])

    useEffect(()=>{
       const getCategoriesMap = async () => {
            const categoriesMap = await getCategoriesAndDocuments();
            console.log(categoriesMap)
            setCategoriesMap(categoriesMap);
       }
       getCategoriesMap();
    }, [])

    console.log('value products -> ', categoriesMap)
    const value = { categoriesMap }

    return (
        <CategoriesContext.Provider value={value}> {children} </CategoriesContext.Provider>
    );
};