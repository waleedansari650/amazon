import React, { useState, useContext, useEffect } from 'react'
import { CircularProgress, Divider } from '@mui/material'
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import './revieworder.css'
import Subtotal from '../buynow/Subtotal';
import { getBuyData, getBuyDetail, isUserValid, placeHolder, proceedData } from '../../services/service';

import { useDispatch, useSelector } from 'react-redux';
import { LoginContext } from '../context/ContextProvider';
import { useNavigate } from 'react-router-dom';
import Footer from '../footer/Footer';
import Navbar from '../header/Navbar';
import Newnavbar from '../newnavbar/Newnavbar';

const StyledPaper = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    maxWidth: 800,
    color: theme.palette.text.primary,
}));
const ReviewOrder = () => {
    const dispatch = useDispatch();
    const { account, setAccount } = useContext(LoginContext);
    const cartData = useSelector(state => state.getproductsdata.cartData);
    const userInfo = useSelector(state => state.getproductsdata.proceedData);
    const [loading, setLoading] = useState(false);
    const [price, setPrice] = useState(0);
    let totalAmount = useSelector(state => state.getproductsdata.totalAmount);
    const navigate = useNavigate();
    const getData = async () => {
        setLoading(true)
        setTimeout(async () => {
            await dispatch(getBuyData());
            await dispatch(getBuyDetail())
            setLoading(false);
        }, 2000)
        // dispatch(getBuyDetail());
    }
    const placeYourOrder = async () => {
        const address = userInfo.houseNo + " " + userInfo.landmark + " " + userInfo.area;
        const data = {
            name: account.fname,
            email: account.email,
            address: address,
            orders: cartData,
            contactNumber: account.mobile,
            totalAmount,
        }
        console.log("Place Order Data :  ", data);
        await dispatch(placeHolder(data, setAccount));
        setLoading(true)
        setTimeout(async () => {
            navigate('/');
            setLoading(false);
        }, 2000)

    }
    useEffect(() => {
        getData()
    }, [])

    return (
        <>

            <Navbar />
            <Newnavbar />
            {cartData && userInfo ? (
                <>

                    <div className="review_section">

                        <h5 className='review_orders'>Review Your Order</h5>
                        <div className="review_container">

                            <Divider style={{ marginBottom: "1rem" }} />
                            <div className="left_container">
                                <h5 className='methods'>Shopping Address</h5>
                                <div className="shopping_address">
                                    <p className="user_detail"><span className="review_order_title">Name : </span>  <span className='review_order_info'>{account.fname}</span></p>
                                    <p className="user_detail"> <span className="review_order_title">Email : </span> <span className='review_order_info'>{account.email}</span></p>
                                    <p className="user_detail">  <span className="review_order_title">Address : </span><span className='review_order_info'>{userInfo.houseNo},{userInfo.landmark},{userInfo.area}</span></p>
                                    <p className="user_detail"><span className="review_order_title">City/Province : </span> <span className='review_order_info'>{userInfo.city}, {userInfo.province}</span></p>
                                    <p className="user_detail"><span className="review_order_title">Contact No </span> <span className='review_order_info'>{account.mobile}</span></p>
                                </div>
                                <div className="payment_method">
                                    <h5 className='methods'>Payment Methods</h5>

                                    <div className="card_number" style={{ marginLeft: "1rem" }}>
                                        Cash On Delievery
                                    </div>
                                </div>
                            </div>
                            <div className="right_container">
                                <div className='methods' style={{ position: "absolute", color: "rgb(11, 32, 86)", width: "60vw", background: 'linear-gradient(to right, rgba(255,0,0,0), rgba(255,0,0,1)) ' }}>
                                    <h5 className='orders_heading' >Your Orders</h5>
                                </div>

                                <div className="your_order">
                                    <div sx={{ flexGrow: 1, overflow: 'hidden', px: 1 }}>
                                        <StyledPaper
                                            sx={{
                                                my: 1,
                                                mx: 5,
                                                p: 2,
                                            }}
                                        >

                                            {cartData.map((item, k) => {
                                                return (
                                                    <>

                                                        <Grid className='grid_container' container wrap="nowrap" spacing={2}>
                                                            <Grid item>
                                                                <img className='grid_image ' src={item.image} alt="" />
                                                            </Grid>
                                                            <Grid item xs zeroMinWidth>
                                                                <h4 className='grid_title' style={{ fontWeight: "bold" }}>{item.title}</h4>
                                                                <h4 className='grid_description my-2'>{item.description}</h4>
                                                                <span style={{ fontWeight: "700" }}> ₹{item.price}</span>
                                                                <Divider style={{ marginBottom: "1rem", fontSize: "1rem" }} />
                                                            </Grid>

                                                        </Grid>

                                                    </>
                                                )
                                            })
                                            }
                                        </StyledPaper>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div style={{ display: "flex", flexDirection: "row", justifyContent: "flex-end" }}>
                            <Subtotal item={cartData} />
                            <button onClick={placeYourOrder} style={{ margin: "0px 2rem", padding: "1rem 3rem" }} type="button" class="btn btn-outline-warning">Place Your Order</button>
                        </div>
                    </div>
                </>
            ) : (<div className='circle'>
                <CircularProgress />
                <h2>Loading...</h2>
            </div>)
            }
            <Footer />
        </>
    )
}

export default ReviewOrder