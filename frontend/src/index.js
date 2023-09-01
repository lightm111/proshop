import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './store';
import { PayPalScriptProvider } from "@paypal/react-paypal-js"
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"
import "./assets/styles/index.css";
import App from './App';
import reportWebVitals from './reportWebVitals';
import PrivateRoutes from './components/PrivateRoutes';
import AdminRoutes from './components/AdminRoutes';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';
import ProfileScreen from './screens/ProfileScreen';
import RegisterScreen from './screens/RegisterScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import ProductsListScreen from './screens/admin/ProductsListScreen';
import UsersListScreen from './screens/admin/UsersListScreen';
import OrdersListScreen from './screens/admin/OrdersListScreen';
import AddProductScreen from './screens/admin/AddProductScreen'
import EditProductScreen from './screens/admin/EditProductScreen';
import EditUserScreen from './screens/admin/EditUserScreen';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index={true} path='/' element={<HomeScreen />} />
      <Route path='/product/:id' element={<ProductScreen />} />
      <Route path='/cart' element={<CartScreen />} />
      <Route path='/login' element={<LoginScreen />} />
      <Route path='/register' element={<RegisterScreen />} />

      <Route path='' element={<PrivateRoutes />}>
        <Route path='/shipping' element={<ShippingScreen />} />
        <Route path='/payment' element={<PaymentScreen />} />
        <Route path='/place-order' element={<PlaceOrderScreen />} />
        <Route path='/order/:id' element={<OrderScreen />} />
        <Route path='/profile' element={<ProfileScreen />} />
      </Route>

      <Route path='/' element={<AdminRoutes />}>
        <Route path='/admin/orders' element={<OrdersListScreen />} />
        <Route path='/admin/users' element={<UsersListScreen />} />
        <Route path='/admin/products' element={<ProductsListScreen />} />
        <Route path='/admin/products/add' element={<AddProductScreen />} />
        <Route path='/admin/products/edit/:id' element={<EditProductScreen />} />
        <Route path='/admin/users/edit/:id' element={<EditUserScreen />} />
      </Route>
    </Route>
  )
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PayPalScriptProvider deferLoading={true}>
        <RouterProvider router={router} />
      </PayPalScriptProvider>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
