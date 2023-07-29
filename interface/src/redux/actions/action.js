import { FAIL_GET_PRODUCTS, FETCH_SPECIFIC_PRODUCT, SUCCESS_GET_PRODUCTS, IS_REGISTER, IS_LOGIN, ADD_CART_DATA, LOGIN_USER, PROCEED_DATA, ADD_NEW_PRODUCT, UPDATE_PRODUCT, ALL_USERS, ADD_NEW_USER, TOTAL_AMOUNT, PLACE_ORDERS, ORDER_DISPATCH, TOTAL_RESULTS, GET_USER } from "../action-types/actionType";

export const getProductData = (data) => {
    return {
        type: SUCCESS_GET_PRODUCTS,
        payload: data
    }
}
export const totalResults = (data) => {
    return {
        type: TOTAL_RESULTS,
        payload: data
    }
}
export const failGetProduct = (data) => {
    return {
        type: FAIL_GET_PRODUCTS,
        payload: data
    }
}
export const fetchSpecificProduct = (data) => {
    return {
        type: FETCH_SPECIFIC_PRODUCT,
        payload: data,
    }
}
export const IsUserRegister = (data) => {
    return {
        type: IS_REGISTER,
        payload: data
    }
}
export const IsUserLogin = (data) => {
    return {
        type: IS_LOGIN,
        payload: data
    }
}
export const addCartData = (data) => {
    return {
        type: ADD_CART_DATA,
        payload: data
    }
}
export const loginUserInfo = (data) => {
    return {
        type: LOGIN_USER,
        payload: data
    }
}

export const proceedInformation = (data) => {
    return {
        type: PROCEED_DATA,
        payload: data
    }
}
export const addingProduct = (data) => {
    console.log("Action DAta : ", data.product)
    return {
        type: ADD_NEW_PRODUCT,
        payload: data
    }
}
export const updateProduct = (data) => {
    return {
        type: UPDATE_PRODUCT,
        payload: data
    }
}
export const allUsers = (data) => {
    return {
        type: ALL_USERS,
        payload: data
    }
}
export const addUser = (data) => {
    return {
        type: ADD_NEW_USER,
        payload: data
    }
}
export const setTotalAmount = (data) => {
    return {
        type: TOTAL_AMOUNT,
        payload: data,
    }
}
export const placeOrders = (data) => {
    return {
        type: PLACE_ORDERS,
        payload: data,
    }
}
export const orderDispatch = (data) => {
    return {
        type: ORDER_DISPATCH,
        payload: data,
    }
}
export const getUser = (data) => {
    return {
        type: GET_USER,
        payload: data,
    }
}

