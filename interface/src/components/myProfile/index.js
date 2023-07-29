import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom';
import { LoginContext } from '../context/ContextProvider';
import { NavLink, useNavigate } from "react-router-dom";
import { editUser } from '../../services/service';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useFormik } from 'formik';
import CircularProgress from '@mui/material/CircularProgress';
import Loader from '../loader/Loader';
import { Avatar } from '@mui/material';
import Navbar from '../header/Navbar';
import Newnavbar from '../newnavbar/Newnavbar';
import Footer from '../footer/Footer';
const MyProfile = () => {
    const { account, setAccount } = useContext(LoginContext);
    const [isSuccess, setIsSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();


    return (
        <>

            {
                account ? (
                    <>
                        <Navbar />
                        <Newnavbar />
                        <section class="p-6 md:p-12 text-center md:text-left shadow-lg rounded-md" style={{ backgroundImage: account.fname[0].toUpperCase() }}>
                            <div class="flex justify-center">
                                <div class="max-w-3xl">
                                    <div class="block px-6 py-12 rounded-lg shadow-lg bg-slate-100 m-4">
                                        <div class="md:flex md:flex-row">
                                            <div
                                                class="md:w-96 w-36 flex justify-center items-center mb-6 lg:mb-0 mx-auto md:mx-0 "
                                            >
                                                <Avatar id="basic-button"
                                                    alt="Travis Howard" style={{ fontSize: "3rem", backgroundColor: "greenyellow" }} className='avtar2  px-20 py-20 text-3xl ' >{account.fname[0].toUpperCase()}</Avatar>
                                            </div>
                                            <div class="md:ml-6">
                                                <p class="text-gray-500 font-light mb-6">
                                                    You  just view your credentials like email, name & phone number
                                                </p>
                                                <p class="font-semibold text-xl mb-2 text-gray-800">{account.fname.toUpperCase()}</p>
                                                <p class="font-semibold text-gray-500 mb-0">{account.email.toLowerCase()}</p>
                                                <p class="font-semibold text-gray-500 mb-0">{account.mobile}</p>
                                                <Link to="/">
                                                    <button type="button" class=" mt-10 px-20 inline-block py-2 border-2 border-green-500 text-green-500 font-medium text-xs leading-tight uppercase rounded-full hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out">Back</button></Link>
                                            </div>

                                        </div>
                                    </div>
                                </div>


                            </div>
                        </section>
                        <Footer />

                    </>
                ) : (<div className='circle'>
                    <CircularProgress />
                    <h2>Loading...</h2>
                </div>)
            }









        </>
    )
}

export default MyProfile;