import React from 'react'
import './cart.css';
import { Divider } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem, buyNowProduct, getBuyData, getSpecificProduct } from '../../services/service';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { useContext } from 'react';
import { LoginContext } from '../context/ContextProvider';
import CircularProgress from '@mui/material/CircularProgress';
import Navbar from '../header/Navbar';
import Newnavbar from '../newnavbar/Newnavbar';
import Footer from '../footer/Footer';
const Cart = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const specificProduct = useSelector(state => state.getproductsdata.product)

    const { id } = useParams("");
    const { account, setAccount } = useContext(LoginContext)
    const addToCart = async (id) => {
        await dispatch(addItem(id, specificProduct, setAccount))
        if (account) {
            navigate('/buynow');
        } else {
            navigate('/login');
        }
    }
    const buyNowDirect = async (id) => {
        await dispatch(buyNowProduct(id, specificProduct, setAccount))
        if (account) {
            navigate('/proceedToBuy');
        } else {
            navigate('/login');
        }
    }
    const getData = () => {
        dispatch(getSpecificProduct(id))
    }
    useEffect(() => {
        setTimeout(getData, 1000)


    }, [id])

    return (
        <>
            <Navbar />
            <Newnavbar />
            <div className="cart_section">
                {specificProduct && Object.keys(specificProduct).length &&
                    <div className="cart_container">
                        <div className="left_cart">
                            <img src={specificProduct.image} alt="cart" />
                            <div className="cart_btn">
                                <button className="cart_btn1" onClick={() => { addToCart(specificProduct._id) }} >Add to Cart</button>
                                <button className="cart_btn2" onClick={() => { buyNowDirect(specificProduct._id) }} >Buy Now</button>
                            </div>

                        </div>
                        <div className="right_cart">
                            <h3>{specificProduct.title}</h3>
                            <h4>{specificProduct.description}</h4>
                            <Divider />



                            <div className="discount_box pt-3">
                                <h4>Price : <span style={{ color: "#B12704" }}>₹ {specificProduct.price}.00</span></h4>
                                <h5 >Discount : <span style={{ color: "#111" }}>0%</span> </h5>
                                <h4>FREE Delivery : <span style={{ color: "#111", fontWeight: "600" }}>With in 3 days</span> </h4>

                            </div>
                            <p className="description">About the Iteam : <span style={{ color: "#565959", fontSize: "14px", fontWeight: "500", letterSpacing: "0.4px" }}>{specificProduct.longDescription}</span></p>
                        </div>
                    </div>
                }
                {
                    !specificProduct ? <div className='circle'>
                        <CircularProgress />
                        <h2>Loading...</h2>
                    </div> : ""
                }
            </div>
            <Footer />

        </>
    )
}

export default Cart