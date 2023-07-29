import React, { useState, useContext, useEffect } from 'react'
import AdminPanel from '..'
import "../dashboard.css";
import AddUserModal from './addUserModal';
import { useDispatch, useSelector } from 'react-redux/es/exports';
import { LoginContext } from '../../components/context/ContextProvider';
import { Link, useParams } from 'react-router-dom';
import EditUserModal from './editUserModal';
import { getParticularUser, getUsers } from '../../services/adminServices';
import CircularProgress from '@mui/material/CircularProgress';
import { deleteParticularUser } from '../../services/adminServices';
import { ToastContainer } from 'react-toastify';
import { editUser } from '../../services/service';

// import EditUserModal from './editUserModal';
const Users = () => {
    const dispatch = useDispatch();
    const users = useSelector(state => state.getproductsdata.users);
    const [userInfo, setUserInfo] = useState("");
    console.log("Users data : ", users);
    const getData = () => {
        dispatch(getUsers())
    }
    const editUser = async (id) => {
        await dispatch(getParticularUser(id, setUserInfo))
    }
    const deleteUser = async (deleteData) => {
        await dispatch(deleteParticularUser(deleteData));
        getData();
    }
    useEffect(() => {
        getData();
    }, [])

    return (
        <>
            <AdminPanel />
            <div class=" mx-auto px-4 sm:px-8 ">
                <div >
                    <div class=" tableContainer -mx-4 sm:-mx-8 px-4 sm:px-8 py-1 overflow-x-auto">
                        <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                            <h2 class="text-2xl font-semibold mt-4">Users Data</h2>
                            <div className="">
                                <ToastContainer />
                                <button type="button" className="btn bg-purple-500 h-12 px-4 text-white hover:bg-purple-400 hover:text-slate-500 mt-4    inline-block  py-2.5  font-medium text-xs leading-tight uppercase rounded shadow-md  hover:shadow-lg  focus:shadow-lg focus:outline-none focus:ring-0  active:shadow-lg transition duration-150 ease-in-out" data-bs-toggle="modal" data-bs-target="#exampleModalCenteredScrollable">
                                    Add
                                </button>
                                <AddUserModal />
                            </div>
                        </div>
                        <div class="inline-block min-w-full shadow rounded-lg overflow-hidden">
                            <table class=" table min-w-full leading-normal">
                                <thead>
                                    <tr id='tableRow'>
                                        <th id='tableHead'
                                            class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                            ID
                                        </th>
                                        <th id='tableHead'
                                            class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                            Name
                                        </th>
                                        <th id='tableHead'
                                            class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                            Email
                                        </th>
                                        <th id='tableHead'
                                            class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                            Password
                                        </th>
                                        <th id='tableHead'
                                            class=" x-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                            Contact
                                        </th>
                                        <th id='tableHead '
                                            class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider ">
                                            Edit
                                        </th>
                                        <th id='tableHead '
                                            class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider ">
                                            Delete
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        users ? (users.map((user) => {
                                            return (
                                                <tr id='tableRow'>
                                                    <td class="  px-5 py-5 border-b border-gray-200 bg-white text-sm w-2/5">
                                                        <div class="flex items-center">

                                                            <div class="ml-3">
                                                                <p class="tableData text-gray-900 whitespace-no-wrap">
                                                                    <p>  {user._id}</p>
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td class=" px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                        <p class="tableData text-gray-900 whitespace-no-wrap text-center">0</p>
                                                        <p> {user.fname}</p>
                                                    </td>
                                                    <td class=" px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                        <p class="tableData text-gray-900 whitespace-no-wrap text-center">
                                                            <p> {user.email}</p>

                                                        </p>
                                                    </td>
                                                    <td class="  px-5 py-5 border-b border-gray-200 bg-white text-sm w-2/5">
                                                        <div class="flex items-center float-right">
                                                            <div class="mr-3">
                                                                <p class="tableData text-gray-900 whitespace-no-wrap text-right">
                                                                    <p> {user.password}</p>

                                                                </p>
                                                            </div>

                                                        </div>
                                                    </td>
                                                    <td class=" px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                        <p class="tableData text-gray-900 whitespace-no-wrap text-center">
                                                            <p> {user.mobile}</p>

                                                        </p>
                                                    </td>
                                                    <td class=" px-5 py-5 border-b border-gray-200  bg-white text-sm ">
                                                        <p class="tableData text-gray-900 whitespace-no-wrap text-center">
                                                            <button onClick={() => { editUser(user._id) }} type='button' data-bs-toggle="modal" data-bs-target="#exampleModalCenteredScrollable2" style={{ float: "left", padding: "0.5rem 1.5rem" }} className="btn btn-outline bg-green-800
                    hover:bg-green-600 text-white   shadow-md  hover:shadow-lg   focus:shadow-lg focus:outline-none focus:ring-0  active:shadow-lg transition duration-150 ease-in-out">Edit</button>

                                                        </p>
                                                    </td>
                                                    <EditUserModal userInfo={userInfo} />

                                                    <td class=" px-5 py-5 border-b border-gray-200  bg-white text-sm ">
                                                        <p class="tableData text-gray-900 whitespace-no-wrap text-center">
                                                            <button style={{ float: "left", padding: "0.5rem 1.5rem" }} onClick={() => { deleteUser(user._id) }} className="btn btn-outline btn-danger">Delete</button>

                                                        </p>
                                                    </td>
                                                </tr>
                                            )
                                        })) : (<div className='circle'>
                                            <CircularProgress />
                                            <h2>Loading...</h2>
                                        </div>)
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

export default Users