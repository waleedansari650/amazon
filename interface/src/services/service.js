import { addCartData, failGetProduct, fetchSpecificProduct, getProductData, loginUserInfo, proceedInformation, totalResults } from '../redux/actions/action';
import axios from "axios";

import { ToastContainer, toast } from 'react-toastify';
import Loader from '../components/loader/Loader';
export const getProducts = () => {
    const config = {
        headers: {
            "Content-Type": "application/json",
        }
    }
    return async (dispatch) => {
        try {
            const { data } = await axios.get('/product/getproducts', config);
            dispatch(getProductData(data))
            dispatch(totalResults(data))

        } catch (error) {
            console.log(error)
        }
    }
}
export const getSpecificProduct = (id) => {

    const config = {
        headers: {
            "Content-Type": "Application/json"
        }
    }

    return async (dispatch) => {
        try {
            const response = await axios.get(`/product/getproductsone/${id}`, config);
            const { data } = response;

            // console.log("Specific Product : ", response.status);
            dispatch(fetchSpecificProduct(data))


        } catch (error) {
            console.log(error)
            dispatch(fetchSpecificProduct(error.response.data.message))

        }
    }
}
export const registerUser = (udata, setAccount, setIsSuccess) => {
    return async (dispatch) => {
        const config = {
            headers: {
                "Content-Type": "Application/json"
            }
        }
        try {
            const response = await axios.post('/register', udata, config)
            const { data } = response;
            console.log("response : ", response);
            if (response.status == 400) {
                toast.error('User Not Register!', {
                    position: "top-center",

                });
            }
            else if (response.status == 422) {
                toast.error('please try to login with the correct credientials!', {
                    position: "top-center",

                });
            } else {
                setIsSuccess(true);
                toast.success('User Register Successfully!', {
                    position: "top-center",
                });
                setAccount(data);
                // dispatch(IsUserRegister(true))
            }

        } catch (error) {
            setIsSuccess(false);
            console.log("Error", error);
            toast.error('Please try to register with the correct credientials!', {
                position: "top-center",

            });
        }
    }
}
export const loginUser = (logdata, setAccount, setIsSuccess) => {
    return async (dispatch) => {
        const config = {
            headers: {
                "Content-Type": "Application/json"
            }
        }
        try {
            const response = await axios.post('/login', logdata, config)
            const { data } = response;
            console.log("login data : ", data);
            if (response.status == 400 || !data) {
                toast.error('Failed to Login!', {
                    position: "top-center",
                    theme: "colored",
                    closeOnClick: true,


                });

            } else {
                setIsSuccess(true);
                dispatch(loginUserInfo(data));
                setAccount(data);
                toast.success('User Login Successfully!', {
                    position: "top-center",
                });
            }

        } catch (error) {
            setIsSuccess(false);
            console.log("Error", error);
            toast.error('please try to login with the correct credientials!', {
                position: "top-center",

            });
        }
    }
}
export const editUser = (udata, setAccount, setIsSuccess) => {
    return async (dispatch) => {
        const config = {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                withCredentials: true,
            }
        }
        try {
            const response = await axios.post('/editUser', udata, config)
            const { data } = response;
            console.log("response : ", response);
            if (response.status == 400) {
                toast.error('Failed To Edit!', {
                    position: "top-center",

                });
            }
            else if (response.status == 422) {
                toast.error('please try to login with the correct credientials!', {
                    position: "top-center",

                });
            } else {
                setIsSuccess(true);
                toast.success('Edit user credentials!', {
                    position: "top-center",
                });
                setAccount(data);
                // dispatch(IsUserRegister(true))
            }

        } catch (error) {
            setIsSuccess(false);
            console.log("Error", error);
            toast.error('Failed to edit credientials!', {
                position: "top-center",

            });
        }
    }
}

