import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { setTotalAmount } from '../../redux/actions/action';

const Subtotal = ({ item, }) => {
    const [price, setPrice] = useState(0);
    const dispatch = useDispatch();
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
        dispatch(setTotalAmount(price));

    }

    return (
        <>
            {
                item ? (<div className="sub_item">
                    <h3>Subtotal ({item.length} item) : <strong style={{ fontWeight: 700, color: "#111" }} >${price}</strong></h3>
                </div>) : (<div className="sub_item">
                    <h3>Subtotal (item Length) : <strong style={{ fontWeight: 700, color: "#111" }} >$ 2</strong></h3>
                </div>)
            }


        </>
    )
}

export default Subtotal