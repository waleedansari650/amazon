import { Divider } from '@mui/material';
import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom';
import { LoginContext } from '../context/ContextProvider';
import Avatar from '@mui/material/Avatar';
import LogoutIcon from '@mui/icons-material/Logout';

import './rightheader.css'
const Rightheader = ({ logClose, logoutUser }) => {
    const { account, setAccount } = useContext(LoginContext);
    return (
        <>
            <div className="rightheader">
                <div className="right_nav">
                    {
                        account ? <Avatar alt="Travis Howard" className='avtar2' >{account.fname[0].toUpperCase()}</Avatar> : <Avatar alt="Travis Howard" className='avtar' ></Avatar>
                    }
                    {account ? <h3>Hello {account.fname.toUpperCase()}</h3> : ""}
                </div>
                <div className="nav_btn" onClick={() => { logClose() }}>
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/">Shop By Category</NavLink>
                    <Divider style={{ width: "100%", marginLeft: "-20px" }} />
                    <NavLink to="/">today's Deal</NavLink>
                    {
                        account ? <NavLink to="/buy">Your orders</NavLink> : <NavLink to="/logins">Your orders</NavLink>
                    }

                    <Divider style={{ width: "100%", marginLeft: "-20px" }} />
                    {/* <div className="flag">
                        <NavLink to="/">Settings</NavLink>
                        <img src="" alt="" />
                    </div> */}
                    {
                        account ? <div className="flag">
                            <LogoutIcon style={{ fontSize: 18, marginRight: 4 }} />
                            <h3 onClick={() => { logoutUser() }} style={{ cursor: "pointer", fontWeight: 500 }}>Logout</h3>
                        </div> : <NavLink to="/login">Sign In</NavLink>
                    }
                </div>
            </div>
        </>
    )
}

export default Rightheader