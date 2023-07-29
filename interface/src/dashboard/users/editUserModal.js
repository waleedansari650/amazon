import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux/es/exports';
import { updateProduct } from '../../services/adminServices';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import PreviewImage from '../products/previewImage';
import { getProducts } from '../../services/service';
import { Link, useParams } from 'react-router-dom';

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

const EditUserModal = ({ userInfo }) => {
    const navigate = useNavigate();
    const [url, setUrl] = useState();
    const params = useParams();
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const [user, setUser] = useState({ fname: "", email: "", mobile: "", password: "", password: "", cpassword: "" });
    console.log("USER INFO--22 : ", userInfo);
    useEffect(() => {
        if (userInfo) {
            setUser({ ...user, ...userInfo })
        }
    }, [userInfo])
    const sendData = async (product) => {
        // await dispatch(addNewProduct(product));
        setTimeout(async () => {
            await dispatch(getProducts());
            setLoading(false);
            navigate('/adminProducts');
        }, 2000)
    }
    return (
        <>

            <div className="modal fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto" id="exampleModalCenteredScrollable2" tabindex="-1" aria-labelledby="exampleModalCenteredScrollable" aria-modal="true" role="dialog">
                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable relative w-auto pointer-events-none">
                    <div className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
                        <div className="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
                            <h5 className="text-xl font-medium leading-normal text-gray-800" id="exampleModalCenteredScrollableLabel">
                                Edit User
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
                                            <label for="fname" className="inline-block text-gray-800 text-sm sm:text-base mb-2">Edit User Name</label>
                                            <input required placeholder='Enter name of user' type="text" name="fname" className="w-full bg-gray-50 text-gray-800 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2" value={values.fname} onChange={handleChange} />

                                        </div>

                                        <div className="sm:col-span-2">
                                            <label for="price" className="inline-block text-gray-800 text-sm sm:text-base mb-2">Edit User Email </label>
                                            <input required name="email" type="email" placeholder='Enter email of user' className="w-full bg-gray-50  text-gray-800 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2" value={values.email} onChange={handleChange} />

                                        </div>
                                        <div className="sm:col-span-2">
                                            <label for="password" className="inline-block text-gray-800 text-sm sm:text-base mb-2">Edit User Password</label>
                                            <input required name="password" type="password" placeholder='password atleast 6 char long' className="w-full bg-gray-50  text-gray-800 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2" value={values.password} onChange={handleChange} />

                                        </div>
                                        <div className="sm:col-span-2">
                                            <label for="cpassword" className="inline-block text-gray-800 text-sm sm:text-base mb-2">Edit User Confirm Password</label>
                                            <input required name="cpassword" type="password" placeholder='enter password again' className="w-full bg-gray-50  text-gray-800 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2" value={values.cpassword} onChange={handleChange} />

                                        </div>
                                        <div className="sm:col-span-2">
                                            <label for="mobile" className="form-label inline-block mb-2 text-gray-700">Edit User Mobile No</label>
                                            <input required name="mobile" type="number" placeholder='+92-303-1111111' className="w-full bg-gray-50  text-gray-800 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2" value={values.mobile} onChange={handleChange} />

                                        </div>

                                        <div className="sm:col-span-2 flex justify-center items-center">

                                            <input type="submit"
                                                className=" w-40 flex justify-center px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out ml-1" value="Edit" />

                                        </div>

                                    </form>
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

export default EditUserModal