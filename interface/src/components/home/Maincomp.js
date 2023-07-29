import React, { useEffect, useState } from 'react'
import Banner from './Banner'
import './home.css'
import Slide from './Slide'
import { CircularProgress, Divider } from '@mui/material';
import { getProducts } from '../../services/service';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from '../header/Navbar';
import Newnavbar from '../newnavbar/Newnavbar';
import Footer from '../footer/Footer';
const Maincomp = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([]);
    const getProduct = useSelector(state => state.getproductsdata.products);


    return (
        <>
            <Navbar />
            <Newnavbar />
            <div className="home_section">
                <div className="banner_part">
                    <Banner />
                </div>
                <div className="slide_part">
                    <div className="left_slide">
                        <Slide />
                    </div>
                    <div className="right_slide">
                        <h4>Festive latest launches</h4>
                        <img src="https://images-eu.ssl-images-amazon.com/images/G/31/img21/Wireless/Jupiter/Launches/T3/DesktopGateway_CategoryCard2x_758X608_T3._SY608_CB639883570_.jpg" alt="rightimg" />
                        <a href="#">see more</a>
                    </div>
                </div>

                <Slide />

                <div className="center_img">
                    <img src="https://m.media-amazon.com/images/G/31/AMS/IN/970X250-_desktop_banner.jpg" alt="" />
                </div>

                <Slide />
                <Slide />
            </div>
            <Footer />


            <Divider />

        </>
    )
}

export default Maincomp