import React, { useEffect, useState } from 'react'
import { Divider } from '@mui/material';
import Option from './Option';
import './buynow.css';
import Subtotal from './Subtotal';
import Right from './Right';
import { useDispatch, useSelector } from 'react-redux';
import { getBuyData } from '../../services/service';
import CircularProgress from '@mui/material/CircularProgress';
import Navbar from '../header/Navbar';
import Newnavbar from '../newnavbar/Newnavbar';
import Footer from '../footer/Footer';
const Buynow = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const cartData = useSelector(state => state.getproductsdata.cartData);
    console.log("Cart Datasss", cartData)
    const getData = () => {
        dispatch(getBuyData());
    }
    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            getData()
        }, 1000)
        setLoading(false)
    }, [])
    return (
        <>

            <Navbar />
            <Newnavbar />
            {
                cartData ?
                    <div className="buynow_section">
                        <div className="buynow_container">
                            <div className="left_buy">
                                <h1>Shopping Cart</h1>
                                <p>Select all items</p>
                                <span className="leftbuyprice">Price</span>
                                <Divider />
                                {
                                    cartData.map((e, k) => {
                                        return (
                                            <>
                                                <div div className="item_containert" >
                                                    <img src={e.image} alt="imgitem" />
                                                    <div className="item_details">
                                                        <h3>{e.title}</h3>
                                                        <h5 className='my-2'>asbgjbasjbghjabjgbajs</h5>
                                                        <h3 className="diffrentprice">445454515185</h3>
                                                        <p className="unusuall">Usually dispatched in 3 days.</p>
                                                        <p>Eligible for FREE Shipping</p>
                                                        <img src="https://m.media-amazon.com/images/G/31/marketing/fba/fba-badge_18px-2x._CB485942108_.png" alt="logo" />
                                                        <Option deleteData={e._id} />
                                                    </div>
                                                    <h3 className="item_price">₹{e.price}</h3>
                                                </div>
                                                <Divider />
                                            </>
                                        )
                                    })
                                }
                                <Subtotal item={cartData} />
                            </div>
                            <Right item={cartData} />
                        </div>
                    </div> : <div className='circle'>
                        <CircularProgress />
                        <h2>Loading...</h2>
                    </div>
            }
            <Footer />

            {
                !cartData ? <div className='circle'>
                    <CircularProgress />
                    <h2>Loading...</h2>
                </div> : ""
            }

        </>
    )
}

export default Buynow