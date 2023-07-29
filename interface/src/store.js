import { configureStore } from '@reduxjs/toolkit'
import thunk from 'redux-thunk';
import { getProductsReducer } from "./redux/reducers/Productsreducer";
import { combineReducers } from 'redux';
const reducer = combineReducers({
    getproductsdata: getProductsReducer
})

// const middleware = [thunk]
const store = configureStore({
    reducer,
    middleware: [thunk]

})
export default store;


