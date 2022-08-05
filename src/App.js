import { useEffect} from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { onAuthStateChangedListener, createUserDocumentFromAuth} from './Utils/firebase/firebase.utils';
import Navigation from './routes/navigation/navigation.component';
import Home from './routes/home/home.component';
import Authentication from './routes/authentication/authentication.component';
import Shop from './routes/shop/shop.component';
import Checkout from './routes/checkout/checkout.component'
import { setCurrentUser } from './store/user/user.action'


const App = () => {
  const dispatch = useDispatch(); // works similar to user context dispatch
  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        createUserDocumentFromAuth(user);
      }
      dispatch(setCurrentUser(user)); // (only one)dispatch actions to the root reducer, which inturn  pass the action to every single reducer function
    });

    return unsubscribe; // unsubscribe when unmounted
  }, [dispatch]); // dep not change actually because it comes from the hooks

   

  return (
    <Routes>
      <Route path="/" element={<Navigation />}> 

      {/* <Route path='home' index={true}  element={<Home />} />  */}
      <Route index element={<Home />} />
      <Route path='shop/*' element={<Shop />} />
      <Route path='auth' element={<Authentication />} />
      <Route path='checkout' element={<Checkout />} />

    </Route>
      
    </Routes>
  );
};

export default App;
