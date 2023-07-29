import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux/es/exports';
import AdminPanel from '..'
import "../dashboard.css";
import { ToastContainer } from 'react-toastify';
import { deleteDelieverOrder, getdelieverProducts } from '../../services/adminServices';
const OrderDelievered = () => {
    const dispatch = useDispatch();
    const getData = () => {
        dispatch(getdelieverProducts())
    }
    const formatter = new Intl.DateTimeFormat("en-GB", {
        year: "numeric",
        month: "long",
        day: "2-digit"
    });
    const delDelieverOrder = (id) => {
        dispatch(deleteDelieverOrder(id))
        setTimeout(() => {
            dispatch(getdelieverProducts())
        }, 1000)
    }
    useEffect(() => {
        getData()
    }, [])
    const orderDelievered = useSelector(state => state.getproductsdata.dispatchOrders);
    return (
        <>
            <AdminPanel />
            <div className=" mx-auto px-4 sm:px-8 ">
                <div className="">

                    <div className="tableContainer -mx-4 sm:-mx-8 px-4 sm:px-8 py-1 overflow-x-auto">
                        <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                            <h2 className="text-2xl font-semibold mt-4">Order Delievered</h2>
                        </div>
                        <ToastContainer />

                        <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                            <table className=" table min-w-full leading-normal">
                                <thead>
                                    <tr id='tableRow'>
                                        <th id='tableHead'
                                            className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                            Order ID
                                        </th>
                                        <th id='tableHead'
                                            className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                            Name
                                        </th>
                                        <th id='tableHead'
                                            className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                            Address
                                        </th>

                                        <th id='tableHead'
                                            className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                            Contact Nm
                                        </th>

                                        <th id='tableHead'
                                            className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                            Orders
                                        </th>
                                        <th id='tableHead'
                                            className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                            Products Name
                                        </th>
                                        <th id='tableHead'
                                            className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                            description
                                        </th>
                                        <th id='tableHead'
                                            className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                            Total Amount
                                        </th>
                                        <th id='tableHead'
                                            className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                            Order Post
                                        </th>
                                        <th id='tableHead'
                                            className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                            Order Delieverd
                                        </th>
                                        <th id='tableHead '
                                            className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider ">
                                            Delete
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        orderDelievered ? (orderDelievered.map((order) => {
                                            return (
                                                <tr id='tableRow'>
                                                    <td className=" px-5 py-5 border-b border-gray-200 bg-white text-sm w-2/5">
                                                        <div className="flex items-center">

                                                            <div className="ml-3">
                                                                <p className="tableData text-gray-900 whitespace-no-wrap">
                                                                    <p>{order._id}</p>
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className=" px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                        <p className="tableData text-gray-900 whitespace-no-wrap text-center">
                                                            <p>{order.name}</p>
                                                        </p>
                                                    </td>
                                                    <td className=" px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                        <p className="tableData text-gray-900 whitespace-no-wrap text-center">
                                                            <p>{order.address}</p>

                                                        </p>
                                                    </td>

                                                    <td className="  px-5 py-5 border-b border-gray-200 bg-white text-sm w-2/5">
                                                        <div className="flex items-center float-right">
                                                            <div className="mr-3">
                                                                <p className="tableData text-gray-900 whitespace-no-wrap text-right">
                                                                    <p>{order.contactNumber}</p>
                                                                </p>
                                                            </div>

                                                        </div>
                                                    </td>
                                                    <td className=" px-7 py-5 border-b border-gray-200 bg-white text-sm" >
                                                        <p className="tableData text-gray-900 whitespace-no-wrap text-center" style={{ display: "flex", flexDirection: "row", flex: "1", overflowX: "scroll" }}>
                                                            {
                                                                order.orders.map((item) => {
                                                                    return (
                                                                        <>
                                                                            <img style={{ width: "6rem", height: "4rem", marginLeft: "1rem" }} src={item.image} alt="" />


                                                                        </>
                                                                    )
                                                                })
                                                            }
                                                        </p>
                                                    </td>
                                                    <td className=" px-7 py-5 border-b border-gray-200 bg-white text-sm">
                                                        <p className=" text-gray-900 whitespace-no-wrap text-center">
                                                            {
                                                                order.orders.map((item) => {
                                                                    return (
                                                                        <>
                                                                            <p style={{ marginBottom: "0.5rem" }}>{item.title}</p>
                                                                        </>
                                                                    )
                                                                })
                                                            }
                                                        </p>
                                                    </td>
                                                    <td className=" px-7 py-5 border-b border-gray-200 bg-white text-sm">
                                                        <p className="tableData text-gray-900 whitespace-no-wrap text-center" >
                                                            {
                                                                order.orders.map((item) => {
                                                                    return (
                                                                        <>
                                                                            <p style={{ marginBottom: "0.5rem", }}>{item.description}</p>
                                                                        </>
                                                                    )
                                                                })
                                                            }
                                                        </p>
                                                    </td>
                                                    <td className=" px-7 py-5 border-b border-gray-200 bg-white text-sm">
                                                        <p className="tableData text-gray-900 whitespace-no-wrap text-center">
                                                            <p>₹ {order.totalAmount}</p>
                                                        </p>
                                                    </td>
                                                    <td className=" px-7 py-5 border-b border-gray-200 bg-white text-sm">
                                                        <p className="tableData text-gray-900 whitespace-no-wrap text-center">
                                                            {formatter.format(new Date(order.orderPost))}
                                                        </p>
                                                    </td>
                                                    <td className=" px-7 py-5 border-b border-gray-200 bg-white text-sm">
                                                        <p className="tableData text-gray-900 whitespace-no-wrap text-center">
                                                            {formatter.format(new Date(order.createdAt))}
                                                        </p>
                                                    </td>
                                                    <td className=" px-5 py-5 border-b border-gray-200  bg-white text-sm ">
                                                        <p className="tableData text-gray-900 whitespace-no-wrap text-center">
                                                            <button onClick={() => { delDelieverOrder(order._id) }} style={{ float: "left", padding: "0.5rem 2rem" }} className="btn btn-outline btn-danger">Delete</button>

                                                        </p>
                                                    </td>

                                                </tr>
                                            )
                                        })) : ""
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

export default OrderDelievered