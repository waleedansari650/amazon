import React, { useState, useEffect, useContext } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import './proceed.css'
import Button from '@mui/material/Button';
import { useFormik } from 'formik';
import * as Yup from 'yup'
import { useDispatch, useSelector } from 'react-redux';
import { getBuyData, getBuyDetail, proceedData } from '../../services/service';
import { CircularProgress, Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { LoginContext } from '../context/ContextProvider';
import Navbar from '../header/Navbar';
import Newnavbar from '../newnavbar/Newnavbar';
import Footer from '../footer/Footer';


const orderSchema = Yup.object({
    houseNo: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('please enter your house no'),
    area: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('please enter your area'),
    landmark: Yup.string()
        .min(10, 'Too Short!')
        .max(50, 'Too Long!')
        .required('please enter your landmark/building'),
    city: Yup.string()
        .min(3, 'Too Short!')
        .max(50, 'Too Long!')
        .required('please enter your city name'),
    province: Yup.string()
        .min(3, 'Too Short!')
        .max(50, 'Too Long!')
        .required('please enter your province name'),

})

const ProceedToBuy = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const { account, setAccount } = useContext(LoginContext);
    const cartData = useSelector(state => state.getproductsdata.cartData);
    const userInfo = useSelector(state => state.getproductsdata.proceedData);
    const sendData = async (data) => {
        await dispatch(proceedData(data));
        navigate('/reviewOrder');
    }
    const initialValues = {
        houseNo: "",
        area: "",
        landmark: "",
        city: '',
        province: ""
    }
    const { values, errors, touched, handleBlur, handleChange, handleSubmit, } = useFormik({
        initialValues,
        validationSchema: orderSchema,
        onSubmit: (values, action) => {
            sendData(values);
            action.resetForm();

        }
    })
    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 2000);
    }, [])
    return (

        <>
            {
                loading ? (<div className='circle'>
                    <CircularProgress />
                    <h2>Loading...</h2>
                </div>) : (
                    <>
                        <Navbar />
                        <Newnavbar />
                        <div className="proceed_section">
                            <div className='heading'>
                                <h1 style={{ fontSize: "2rem", fontWeight: "bold" }} >Proceed To Buy</h1>
                            </div>
                            <Divider />
                            <div className="proceed_container">
                                <div className="proceed_left">
                                    <img src="https://images.unsplash.com/photo-1592840015316-0f1747257759?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=600&ixid=MnwxfDB8MXxyYW5kb218MHx8c2hvcHBpbmd8fHx8fHwxNjcxMjcwNDk4&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=900" alt="" />
                                </div>
                                <div className="proceed_right">
                                    <form className="proceed_form"
                                        component="form"
                                        sx={{
                                            '& > :not(style)': { m: 1, width: '25ch' },
                                        }}
                                        noValidate
                                        autoComplete="off"
                                        onSubmit={handleSubmit}
                                    >
                                        <TextField className='text_field' id="standard-basic" label="House No" variant="standard" name="houseNo" type='text' value={values.houseNo} onChange={handleChange} onBlur={handleBlur} />
                                        {errors.houseNo && touched.houseNo ? (<p className='error'> {errors.houseNo}</p>) : null}
                                        <TextField type='text' className='text_field' id="standard-basic" label="Area/Town" variant="standard" name='area' value={values.area} onChange={handleChange} onBlur={handleBlur} />
                                        {errors.area && touched.area ? (<p className='error'> {errors.area}</p>) : null}
                                        <TextField type='text' className='text_field' id="standard-basic" label="block | street  " variant="standard" name="landmark" value={values.landmark} onChange={handleChange} onBlur={handleBlur} />
                                        {errors.landmark && touched.landmark ? (<p className='error'> {errors.landmark}</p>) : null}
                                        <TextField type='text' className='text_field' id="standard-basic" label="City" variant="standard" name="city" value={values.city} onChange={handleChange} onBlur={handleBlur} />
                                        {errors.city && touched.city ? (<p className='error'> {errors.city}</p>) : null}
                                        <TextField type='text' className='text_field' id="standard-basic" label="Province" variant="standard" name='province' value={values.province} onChange={handleChange} onBlur={handleBlur} />
                                        {errors.province && touched.province ? (<p className='error'> {errors.province}</p>) : null}
                                        <Button style={{ marginTop: "2rem" }} variant="outlined" type='submit'>
                                            Deliever to this Address
                                        </Button>
                                    </form>
                                </div>

                            </div>
                        </div>
                        <Footer />

                    </>
                )
            }


        </>
    )
}

export default ProceedToBuy