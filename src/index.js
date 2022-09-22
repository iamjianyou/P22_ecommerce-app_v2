 import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
import './index.scss';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
// import { CategoriesProvider } from './contexts/categories.context';
// import { CartProvider } from './contexts/cart.context'
import { store, persistor } from './store/store'
import { Elements } from '@stripe/react-stripe-js'
import { stripePromise } from './Utils/stripe/stripe.utils'


const rootElement = document.getElementById('root');

render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        {/* <UserProvider> */}
          {/* <CategoriesProvider> */}
            {/* <CartProvider> */}
            <Elements stripe={stripePromise}>
              <App />
             </Elements>
            {/* </CartProvider> */}
          {/* </CategoriesProvider> */}
        {/* </UserProvider> */}
      </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  rootElement
);
