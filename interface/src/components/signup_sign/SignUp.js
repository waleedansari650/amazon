import React, { useContext, useState } from 'react'
import './signup.css';
import { Divider } from '@mui/material';
import { NavLink, useNavigate } from "react-router-dom";
import { registerUser } from '../../services/service';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import { useFormik } from 'formik';
import CircularProgress from '@mui/material/CircularProgress';
import { LoginContext } from '../context/ContextProvider';
import Loader from '../loader/Loader';
import Navbar from '../header/Navbar';
import Newnavbar from '../newnavbar/Newnavbar';
import Footer from '../footer/Footer';

const SignUp = () => {
    // const { successfullRegister, setSuccessfullRegister } = useContext(LoginContext)
    const { account, setAccount } = useContext(LoginContext);
    const [isSuccess, setIsSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    // const isRegister = useSelector(state => state.getproductsdata.isSuccess);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const sendData = async (value) => {
        setLoading(true);
        setTimeout(async () => {
            await dispatch(registerUser(value, setAccount, setIsSuccess));
            setLoading(false)
        }, 2000);


    }
    useEffect(() => {
        if (isSuccess) {
            navigate('/login');
        }
        setIsSuccess(false);

    }, [isSuccess])

    const formik = useFormik({
        initialValues: {
            fname: '',
            email: '',
            password: '',
            cpassword: '',
            mobile: '',

        },

        validate: () => {
            const errors = {};
            if (!formik.values.fname) {
                errors.fname = "Name is required";
            } else if (formik.values.fname.length === 5) {
                errors.fname = "Must be 6 characters or more";
            }

            if (!formik.values.email) {
                errors.email = "Email is required";
            } else if (
                !/^[a-z0-9](\.?[a-z0-9]){5,}@g(oogle)?mail\.com$/i.test(formik.values.email)
            ) {
                errors.email = "Invalid email address";
            }

            if (!formik.values.password) {
                errors.password = "Password is required";
            } else if (formik.values.password.length === 5) {
                errors.password = "Must be 6 characters or more";
            }

            if (!formik.values.cpassword) {
                errors.cpassword = "Confirm Password is required";
            } else if (formik.values.cpassword.length === 5) {
                errors.cpassword = "Must be 6 characters or more";
            }

            if (!formik.values.mobile) {
                errors.mobile = "Mobile Number required";
            } else if (formik.values.mobile.length === 10) {
                errors.mobile = "Must be 11 characters or more";
            }

            return errors;
        },
        onSubmit: (values, { resetForm }) => {
            sendData(values);
            resetForm({ values: '' })
        },
    });

    return (

        <>
            {
                loading ? <div className='circle'>
                    <CircularProgress />
                    <h2>Loading...</h2>
                </div> : (
                    <>
                        <Navbar />
                        <Newnavbar />

                        <section>
                            <div className="sign_container">
                                <div className="sign_header">
                                    <img src="./blacklogoamazon.png" alt="signupimg" />
                                </div>
                                <div className="sign_form">
                                    <form method="POST" onSubmit={formik.handleSubmit}>
                                        <h1>Create account</h1>
                                        <div className="form_data">
                                            <label htmlFor="name">Your name</label>
                                            <input type="text" name="fname"
                                                onChange={formik.handleChange}
                                                value={formik.values.fname}
                                                onBlur={formik.handleBlur}
                                                id="name" />
                                            <p className='error'> {formik.touched.fname && formik.errors.fname ? <div>{formik.errors.fname}</div> : null}</p>
                                        </div>
                                        <div className="form_data">
                                            <label htmlFor="email">Email</label>
                                            <input type="email" name="email"

                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.email}
                                                id="email" />
                                            <p className='error'> {formik.touched.email && formik.errors.email ? <div>{formik.errors.email}</div> : null}</p>
                                        </div>
                                        <div className="form_data">
                                            <label htmlFor="mobile">Mobile</label>
                                            <input type="number" name="mobile"
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.mobile}
                                                id="mobile" />
                                            <p className='error'> {formik.touched.mobile && formik.errors.mobile ? <div>{formik.errors.mobile}</div> : null}</p>
                                        </div>
                                        <div className="form_data">
                                            <label htmlFor="password">Password</label>
                                            <input type="password" name="password"
                                                id="password" placeholder="At least 6 characters" onChange={formik.handleChange} onBlur={formik.handleBlur}
                                                value={formik.values.password} />
                                            <p className='error'> {formik.touched.password && formik.errors.password ? <div>{formik.errors.password}</div> : null}</p>
                                        </div>
                                        <div className="form_data">
                                            <label htmlFor="cpassword">Password Again</label>
                                            <input type="password" name="cpassword" id="cpassword" onChange={formik.handleChange} value={formik.values.cpassword} onBlur={formik.handleBlur} />
                                            <p className='error'> {formik.touched.cpassword && formik.errors.cpassword ? <div>{formik.errors.cpassword}</div> : null}</p>
                                        </div>
                                        <input type="submit" className="signin_btn" value="Continue" />

                                        <Divider />

                                        <div className="signin_info">
                                            <p>Already have an account?</p>
                                            <NavLink to="/login">Sign in</NavLink>
                                        </div>
                                    </form>
                                </div>
                                <ToastContainer />
                            </div>

                        </section>
                        <Footer />

                    </>)}


        </>
    )
}

export default SignUp