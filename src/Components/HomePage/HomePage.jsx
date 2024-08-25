import React from 'react';
import ProductCard from "../ProductComponent/ProductCard";
import Slider from "react-slick";
import {
    MDBBtn,
    MDBCard,
    MDBCardBody,
    MDBCarousel, MDBCarouselItem,
    MDBCol,
    MDBContainer, MDBIcon,
    MDBListGroup, MDBListGroupItem,
    MDBRow,
} from "mdb-react-ui-kit";
import {useNavigate} from "react-router-dom";
import CategoryList from "../Category/CategoryList";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import {settings} from "../Utils/homePageSliderSettings";
import useCategories from "../../hooks/useCategories";
import useFetchProducts from "../../hooks/useFetchProducts";

export default function HomePage() {
    const [allCategories, loadingCategories] = useCategories();
    const [products, loadingProducts] = useFetchProducts();

    const navigate = useNavigate()


    if (loadingCategories || loadingProducts) {
        return <LoadingSpinner/>;
    }

    const handleViewAllAuctions = () => {
        navigate('/product/category/1')
    }

    const handleContactClick = () => {
        navigate('/contact')
    }

    return (
        <MDBContainer>
            <MDBContainer fluid className="py-5">
                <MDBRow>
                    <MDBCol md="3">
                        <CategoryList allCategories={allCategories} />
                    </MDBCol>
                    <MDBCol md="6">
                        <MDBCard className="h-100 shadow-5-strong">
                            <MDBCardBody>
                                <div className="bg-white text-black py-5 px-4 text-center">
                                    <h1 className="text-danger display-4 font-weight-bold mb-4">Join Us in Making a
                                        Difference</h1>
                                    <p className="lead mb-4">Explore unique items and experiences while supporting a
                                        great cause.</p>
                                    <button className="btn btn-danger btn-lg rounded-pill mb-4">Start Bidding</button>

                                    <MDBCarousel showControls showIndicators fade className="mb-4">
                                        <MDBCarouselItem itemId={1}>
                                            <img className="img-fluid d-block mx-auto rounded-lg shadow"
                                                 src={process.env.PUBLIC_URL + '/output1.png'}
                                                 alt="Charity Bidding Platform"/>
                                        </MDBCarouselItem>
                                        <MDBCarouselItem itemId={2}>
                                            <img className="img-fluid d-block mx-auto rounded-lg shadow"
                                                 src={process.env.PUBLIC_URL + '/output2.png'}
                                                 alt="Charity Bidding Platform"/>
                                        </MDBCarouselItem>
                                    </MDBCarousel>

                                    <div className="row mt-5">
                                        <div className="col-md-4 mb-3">
                                            <i className="fas fa-heart fa-3x text-danger mb-3"></i>
                                            <h4>Support</h4>
                                            <p>Your bids directly impact lives and communities in need.</p>
                                        </div>
                                        <div className="col-md-4 mb-3">
                                            <i className="fas fa-gift fa-3x text-danger mb-3"></i>
                                            <h4>Unique</h4>
                                            <p>Bid on one-of-a-kind items and unforgettable experiences.</p>
                                        </div>
                                        <div className="col-md-4 mb-3">
                                            <i className="fas fa-users fa-3x text-danger mb-3"></i>
                                            <h4>Community</h4>
                                            <p>Connect with like-minded individuals passionate about giving back.</p>
                                        </div>
                                    </div>
                                    <p className="font-weight-bold text-danger">100% of proceeds go directly to our
                                        partner
                                        charities.</p>
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
                                            <MDBBtn color="danger" className="rounded-pill" onClick={handleContactClick}>
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
                            <MDBCardBody className="bg-light rounded-lg shadow-sm p-4">
                                <h2 className="font-weight-bold mb-4 text-center text-danger">
                                    <MDBIcon fas icon="heart" className="me-2"/>
                                    Last Auctions
                                </h2>
                                <p className="text-center text-muted mb-4">
                                    Bid on unique items and experiences to support wonderful causes!
                                </p>
                                <div className="slider-container mb-4">
                                    <Slider {...settings}>
                                        {products.map((product, index) => (
                                            <div key={index} className="px-3 py-1">
                                                <ProductCard item={product}/>
                                            </div>
                                        ))}
                                    </Slider>
                                </div>
                                <div className="text-center">
                                    <MDBBtn color="danger" className="rounded-pill px-4 py-2" onClick={handleViewAllAuctions}>
                                        <MDBIcon fas icon="gavel" className="me-2"/>
                                        View All Auctions
                                    </MDBBtn>
                                </div>
                                <div className="mt-4 text-center">
                                    <small className="text-muted">
                                        100% of proceeds go directly to our partner charities
                                    </small>
                                </div>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </MDBContainer>
    );
}
