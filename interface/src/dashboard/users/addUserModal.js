import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { addNewProduct, addNewUser, fetchImage, getUsers, updateProduct } from '../../services/adminServices';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import PreviewImage from '../products/previewImage';
import { ToastContainer, toast } from 'react-toastify';
import { getProducts, getSpecificProduct } from '../../services/service';
import { CircularProgress } from '@mui/material';

const orderSchema = Yup.object({
    fname: Yup.string()
        .min(4, 'Too Short!')
        .max(50, 'Too Long!')
        .required('please enter the name'),
    email: Yup.string().email()
        .required('please enter the email '),

    password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .max(12, 'Too Long!')
        .required('password must be 6 char long'),

    cpassword: Yup.string()
        .min(6, 'Too Short!')
        .max(12, 'Too Long!')
        .required('Confirm Password is required')
        .oneOf([Yup.ref('password')], 'Passwords must match'),
    mobile: Yup.number()
        .required('Enter 11 digit number '),

})
const AddUserModal = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [url, setUrl] = useState();
    const params = useParams();
    const [loading, setLoading] = useState(false);

    const initialValues = {
        fname: "",
        email: "",
        mobile: "",
        password: "",
        cpassword: "",

    }
    const sendData = async (user) => {
        await dispatch(addNewUser(user));
        setTimeout(async () => {
            await dispatch(getUsers());
            setLoading(false);
            navigate('/adminPanel');
        }, 2000)
    }
    const { values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue } = useFormik({
        initialValues,
        validationSchema: orderSchema,
        onSubmit: (values, action,) => {
            sendData(values);
            action.resetForm();
        }
    })
    return (
        <>
            <div className="modal fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto" id="exampleModalCenteredScrollable" tabindex="-1" aria-labelledby="exampleModalCenteredScrollable" aria-modal="true" role="dialog">
                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable relative w-auto pointer-events-none">
                    <div className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
                        <div className="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
                            <h5 className="text-xl font-medium leading-normal text-gray-800" id="exampleModalCenteredScrollableLabel">
                                Add User
                            </h5>
                            <button type="button"
                                className="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
                                data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        {/* body of the modal */}
                        <div className="modal-body relative p-4">
                            <div className="bg-white py-6 sm:py-8 lg:py-1">
                                <div className="max-w-screen-2xl px-4 md:px-8 mx-auto">
                                    <form noValidate autoComplete="off" onSubmit={handleSubmit} className="max-w-screen-md grid sm:grid-cols-2 gap-4 mx-auto">
                                        <div className="sm:col-span-2">
                                            <label for="fname" className="inline-block text-gray-800 text-sm sm:text-base mb-2">User Name</label>
                                            <input required placeholder='Enter name of user' type="text" name="fname" className="w-full bg-gray-50 text-gray-800 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2" value={values.fname} onChange={handleChange} onBlur={handleBlur} />
                                            {errors.fname && touched.fname ? (<p className='error'> {errors.fname}</p>) : null}
                                        </div>

                                        <div className="sm:col-span-2">
                                            <label for="price" className="inline-block text-gray-800 text-sm sm:text-base mb-2">User Email </label>
                                            <input required name="email" type="email" placeholder='Enter email of user' className="w-full bg-gray-50  text-gray-800 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2" value={values.email} onChange={handleChange} onBlur={handleBlur} />
                                            {errors.email && touched.email ? (<p className='error'> {errors.email}</p>) : null}
                                        </div>
                                        <div className="sm:col-span-2">
                                            <label for="password" className="inline-block text-gray-800 text-sm sm:text-base mb-2">User Password</label>
                                            <input required name="password" type="password" placeholder='password atleast 6 char long' className="w-full bg-gray-50  text-gray-800 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2" value={values.password} onChange={handleChange} onBlur={handleBlur} />
                                            {errors.password && touched.password ? (<p className='error'> {errors.password}</p>) : null}
                                        </div>
                                        <div className="sm:col-span-2">
                                            <label for="cpassword" className="inline-block text-gray-800 text-sm sm:text-base mb-2">User Confirm Password</label>
                                            <input required name="cpassword" type="password" placeholder='enter password again' className="w-full bg-gray-50  text-gray-800 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2" value={values.cpassword} onChange={handleChange} onBlur={handleBlur} />
                                            {errors.cpassword && touched.cpassword ? (<p className='error'> {errors.cpassword}</p>) : null}
                                        </div>
                                        <div className="sm:col-span-2">
                                            <label for="mobile" className="form-label inline-block mb-2 text-gray-700">User Mobile No</label>
                                            <input required name="mobile" type="number" placeholder='+92303-1111111' className="w-full bg-gray-50  text-gray-800 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2" value={values.mobile} onChange={handleChange} onBlur={handleBlur} />
                                            {errors.mobile && touched.mobile ? (<p className='error'> {errors.mobile}</p>) : null}
                                        </div>

                                        <div className="sm:col-span-2 flex justify-center items-center">
                                            {
                                                params.id ? <input type="submit"
                                                    className=" w-40 flex justify-center px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out ml-1" value="Edit" /> : <input type="submit"
                                                        className=" w-40 flex justify-center px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out ml-1" value="Add" />
                                            }

                                        </div>

                                    </form>
                                    <ToastContainer />

                                </div>
                            </div>
                        </div>
                        <div
                            className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
                            <button type="button"
                                className="inline-block px-6 py-2.5 bg-purple-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-purple-700 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out"
                                data-bs-dismiss="modal">
                                Close
                            </button>

                        </div>
                    </div>
                </div>
            </div>


        </>
    )
}

export default AddUserModal