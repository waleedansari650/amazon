import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux/es/exports';
import { addNewProduct, fetchImage, updateProduct } from '../../services/adminServices';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import PreviewImage from './previewImage';
import { ToastContainer, toast } from 'react-toastify';
import { getProducts, getSpecificProduct } from '../../services/service';
import { CircularProgress } from '@mui/material';

const orderSchema = Yup.object({
    title: Yup.string()
        .min(4, 'Too Short!')
        .max(50, 'Too Long!')
        .required('please enter title of product'),
    price: Yup.number()
        .min(1, 'Too Short!')
        .required('please enter price of product'),
    image: Yup.mixed().required("Required!!!").test("FILE_SIZE", "Too big!", (value) => value && value.size < 1024 * 1024).test("FILE_TYPE", "Invalid!", (value) =>
        value && ['image/png', 'image/jpeg'].includes(value.type)),

    description: Yup.string()
        .min(10, 'Too Short!')
        .max(50, 'Too Long!')
        .required('please enter long description of product'),

    longDescription: Yup.string()
        .min(20, 'Too Short!')
        .max(120, 'Too Long!')
        .required('please enter description of product'),


})
const AddProductModal = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [url, setUrl] = useState();
    const params = useParams();
    const [loading, setLoading] = useState(false);

    const initialValues = {
        title: "",
        price: "",
        description: "",
        longDescription: "",
        image: "",
    }
    const sendData = async (product) => {
        await dispatch(addNewProduct(product));
        setTimeout(async () => {
            await dispatch(getProducts());
            setLoading(false);
            navigate('/adminProducts');
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
    const getProduct = useSelector(state => state.getproductsdata.products);
    return (
        <>

            <div className="modal fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto" id="exampleModalCenteredScrollable" tabindex="-1" aria-labelledby="exampleModalCenteredScrollable" aria-modal="true" role="dialog">
                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable relative w-auto pointer-events-none">
                    <div className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
                        <div className="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
                            <h5 className="text-xl font-medium leading-normal text-gray-800" id="exampleModalCenteredScrollableLabel">
                                Add Product
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
                                            <label for="title" className="inline-block text-gray-800 text-sm sm:text-base mb-2">Product Title</label>
                                            <input required placeholder='Enter name of product' type="text" name="title" className="w-full bg-gray-50 text-gray-800 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2" value={values.title} onChange={handleChange} onBlur={handleBlur} />
                                            {errors.title && touched.title ? (<p className='error'> {errors.title}</p>) : null}
                                        </div>

                                        <div className="sm:col-span-2">
                                            <label for="price" className="inline-block text-gray-800 text-sm sm:text-base mb-2">Product Price </label>
                                            <input required min="0" step="10" name="price" type="number" placeholder='Enter price of product' className="w-full bg-gray-50  text-gray-800 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2" value={values.price} onChange={handleChange} onBlur={handleBlur} />
                                            {errors.price && touched.price ? (<p className='error'> {errors.price}</p>) : null}
                                        </div>
                                        <div className="sm:col-span-2">
                                            <label for="description" className="inline-block text-gray-800 text-sm sm:text-base mb-2">Product Description</label>
                                            <textarea placeholder='Enter description of the product' name="description" className="w-full h-32 bg-gray-50 text-gray-800 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2" value={values.description} onChange={handleChange} onBlur={handleBlur}></textarea>
                                            {errors.description && touched.description ? (<p className='error'> {errors.description}</p>) : null}
                                        </div>
                                        <div className="sm:col-span-2">
                                            <label for="longDescription" className="inline-block text-gray-800 text-sm sm:text-base mb-2">Product Long Description</label>
                                            <textarea placeholder='Enter long description of the product' name="longDescription" className="w-full h-64 bg-gray-50 text-gray-800 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2" value={values.longDescription} onChange={handleChange} onBlur={handleBlur}></textarea>
                                            {errors.longDescription && touched.longDescription ? (<p className='error'> {errors.longDescription}</p>) : null}
                                        </div>
                                        <div className="sm:col-span-2">
                                            <label for="image" className="form-label inline-block mb-2 text-gray-700">Upload Product Image</label>
                                            <input className="w-full bg-gray-50 text-gray-800 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2 form-control block  text-base font-normal    bg-clip-padding border-solid border-gray-300 ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" type="file" id="image"

                                                onChange={(event) => {
                                                    setFieldValue("image", event.target.files[0]);
                                                }} />
                                            {values.image && <PreviewImage file={values.image} />}
                                            {errors.image && touched.image ? (<p className='error'> {errors.image}</p>) : null}
                                        </div>

                                        <div className="sm:col-span-2 flex justify-center items-center">
                                            {
                                                params.id ? <input type="submit"
                                                    className=" w-40 flex justify-center px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out ml-1" value="Edit" /> : <input type="submit"
                                                        className=" w-40 flex justify-center px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out ml-1" value="Add" />
                                            }

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

export default AddProductModal