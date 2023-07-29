import { CircularProgress } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux/es/exports';
import { Link, useParams } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import AdminPanel from '..'
import { LoginContext } from '../../components/context/ContextProvider';
import { deleteProduct } from '../../services/adminServices';
import { getProducts, getSpecificProduct } from '../../services/service';
import "../dashboard.css";
import AddProductModal from './addProductModal';
import EditProductModal from './editProductModal';

const Products = () => {
    const dispatch = useDispatch();
    // const [products, setProducts] = useState([]);
    const { account, setAccount } = useContext(LoginContext);
    const [loading, setLoading] = useState(false);
    const getProduct = useSelector(state => state.getproductsdata.products);
    const [edit, setEdit] = useState("");
    const params = useParams();

    console.log("Redux Products : ", getProduct);
    const getData = () => {
        dispatch(getProducts());
    }
    useEffect(() => {
        getData();
    }, [])

    const editItem = async (id) => {
        await dispatch(getSpecificProduct(id))
    }
    const deleteItem = async (deleteData) => {
        await dispatch(deleteProduct(deleteData, setAccount));
        getData();
    }
    return (
        <>

            <AdminPanel />
            <div className=" mx-auto px-4 sm:px-8 ">
                <div className="">
                    <ToastContainer />
                    <div className="tableContainer -mx-4 sm:-mx-8 px-4 sm:px-8 py-1 overflow-x-auto">
                        <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                            <h2 className="text-2xl font-semibold mt-4">Products Data</h2>
                            <div className="">

                                <button type="button" className="btn bg-purple-500 h-12 px-4 text-white hover:bg-purple-400 hover:text-slate-500 mt-4    inline-block  py-2.5  font-medium text-xs leading-tight uppercase rounded shadow-md  hover:shadow-lg  focus:shadow-lg focus:outline-none focus:ring-0  active:shadow-lg transition duration-150 ease-in-out" data-bs-toggle="modal" data-bs-target="#exampleModalCenteredScrollable">
                                    Add
                                </button>
                                <AddProductModal />
                            </div>
                        </div>
                        <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                            <table className=" table min-w-full leading-normal">
                                <thead>
                                    <tr id='tableRow'>
                                        <th id='tableHead'
                                            className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                            ID
                                        </th>
                                        <th id='tableHead'
                                            className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                            Image
                                        </th>
                                        <th id='tableHead'
                                            className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                            Title
                                        </th>
                                        <th id='tableHead'
                                            className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                            Short Description
                                        </th>
                                        <th id='tableHead'
                                            className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                            Long Description
                                        </th>
                                        <th id='tableHead'
                                            className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                            Price
                                        </th>
                                        <th id='tableHead '
                                            className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider ">
                                            Edit
                                        </th>
                                        <th id='tableHead '
                                            className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider ">
                                            Delete
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        getProduct ? (getProduct.map((item) => {
                                            return (
                                                <tr id='tableRow'>
                                                    <td className="   border-b border-gray-200 bg-white text-sm w-2/5">
                                                        <div className="flex items-center">

                                                            <div className="ml-3">
                                                                <p className="tableData text-gray-900 whitespace-no-wrap">
                                                                    <p> {item._id}</p>
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="border-b border-gray-200 bg-white text-sm" >
                                                        <p className="tableData text-gray-900 whitespace-no-wrap text-center">
                                                            <img className='tableImage' src={item.image} alt={item.title} />


                                                        </p>
                                                    </td>
                                                    <td className=" border-b border-gray-200 bg-white text-sm">
                                                        <p className="tableData text-gray-900 whitespace-no-wrap ">
                                                            <p >{item.title}</p>
                                                        </p>
                                                    </td>
                                                    <td className="  border-b border-gray-200 bg-white text-sm">
                                                        <p className="tableData text-gray-900 whitespace-no-wrap " >
                                                            <p >{item.description}</p>

                                                        </p>
                                                    </td>
                                                    <td className=" border-b border-gray-200 bg-white text-sm">
                                                        <p className=" tableData text-gray-900 whitespace-no-wrap " >
                                                            <p >{item.longDescription}</p>

                                                        </p>
                                                    </td>
                                                    <td className="  border-b border-gray-200 bg-white text-sm">
                                                        <p className="tableData text-gray-900 whitespace-no-wrap text-center">
                                                            <p> ₹ {item.price}</p>
                                                        </p>
                                                    </td>
                                                    <td className="  border-b border-gray-200  bg-white text-sm ">
                                                        <p className=" tableData text-gray-900 whitespace-no-wrap text-center">
                                                            <button onClick={() => { editItem(item._id) }} type='button' data-bs-toggle="modal" data-bs-target="#exampleModalCenteredScrollable2" style={{ float: "left", padding: "0.5rem 1.5rem" }} className="btn btn-outline bg-green-800
                                                hover:bg-green-600 text-white   shadow-md  hover:shadow-lg   focus:shadow-lg focus:outline-none focus:ring-0  active:shadow-lg transition duration-150 ease-in-out">Edit</button>
                                                        </p>
                                                    </td>
                                                    <EditProductModal />

                                                    {/* <EditProductModal /> */}
                                                    <td className=" border-b border-gray-200  bg-white text-sm ">
                                                        <p className="tableData text-gray-900 whitespace-no-wrap text-center">
                                                            <button style={{ float: "left", padding: "0.5rem 1.5rem" }} className="btn btn-outline btn-danger" onClick={() => { deleteItem(item._id) }}>Delete</button>

                                                        </p>
                                                    </td>
                                                </tr>
                                            )
                                        })) : <div className='circle'>
                                            <CircularProgress />
                                            <h2>Loading...</h2>
                                        </div>
                                    }

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>






        </>
    )
}













export default Products