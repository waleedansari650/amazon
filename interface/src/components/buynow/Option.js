import React, { useContext } from 'react'
import { useDispatch } from 'react-redux'
import { deleteCartData, deleteCartItem, getBuyData } from '../../services/service';
import { LoginContext } from '../context/ContextProvider';
import { ToastContainer, toast } from 'react-toastify';

const Option = ({ deleteData }) => {
    const dispatch = useDispatch();
    const { account, setAccount } = useContext(LoginContext);
    const deleteItem = async () => {
        await dispatch(deleteCartItem(deleteData, setAccount));
        setTimeout(() => {
            dispatch(getBuyData())
        }, 1000)
    }
    return (
        <>
            <div className="add_remove_select">

                <p style={{ cursor: "pointer" }} onClick={deleteItem}>Delete </p><span>|</span>
                <p className='forremovemedia'>Save Or Later </p><span>|</span>
                <p className='forremovemedia'>See More Like This </p>
                <ToastContainer />
            </div>


        </>
    )
}

export default Option