export const addItem = (id, specificProduct, setAccount) => {

    return async (dispatch) => {
        //axios syntax url/ data/ headers
        const config = {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                withCredentials: true,
            },

        }
        try {
            const response = await axios.post(`/product/addcart/${id}`, specificProduct, config);
            const { data } = response;
            if (response.status === 401 || !data) {
                console.log("User Invalid");
                alert("User Invalid")
            } else {
                // alert("data is added in your cart")
                console.log("Data : ", data)
                setAccount(data);
            }
        } catch (error) {
            console.log(error);
        }

    }
}
export const buyNowProduct = (id, specificProduct, setAccount) => {
    return async (dispatch) => {
        const config = {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                withCredentials: true,
            },
        }
        try {
            const response = await axios.post(`/product/addcart/${id}`, specificProduct, config);
            const { data } = response;
            if (response.status === 401 || !data) {
                console.log("User Invalid");
                alert("User Invalid")
            } else {
                // alert("data is added in your cart")
                console.log("Data : ", data)
                setAccount(data);
            }
        } catch (error) {
            console.log(error);
        }
    }
}
export const getBuyData = () => {
    return async (dispatch) => {
        const config = {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                withCredentials: true,
            }
        }
        const response = await axios.get('/product/cartdetails', config);
        const { data } = response;
        console.log("Get Buy data : ", data);
        if (response.status !== 201) {
            console.log("Failed to get the  data");
        } else {
            dispatch(addCartData(data.carts));
            // setCartData(data.carts);
        }
    }
}
export const isUserValid = (setAccount) => {
    return async (dispatch) => {
        const config = {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                withCredentials: true,
            }
        }
        const response = await axios.get('/validuser', config);
        const { data } = response;
        dispatch(loginUserInfo(data));

        // console.log("Valid Data : ", data);
        if (response.status !== 201) {
            console.log("Error");
        } else {
            console.log("Data Valid");
            setAccount(data);

        }

    }
}
export const deleteCartItem = (id, setAccount) => {
    return async (dispatch) => {
        const config = {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                withCredentials: true,
            }
        }
        try {
            const response = await axios.delete(`/product/remove/${id}`, config);
            const { data } = response;
            console.log("Data : ", data);
            if (response.status === 400 || !data) {
                console.log("Error");
            } else {
                console.log("Item Delete From Cart");
                setAccount(data);

                toast.success("Item Delete From Cart", {
                    position: "top-center",
                });

            }
        } catch (error) {
            console.log("Error : ", error);
        }

    }
}
export const deleteCartData = (id, setAccount) => {
    return async (dispatch) => {
        const config = {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                withCredentials: true,
            }
        }
        try {
            const response = await axios.delete(`/product/deleteProduct/${id}`, config);
            const { data } = response;
            console.log("Data : ", data);
            if (response.status === 400 || !data) {
                console.log("Error");
            } else {
                console.log("Product Delete Successfully");
                setAccount(data);
                toast.success('Item Remove Successfully!!!', {
                    position: "top-center",
                });

            }
        } catch (error) {
            console.log("Error : ", error);
        }

    }
}
export const userLogout = (setAccount) => {
    return async (dispatch) => {
        const config = {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                withCredentials: true,
            }
        }
        const response = await axios.get('/logout', config);
        const { data } = response;
        // console.log("Valid Data : ", data);
        if (response.status !== 201) {
            console.log("Error");
        } else {
            console.log("Data Valid");
            toast.success('User Logout Successfully!!!', {
                position: "top-center",
            });
            setAccount(false)
        }

    }
}
export const proceedData = (proceedTheData) => {
    return async (dispatch) => {
        const config = {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                withCredentials: true,
            }
        }
        const response = await axios.post('/buy/proceedToBuy', proceedTheData, config)
        const { data } = response;
        dispatch(proceedInformation(data));


    }
}
export const getBuyDetail = () => {
    return async (dispatch) => {
        const config = {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                withCredentials: true,
            }
        }
        const response = await axios.get('/buy/getBuyDetail', config);
        const { data } = response;
        console.log("Get Buy detail : ", data);
        dispatch(proceedInformation(data));

    }
}
export const placeHolder = (placeOrder, setAccount) => {
    return async (dispatch) => {
        const config = {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                withCredentials: true,
            }
        }
        try {
            const response = await axios.post('/buy/finalOrder', placeOrder, config);
            const { data } = response;
            if (response.status === 401 || !data) {
                console.log("User Invalid");
                alert("User Invalid")
            } else {
                console.log("Data : ", data)
                toast.success('Order Place!!!', {
                    position: "top-center",
                });
            }
        } catch (error) {

        }
    }
}





