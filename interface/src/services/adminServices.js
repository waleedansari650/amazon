import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import { addingProduct, addUser, allUsers, getUser, orderDispatch, placeOrders } from "../redux/actions/action";

export const addNewProduct = (product) => {
    return async (dispatch) => {
        const config = {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                withCredentials: true,
            }
        }
        let formData = new FormData();
        const { title, price, description, longDescription, image } = product;
        formData.append("testImage", image);
        formData.append('title', title);
        formData.append('price', price);
        formData.append("description", description);
        formData.append('longDescription', longDescription);
        console.log("form DAta: ", formData);
        try {
            const { data } = await axios.post("/product/addProduct", formData);
            console.log("ADD product Data : ", data)
            await dispatch(addingProduct(data));
            toast.success('Product Added Successfully!', {
                position: "top-center",
            });

        } catch (error) {
            toast.error('Some Error Occured!', {
                position: "top-center",

            });
        }
    }
}
export const deleteProduct = (id, setAccount) => {
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


export const updateProduct = (product, id) => {
    return async (dispatch) => {
        // const config = {
        //     headers: {
        //         Accept: "application/json",
        //         "Content-Type": "application/json",
        //         withCredentials: true,
        //     }
        // }
        let formData = new FormData();
        const { title, price, description, longDescription, image } = product;
        formData.append("testImage", image);
        formData.append('title', title);
        formData.append('price', price);
        formData.append("description", description);
        formData.append('longDescription', longDescription);
        console.log("update form DAta: ", formData);
        try {
            const { data } = await axios.put(`/product/updateProduct/${id}`, formData);
            console.log("ADD product Data : ", data)
            await dispatch(updateProduct(data));
            if (data.status === 400 || !data) {
                toast.error('Failed to update product!!!', {
                    position: "top-center",
                });
            } else {
                toast.success('Product Updated Successfully!', {
                    position: "top-center",
                });
            }
        } catch (error) {
            toast.error('Some Error Occured!', {
                position: "top-center",

            });
        }
    }
}
//get all the users 
export const getUsers = () => {
    return async (dispatch) => {
        const config = {
            headers: {
                Accept: "application/json",
            }
        }
        try {
            const { data } = await axios.get('/getUsers', config);
            dispatch(allUsers(data))

        } catch (error) {
            console.log(error)
            // dispatch(failGetProduct(error.response.data.message))
        }
    }
}
export const addNewUser = (user) => {
    return async (dispatch) => {
        const config = {
            headers: {
                "Content-Type": "Application/json"
            }
        }
        try {
            const response = await axios.post('/register', user, config)
            const { data } = response;
            dispatch(addUser(data))
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
                toast.success('User Register Successfully!', {
                    position: "top-center",
                });
            }

        } catch (error) {
            toast.error('Please try to register with the correct credientials!', {
                position: "top-center",

            });
        }
    }
}


export const getParticularUser = (id, setUserInfo) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
        }
    }
    return async (dispatch) => {
        try {
            const response = await axios.get(`/getParticularUser/${id}`, config);
            const { data } = response;
            console.log("Data : ", response);
            setUserInfo(data);
            dispatch(getUser(data))

        } catch (error) {
            console.log("Error : ", error);
        }

    }
}
export const deleteParticularUser = (id, setAccount) => {
    return async (dispatch) => {
        const config = {
            headers: {
                "Content-Type": "application/json",
            }
        }
        try {
            const response = await axios.delete(`/deleteUser/${id}`, config);
            const { data } = response;
            console.log("Data : ", data);
            if (response.status === 402 || !data) {
                toast.error('Failed to delete item!!!', {
                    position: "top-center",
                });
            } else {
                console.log("User Delete Successfully");
                toast.success('Item Remove Successfully!!!', {
                    position: "top-center",
                });

            }
        } catch (error) {
            console.log("Error : ", error);
        }

    }
}
export const getPlaceOrders = () => {
    return async (dispatch) => {
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }
        try {
            const { data } = await axios.get('/buy/getPlaceOrders', config);
            dispatch(placeOrders(data));
        } catch (error) {

        }
    }
}
export const deleteOrder = (id) => {
    return async (dispatch) => {
        const config = {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                withCredentials: true,
            }
        }
        try {
            const response = await axios.delete(`/buy/deleteOrder/${id}`, config);
            const { data } = response;
            console.log("Data : ", data);
            if (response.status === 400 || !data) {
                console.log("Error");
            } else {
                console.log("Order Delete Successfully");
                toast.success('Order Delete Successfully!!!', {
                    position: "top-center",
                });

            }
        } catch (error) {
            console.log("Error : ", error);
        }

    }
}
export const delieverProduct = (delieverData) => {
    return async (dispatch) => {
        const config = {
            headers: {
                Accept: "application/json",

            }
        }
        try {
            // const getPlaceOrder = await axios.get('')
            console.log("Before Hiting Api : ", delieverData);
            const response = await axios.post('/buy/delieverOrder', delieverData, config);
            const { data } = response;
            if (response.status == 422) {
                toast.error('Order Not Dispatch!', {
                    position: "top-center",
                });
            }
            else {
                toast.success('Order Deliver Successfully!', {
                    position: "top-center",
                });
            }
        } catch (error) {
            console.log("Error : ", error);

        }
    }
}
export const getdelieverProducts = () => {
    return async (dispatch) => {
        const config = {
            headers: {
                Accept: "application/json",
            }
        }
        try {
            const { data } = await axios.get('/buy/getDelieverOrders', config)
            dispatch(orderDispatch(data))
        } catch (error) {
            console.log(error);
        }
    }
}
export const deleteDelieverOrder = (id) => {
    return async (dispatch) => {
        const config = {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                withCredentials: true,
            }
        }
        try {
            const response = await axios.delete(`/buy/deleteDeleteOrder/${id}`, config);
            const { data } = response;
            console.log("Data : ", data);
            if (response.status === 400 || !data) {
                console.log("Error");
            } else {
                console.log("Order Delete Successfully");
                toast.success('Deliever Order Delete Successfully!!!', {
                    position: "top-center",
                });

            }
        } catch (error) {
            console.log("Error : ", error);
        }

    }
}



