import { ADD_CART_DATA, ADD_NEW_PRODUCT, ADD_NEW_USER, ALL_USERS, FAIL_GET_PRODUCTS, FETCH_SPECIFIC_PRODUCT, GET_USER, IS_LOGIN, IS_REGISTER, LOGIN_USER, ORDER_DISPATCH, PLACE_ORDERS, PROCEED_DATA, SUCCESS_GET_PRODUCTS, TOTAL_AMOUNT, UPDATE_PRODUCT } from "../action-types/actionType";

const initialState = {
    products: [],
    product: {},
    user: {},
    isSuccess: false,
    isLogin: null,
    cartData: "",
    userLoginInfo: {},
    proceedData: {},
    users: [],
    totalAmount: 0,
    placeOrders: [],
    dispatchOrders: [],
    totalResults: 0

}

export const getProductsReducer = (state = initialState, action) => {

    switch (action.type) {

        case SUCCESS_GET_PRODUCTS:
            return { ...state, products: action.payload }
        case FAIL_GET_PRODUCTS:
            return { products: action.payload }
        case FETCH_SPECIFIC_PRODUCT:
            return { product: action.payload }
        case IS_REGISTER:
            return { ...state, isSuccess: action.payload }
        case IS_LOGIN:
            return { isLogin: action.payload }
        case ADD_CART_DATA:
            console.log("Reducer : ", action.payload);
            return {
                ...state, cartData: action.payload

            }
        case LOGIN_USER: {
            return {
                userLoginInfo: action.payload
            }
        }
        case PROCEED_DATA: {
            return {
                ...state, proceedData: action.payload
            }
        }
        case ADD_NEW_PRODUCT: {
            console.log("in reducer  : ", action.payload.product);
            return {
                ...state,
                products: [...state.products, action.payload]
            }
        }
        case UPDATE_PRODUCT: {
            return {
                ...state,
                products: [...state.products, action.payload]
            }
        }
        case ALL_USERS: {
            return { users: action.payload }
        }
        case ADD_NEW_USER: {
            return {
                ...state,
                users: [...state.users, action.payload]
            }
        }
        case TOTAL_AMOUNT: {
            return {
                ...state,
                totalAmount: action.payload
            }
        }
        case PLACE_ORDERS: {
            return {
                placeOrders: action.payload
            }
        }
        case ORDER_DISPATCH: {
            return {
                ...state,
                dispatchOrders: action.payload
            }
        }
        case GET_USER: {
            return {
                ...state,
                user: action.payload
            }
        }
        default:
            return state
    }

}


