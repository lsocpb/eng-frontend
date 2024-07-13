import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBCardTitle,
    MDBCardText,
    MDBBadge,
    MDBCarousel,
    MDBCarouselItem,
    MDBSpinner,
    MDBBtn,
    MDBIcon,
    MDBProgress,
    MDBProgressBar
} from 'mdb-react-ui-kit';
import axios from 'axios';

const ProductPage = () => {
    const {productId, categoryId} = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/product/get?product_id=${productId}`);
                setProduct(response.data.product);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching product:', err);
                setError(`Failed to fetch product data: ${err.message}`);
                setLoading(false);
            }
        };

        fetchProduct();
    }, [productId]);

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

    if (error) {
        return <MDBContainer className="text-center mt-5"><h2 className="text-danger">{error}</h2></MDBContainer>;
    }

    if (!product) {
        return <MDBContainer className="text-center mt-5"><h2 className="text-warning">Product not found</h2>
        </MDBContainer>;
    }

    const imageStyle = {
        width: '100%',
        height: '800px',
        objectFit: 'cover',
        objectPosition: 'center',
        transition: 'opacity 0.5s ease-in-out'
    };

    return (
        <MDBContainer fluid className="my-5 px-5">
            <MDBRow>
                <MDBCol md='8'>
                    <MDBCard className="shadow-6-strong mb-4">
                        <MDBCardBody>
                            <MDBCarousel showControls showIndicators fade>
                                {[product.image_url_1, product.image_url_2, product.image_url_3].filter(Boolean).map((url, index) => (
                                    <MDBCarouselItem key={index} itemId={index + 1}>
                                        <img src={url} alt={`Product image ${index + 1}`} style={imageStyle}/>
                                    </MDBCarouselItem>
                                ))}
                            </MDBCarousel>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>

                <MDBCol md='4'>
                    <MDBCard className="shadow-6-strong mb-4">
                        <MDBCardBody>
                            <MDBCardTitle className="h2 mb-3">{product.name}</MDBCardTitle>
                            <MDBCardText className="h5 mb-4">
                                Quantity: <span style={{
                                backgroundColor: '#f8f9fa',
                                padding: '0.25rem 0.5rem',
                                borderRadius: '0.5rem',
                                color: '#495057',
                                fontWeight: 'bold'
                            }}>{product.quantity}</span>
                            </MDBCardText>
                            <MDBCardText className="h2 mb-4">
                                ${parseFloat(product.price).toFixed(2)}
                            </MDBCardText>
                            <MDBCardText>
                                <strong>Status:</strong> <MDBBadge rounder pill color='secondary'
                                                                   className="ms-2 mb-2">{product.status}</MDBBadge>
                            </MDBCardText>
                            <div className="mt-4 d-flex flex-column">
                                <MDBBtn rounded pill color='danger' className='mb-2 w-auto'>
                                    <MDBIcon fas icon="heart" className="me-2"/> Support This Cause
                                </MDBBtn>
                                <MDBBtn rounded pill className='mb-2 w-auto btn-outline-danger'>
                                    <MDBIcon fas icon="heart" className="me-2"/> Share on socials!
                                </MDBBtn>
                            </div>
                            <MDBCardText className="text-center text-muted mt-2">
                                <MDBIcon fas icon="info-circle" className="me-2"/>
                                Your support makes a difference!
                            </MDBCardText>
                        </MDBCardBody>
                    </MDBCard>

                    <MDBCard className="shadow-6-strong bg-light">
                        <MDBCardBody className="d-flex flex-column align-items-center">
                            <MDBCardText>
                                <h2 className="text-center mb-3">Champion Seller</h2>
                            </MDBCardText>
                            <MDBCardImage
                                src={product.seller.profile_image_url}
                                alt="Champion Profile Picture"
                                className="rounded-circle mb-3 border border-danger"
                                style={{width: '120px', height: '120px', objectFit: 'cover'}}
                            />
                            <MDBCardText className="text-center mb-3">
                                <strong className="h4 text-danger">{product.seller.username}</strong>
                            </MDBCardText>
                            <MDBCardText className="text-center text-muted mb-3">
                                Supporting this cause since
                            </MDBCardText>
                            <MDBBtn color="danger" className="rounded-pill">
                                <MDBIcon fas icon="heart" className="me-2"/> Support This Champion
                            </MDBBtn>
                            <MDBCardText className="text-center mt-3 small">
                                <MDBIcon fas icon="star" className="text-warning me-2"/>
                                verified seller
                            </MDBCardText>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
            </MDBRow>

            <MDBRow className="mt-2">
                <MDBCol md='8'>
                    <MDBCard className="shadow-6-strong">
                        <MDBCardBody>
                            <MDBCardText className="h2">About</MDBCardText>
                            <MDBCardText className="lead">{product.description}</MDBCardText>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    );
};

export default ProductPage;