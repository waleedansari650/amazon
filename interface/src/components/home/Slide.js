import React, { useEffect } from 'react'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Divider } from '@mui/material';
import '../home/slide.css';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../../services/service';
const responsive = {

    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 3
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1
    }
};
const Slide = ({ title }) => {
    const dispatch = useDispatch();
    const getProduct = useSelector(state => state.getproductsdata.products);
    const getData = async () => {
        await dispatch(getProducts())
    }

    useEffect(() => {
        getData()
    }, [])
    return (
        <>
            <div className="products_section">
                <div className="products_deal">
                    <h3>{title}</h3>
                    <Link to="/viewAllProducts"><button className="view_btn">View All</button></Link>
                </div>
                <Divider />
                <Carousel
                    responsive={responsive}
                    infinite={true}
                    draggable={false}
                    swipeable={true}
                    centerMode={true}
                    autoPlay={true}
                    autoPlaySpeed={4000}
                    keyBoardControl={true}
                    showDots={false}
                    removeArrowOnDeviceType={["tablet", "mobile"]}
                    dotListClass="custom-dot-list-style"
                    itemClass="carousel-item-padding-40-px"
                    containerClass="carousel-container"
                >
                    {
                        getProduct ? (getProduct.map((e) => {
                            return (
                                <Link to={`/getproductsone/${e._id}`}>
                                    <div className="products_items">
                                        <div className="product_img">
                                            <img src={e.image} alt={e.title} />
                                        </div>


                                    </div>
                                </Link>
                            )
                        })) : <h3>NULL</h3>
                    }
                </Carousel>
            </div>

        </>
    )
}

export default Slide