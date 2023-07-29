import React, { useContext, useEffect, useState } from 'react';
import './navbar.css';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { LoginContext } from '../context/ContextProvider';
import { isUserValid, userLogout } from '../../services/service';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import Rightheader from './Rightheader';
import Menu from '@mui/material/Menu';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { ToastContainer, toast } from 'react-toastify';
import LogoutIcon from '@mui/icons-material/Logout';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
const Navbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { account, setAccount } = useContext(LoginContext);
    const [dropen, setDropen] = useState(false);

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const [text, setText] = useState("");
    const [liopen, setLiopen] = useState(true);
    const products = useSelector(state => state.getproductsdata.products);
    const userLogin = useSelector(state => state.getproductsdata.userLoginInfo);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };


    const validateUser = () => {
        dispatch(isUserValid(setAccount));

    }
    const handleLogout = async () => {
        await dispatch(userLogout(setAccount));
        navigate('/');
    }
    const handleOpen = () => {
        setDropen(true);
    }
    const handledrClose = () => {
        setDropen(false)
    }
    const getText = (items) => {
        setText(items);
        setLiopen(false);
    }
    useEffect(() => {
        validateUser();
    }, [])


    return (
        <>
            <header>
                <nav>
                    <div className="left ">
                        <IconButton className="hamburgur" onClick={handleOpen}>
                            <MenuIcon style={{ color: "#fff" }} />
                        </IconButton>
                        <Drawer open={dropen} onClose={handledrClose}>
                            <Rightheader logClose={handledrClose} logoutUser={handleLogout} />
                        </Drawer>
                        <div className="navlogo">

                            <Link to="/">  <img src='amazon_PNG25.png' className='navbar_icon' style={{ width: "100px", height: "40px", }} alt="" /> </Link>
                        </div>
                        <div className="nav_searchbaar">
                            <input placeholder="search your product" onChange={(e) => { getText(e.target.value) }} type="text" name="" id="" />
                            <div className="search_icon">
                                <SearchIcon id="search" />
                            </div>
                            {
                                text && <List className="extrasearch" hidden={liopen}>
                                    {
                                        products.filter(product => product.title.toLowerCase().includes(text.toLowerCase())).map((products) => {
                                            return (
                                                <ListItem >
                                                    <Link to={`/getproductsone/${products._id}`} onClick={() => setLiopen(true)}>
                                                        {products.title}
                                                    </Link>
                                                </ListItem>
                                            )
                                        })
                                    }
                                </List>
                            }
                        </div>
                    </div>
                    <div className="right">
                        <div className="nav_btn">
                            <Link to="/login">signin</Link>
                        </div>
                        <div className="cart_btn">
                            {
                                account ? <Link to="/buynow">
                                    <Badge badgeContent={account ? account.carts.length : ""} color="primary">
                                        <ShoppingCartIcon id="icon" />
                                    </Badge>
                                </Link> :
                                    <Link to="/login">
                                        <Badge badgeContent={0} color="primary">
                                            <ShoppingCartIcon id="icon" />
                                        </Badge>
                                    </Link>
                            }

                            <ToastContainer />
                            <p>Cart</p>
                        </div>

                        {
                            account ? <Avatar id="basic-button"
                                aria-controls={open ? 'basic-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                                onClick={handleClick} alt="Travis Howard" className='avtar2' >{account.fname[0].toUpperCase()}</Avatar>
                                : <Avatar id="basic-button"
                                    aria-controls={open ? 'basic-menu' : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={open ? 'true' : undefined}
                                    onClick={handleClick} alt="Travis Howard" className='avtar' ></Avatar>
                        }


                        <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            style={{}}
                            open={open}
                            onClose={handleClose}
                            MenuListProps={{
                                'aria-labelledby': 'basic-button',
                            }}
                        >
                            {
                                account ? <Link to="/myProfile"> <MenuItem onClick={handleClose}  ><span className="my_account">My Account</span></MenuItem></Link> : <Link style={{ textDecoration: "none" }} to="/login"><MenuItem onClick={handleClose} > <span className="my_account"> My account</span></MenuItem></Link>
                            }
                            {
                                userLogin && userLogin.email === "waleed@gmail.com" ? <Link to="/adminPanel"> <MenuItem onClick={handleClose}  ><span className="my_account">Admin Panel</span></MenuItem></Link> : ""
                            }
                            {account ? <span onClick={handleLogout}> <MenuItem onClick={handleClose}> <LogoutIcon style={{ fontSize: "1rem", marginRight: "3" }} /> Logout</MenuItem></span> : ""}
                        </Menu>
                    </div>
                </nav>
            </header>
        </>
    )
}

export default Navbar







