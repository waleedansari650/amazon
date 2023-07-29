import React, { useContext, useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { addItem, getProducts } from '../../services/service';
import { LoginContext } from '../context/ContextProvider';
import Navbar from '../header/Navbar';
import Newnavbar from '../newnavbar/Newnavbar';
import Footer from '../footer/Footer';
import { CircularProgress } from '@mui/material';
import InfiniteScroll from "react-infinite-scroll-component";

const ViewAllProducts = () => {
    const dispatch = useDispatch();
    const { account, setAccount } = useContext(LoginContext)
    const [loading, setLoading] = useState(false);
    const [totalResults, setTotalResults] = useState(0);
    const getProduct = useSelector(state => state.getproductsdata.products);
    const getData = async () => {
        setLoading(true);
        setTimeout(async () => {
            await dispatch(getProducts())
            setTotalResults(getProduct.length)
            setLoading(false);
        }, 2000)
    }
    const addToCart = async (id) => {
        await dispatch(addItem(id, getProduct, setAccount))
    }
    const fetchMoreData = async () => {

    }
    useEffect(() => {
        getData()
    }, [])
    return (
        <>
            <Navbar />
            <Newnavbar />
            {
                !loading && getProduct ? (
                    <div class="bg-white py-6 sm:py-8 lg:py-12">
                        <div class="max-w-screen-2xl px-4 md:px-8 mx-auto">
                            <div class="mb-10 md:mb-16 mt-4">
                                <h2 class="text-gray-800 text-2xl lg:text-3xl font-bold text-center mb-4 md:mb-6">All Products</h2>

                                <p class="max-w-screen-md text-gray-500 md:text-lg text-center mx-auto">All the Products are available there you recieve with in 3 days.</p>
                            </div>
                            <InfiniteScroll
                                dataLength={getProduct.length}
                                next={fetchMoreData}
                                hasMore={getProduct.length !== totalResults}
                                loader={<div className='circle'>
                                    <CircularProgress />
                                    <h2>Loading...</h2>
                                </div>}
                            >
                                <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-4 xl:gap-4">

                                    {
                                        getProduct.map((item) => {
                                            return (
                                                <div class="group relative m-auto mt-36 h-72 w-72 overflow-hidden bg-black">
                                                    <img
                                                        class="h-full w-full transform object-cover backdrop-opacity-100 duration-700"
                                                        src={item.image}
                                                    />
                                                    <div
                                                        class="absolute inset-y-full h-full w-full transform opacity-20 shadow-2xl duration-500 group-hover:-inset-y-0"
                                                    ></div>
                                                    <div
                                                        class="absolute inset-y-3/4 h-full w-full transform bg-gradient-to-t from-black duration-500 group-hover:-inset-y-0"
                                                    >
                                                        <div class="absolute flex w-full place-content-center">
                                                            <p class="mt-10 text-center font-serif text-3xl font-bold capitalize text-white shadow-2xl">
                                                                {item.title}
                                                            </p>
                                                        </div>
                                                        <div class="absolute mt-20 flex w-full place-content-center">
                                                            <p class="mt-5 w-4/5 text-center font-sans text-white">
                                                                {item.description}
                                                            </p>
                                                        </div>
                                                        <button class="absolute left-10 bottom-4 h-10 w-48 rounded-lg bg-white font-bold text-black" onClick={() => { addToCart(item._id) }}>
                                                            Add To Cart
                                                        </button>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                </div>
                            </InfiniteScroll>

                        </div>
                    </div>
                ) : (<div className='circle'>
                    <CircularProgress />
                    <h2>Loading...</h2>
                </div>)
            }
            <Footer />

        </>
    )
}

export default ViewAllProducts