import React, {useCallback, useEffect, useState} from 'react';
import ProductCard from "../ProductComponent/ProductCard";
import Slider from "react-slick";
import axios from "axios";
import {
    MDBBtn,
    MDBCard,
    MDBCardBody,
    MDBCardTitle, MDBCarousel, MDBCarouselItem,
    MDBCol,
    MDBContainer, MDBIcon,
    MDBListGroup, MDBListGroupItem, MDBModal, MDBModalBody, MDBModalFooter, MDBModalHeader,
    MDBRow,
    MDBSpinner
} from "mdb-react-ui-kit";
import {useNavigate} from "react-router-dom";

export default function Widget() {
    const [products, setProducts] = useState([]);
    const [allCategories, setAllCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    const retrieveAllCategory = useCallback(async () => {
        const response = await axios.get(
            "http://localhost:8000/category/fetch/all"
        );
        console.log(response.data);
        return response.data;
    }, []);

    const navigate = useNavigate()
    const handleCategoryClick = async (categoryId) => {
        navigate(`/product/category/${categoryId}`)
    };

    useEffect(() => {
        const getAllCategory = async () => {
            try {
                setLoading(true);
                const allCategories = await retrieveAllCategory();
                if (Array.isArray(allCategories)) {
                    setAllCategories(allCategories);
                } else if (allCategories && allCategories.categories) {
                    setAllCategories(allCategories.categories);
                } else {
                    console.error("Invalid response format from API");
                    setAllCategories([]);
                }
            } catch (error) {
                console.error("Error fetching categories:", error);
                setAllCategories([]);
            } finally {
                setLoading(false);
                console.log("Categories fetched successfully");
            }
        };
        getAllCategory();
    }, [retrieveAllCategory]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(`http://localhost:8000/product/fetch/last`);
                const data = await response.json();
                setProducts(data.products);
            } catch (err) {
                console.error('Error fetching products:', err);
            }
        };

        fetchProducts();
    }, []);

    if (loading) {
        return (
            <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'rgba(255, 255, 255, 0.8)'
            }}>
                <MDBSpinner role='status' color='danger' style={{width: '6rem', height: '6rem'}}>
                    <span className='visually-hidden'>Loading...</span>
                </MDBSpinner>
            </div>
        );
    }

    const SampleNextArrow = (props) => {
        const {onClick} = props;
        return (
            <div className="custom-next-arrow" onClick={onClick}>
                <MDBIcon icon={"angle-right"} size="2x" className="d-flex"/>
            </div>
        );
    };

    const SamplePrevArrow = (props) => {
        const {onClick} = props;
        return (
            <div className="custom-prev-arrow" onClick={onClick}>
                <MDBIcon icon={"angle-left"} size="2x" className="d-flex"/>
            </div>
        );
    };

    var settings = {
        dots: false,
        infinite: true,
        speed: 700,
        slidesToShow: 4,
        slidesToScroll: 1,
        initialSlide: 0,
        nextArrow: <SampleNextArrow/>,
        prevArrow: <SamplePrevArrow/>,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: false
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    const getIconColor = (index) => {
        const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F06292', '#AED581', '#FFD54F'];
        return colors[index % colors.length];
    };

    return (
        <div>
            <MDBContainer fluid className="py-5">
                <MDBRow>
                    <MDBCol md="3">
                        <MDBCard className="h-100 shadow-5-strong">
                            <MDBCardBody>
                                <MDBCardTitle className="text-center mb-4">Looking for a product?</MDBCardTitle>
                                <MDBListGroup flush>
                                    {allCategories.map((category, index) => (
                                        <MDBListGroupItem
                                            key={index}
                                            className="d-flex align-items-center border-0 py-3 hover-shadow"
                                            style={{transition: 'all 0.3s', cursor: 'pointer'}}
                                            onClick={() => handleCategoryClick(category.id)}
                                        >
                                            <MDBIcon
                                                icon={category.icon}
                                                className="me-3"
                                                size="lg"
                                                style={{
                                                    width: '30px',
                                                    color: getIconColor(index),
                                                    textAlign: 'center'
                                                }}
                                            />
                                            <span className="fw-bold flex-grow-1">{category.name}</span>
                                            <MDBIcon
                                                icon="angle-right"
                                                className="ms-auto"
                                                style={{color: '#6c757d'}}
                                            />
                                        </MDBListGroupItem>
                                    ))}
                                </MDBListGroup>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                    <MDBCol md="6">
                        <MDBCard className="h-100 shadow-5-strong">
                            <MDBCardBody>
                                <div className="bg-white text-black py-5 px-3 text-center">
                                    <h1 className="text-danger display-4 font-weight-bold mb-4">Join Us in Making a
                                        Difference</h1>
                                    <p className="lead mb-4">Explore unique items and experiences while supporting a
                                        great cause.</p>
                                    <button className="btn btn-danger btn-lg rounded-pill">Start Bidding</button>
                                    <MDBCarousel showControls showIndicators fade>
                                        <MDBCarouselItem itemId={1}>
                                            <img className="img-fluid d-block mx-auto mt-4 rounded-lg shadow"
                                                 src={process.env.PUBLIC_URL + '/output1.png'}
                                                 alt="Charity Bidding Platform"/>
                                        </MDBCarouselItem>
                                        <MDBCarouselItem itemId={2}>
                                            <img className="img-fluid d-block mx-auto mt-4 rounded-lg shadow"
                                                 src={process.env.PUBLIC_URL + '/output2.png'}
                                                 alt="Charity Bidding Platform"/>
                                        </MDBCarouselItem>
                                    </MDBCarousel>
                                </div>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                    <MDBCol md="3">
                        <MDBRow>
                            <MDBCol md="12" className="mb-4">
                                <MDBCard className="shadow-5-strong h-100">
                                    <MDBCardBody className="text-center">
                                        <MDBIcon fas icon="heart" size="3x" className="text-danger mb-3"/>
                                        <h4 className="mb-4 font-weight-bold">Welcome to Our Charity Auction!</h4>
                                        <MDBListGroup flush>
                                            <MDBListGroupItem className="border-0 d-flex align-items-center">
                                                <MDBIcon fas icon="hand-holding-heart" className="text-primary me-3"/>
                                                <div className="text-start">
                                                    <strong>Support Great Causes</strong>
                                                    <p className="mb-0 small">Bid, buy, and sell to make a
                                                        difference!</p>
                                                </div>
                                            </MDBListGroupItem>
                                            <MDBListGroupItem className="border-0 d-flex align-items-center">
                                                <MDBIcon fas icon="shield-alt" className="text-success me-3"/>
                                                <div className="text-start">
                                                    <strong>Safe & Easy Access</strong>
                                                    <p className="mb-0 small">Your security is our top priority.</p>
                                                </div>
                                            </MDBListGroupItem>
                                            <MDBListGroupItem className="border-0 d-flex align-items-center">
                                                <MDBIcon fas icon="globe" className="text-info me-3"/>
                                                <div className="text-start">
                                                    <strong>Global Community</strong>
                                                    <p className="mb-0 small">Join our worldwide network of givers!</p>
                                                </div>
                                            </MDBListGroupItem>
                                        </MDBListGroup>
                                    </MDBCardBody>
                                </MDBCard>
                            </MDBCol>
                            <MDBCol md="12">
                                <MDBCard className="shadow-5-strong h-100">
                                    <MDBCardBody className="text-center">
                                        <MDBIcon fas icon="handshake" size="3x" className="text-danger mb-3"/>
                                        <h4 className="mb-4 font-weight-bold">Become Our Partner</h4>
                                        <MDBListGroup flush>
                                            <MDBListGroupItem className="border-0 d-flex align-items-center">
                                                <MDBIcon fas icon="users" className="text-success me-3"/>
                                                <div className="text-start">
                                                    <strong>Join Our Network</strong>
                                                    <p className="mb-0 small">Collaborate with charities worldwide</p>
                                                </div>
                                            </MDBListGroupItem>
                                            <MDBListGroupItem className="border-0 d-flex align-items-center">
                                                <MDBIcon fas icon="bullhorn" className="text-warning me-3"/>
                                                <div className="text-start">
                                                    <strong>Amplify Your Impact</strong>
                                                    <p className="mb-0 small">Reach a broader audience for your
                                                        cause</p>
                                                </div>
                                            </MDBListGroupItem>
                                            <MDBListGroupItem className="border-0 d-flex align-items-center">
                                                <MDBIcon fas icon="chart-line" className="text-info me-3"/>
                                                <div className="text-start">
                                                    <strong>Grow Together</strong>
                                                    <p className="mb-0 small">Access resources to expand your
                                                        charity</p>
                                                </div>
                                            </MDBListGroupItem>
                                        </MDBListGroup>
                                        <div className="mt-4">
                                            <p className="mb-2"><strong>Ready to make a bigger difference?</strong></p>
                                            <MDBBtn color="danger" className="rounded-pill">
                                                <MDBIcon fas icon="envelope" className="me-2"/> Contact Us
                                            </MDBBtn>
                                        </div>
                                        <div className="mt-3 text-muted small">
                                            <MDBIcon fas icon="envelope" className="me-2"/> Email:
                                            partners@charfair.com
                                        </div>
                                    </MDBCardBody>
                                </MDBCard>
                            </MDBCol>
                        </MDBRow>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
            <MDBContainer fluid className="mb-4">
                <MDBRow className="justify-content-center">
                    <MDBCol md="12">
                        <MDBCard className="h-100 shadow-5-strong">
                            <MDBCardBody>
                                <h2 className="font-weight-bold mb-4 text-center">
                                    <MDBIcon fas icon="gavel" className="me-2"/>
                                    Recent Bids
                                </h2>
                                <p className="text-center text-muted mb-4">
                                    Check out the latest exciting items up for auction!
                                </p>
                                <div className="slider-container">
                                    <Slider {...settings}>
                                        {products.map((product, index) => (
                                            <div key={index} className="px-4">
                                                <ProductCard item={product}/>
                                            </div>
                                        ))}
                                    </Slider>
                                </div>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </div>
    );
}
