import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Right = ({ item }) => {
    const [price, setPrice] = useState(0);
    const proceedInfo = useSelector(state => state.getproductsdata.proceedData)
    console.log("Item :  ", item);
    useEffect(() => {
        totalAmount();
    }, [item])

    const totalAmount = () => {
        let price = 0;
        item.map((e) => {
            price += e.price;
        })
        setPrice(price);
    }
    return (
        <>
            <div className="right_buy">
                <img src="https://images-eu.ssl-images-amazon.com/images/G/31/checkout/assets/TM_desktop._CB443006202_.png" alt="rightimg" />
                <div className="cost_right">
                    <p>Your order is eligible for FREE Delivery. <br />
                        <span style={{ color: "#565959" }}> Select this option at checkout. Details</span></p>
                    <h3>Subtotal  ({item.length}items) :<span style={{ fontWeight: "700" }}> ₹{price}</span></h3>
                    <Link to="/proceedToBuy"><button className="rightbuy_btn"  >Proceed to Buy</button></Link>
                    <div className="emi" >
                        Emi available
                        {/* {!val ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />} */}
                    </div>
                    <span className=""> Your order qualifies for EMI with valid credit cards (not available on purchase of Gold,
                        Jewelry, Gift cards and Amazon pay balance top up). Learn more</span>
                </div>
            </div>
        </>
    )
}

export default Right