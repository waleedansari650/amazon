import logo from './logo.svg';
import './App.css';

import Navbar from './components/header/Navbar';
import Newnavbar from './components/newnavbar/Newnavbar';
import Maincomp from './components/home/Maincomp';
import Footer from './components/footer/Footer';
import { Routes, Route } from "react-router-dom";
import SignUp from './components/signup_sign/SignUp';
import SignIn from './components/signup_sign/SignIn';
import Cart from './components/cart/Cart';
import Buynow from './components/buynow/Buynow';
import CircularProgress from '@mui/material/CircularProgress';
import { useState, useEffect } from 'react';
import ProceedToBuy from './components/proceedToBuy';
import ReviewOrder from './components/review-order';
import MyProfile from './components/myProfile';
import AdminPanel from './dashboard';
import Users from './dashboard/users';
import Products from './dashboard/products/index.js';
import OrderDelievered from './dashboard/orderDelivered';
import PlaceOrders from './dashboard/placeOrders';
import EditProductModal from './dashboard/products/editProductModal';
import ViewAllProducts from './components/viewAllproducts';
function App() {
  const [data, setData] = useState(false);

  useEffect(() => {
    setData(false)
    setTimeout(() => {
      setData(true);
    }, 2000)
  }, [])
  return (
    <>
      {
        data ? (
          <>
            <Routes>
              <Route exact path='/' element={<Maincomp />} />
              <Route exact path='/viewAllProducts' element={<ViewAllProducts />} />
              <Route path='/register' element={<SignUp />} />
              <Route path='/login' element={<SignIn />} />
              <Route path='/getproductsone/:id' element={<Cart />} />
              <Route path='/buynow' element={<Buynow />} />
              <Route path='/proceedToBuy' element={<ProceedToBuy />} />
              <Route path='/reviewOrder' element={<ReviewOrder />} />
              <Route path='/myProfile' element={<MyProfile />} />
              <Route path='/adminPanel' element={<Users />} />
              <Route path='/adminProducts' element={<Products />} />
              <Route path='/adminPlaceOrders' element={<PlaceOrders />} />
              <Route path='/adminOrderDeliever' element={<OrderDelievered />} />
            </Routes>
          </>) :
          (
            <>
              <div className='circle'>
                <CircularProgress />
                <h2>Loading...</h2>
              </div>
            </>
          )
      }


    </>
  );
}

export default App;
