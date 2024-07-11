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
            <MDBCard className="shadow-5-strong" style={{backgroundColor: '#FBF4F5'}}>
                <MDBRow className='g-0'>
                    <MDBCol md='6'>
                        <MDBCarousel showControls showIndicators fade>
                            {[product.image_url_1, product.image_url_2, product.image_url_3].filter(Boolean).map((url, index) => (
                                <MDBCarouselItem key={index} itemId={index + 1}>
                                    <img src={url} alt={`Product image ${index + 1}`} style={imageStyle}/>
                                </MDBCarouselItem>
                            ))}
                        </MDBCarousel>
                    </MDBCol>
                    <MDBCol md='6'>
                        <MDBCardBody>
                            <MDBCardTitle className="h2 mb-4 text-danger">{product.name}</MDBCardTitle>
                            <MDBCardText className="lead mb-4">{product.description}</MDBCardText>
                            <MDBCardText className="h4 text-danger mb-4">
                                <strong>Price:</strong> ${product.price.toFixed(2)}
                            </MDBCardText>
                            <MDBCardText>
                                <strong>Status:</strong> <MDBBadge color='warning'
                                                                   className="ms-2">{product.status}</MDBBadge>
                            </MDBCardText>
                            <MDBCardText>
                                <strong>Quantity:</strong> {product.quantity}
                            </MDBCardText>
                            <MDBCardText>
                                <strong>Category:</strong> {product.category_id}
                            </MDBCardText>
                            {product.end_date && (
                                <MDBCardText>
                                    <strong>Campaign Ends:</strong> {new Date(product.end_date).toLocaleDateString()}
                                </MDBCardText>
                            )}
                            <MDBCardText>
                                <strong>Seller ID:</strong> {product.seller_id}
                            </MDBCardText>
                            {product.buyer_id && (
                                <MDBCardText>
                                    <strong>Supported by:</strong> {product.buyer_id}
                                </MDBCardText>
                            )}
                            <MDBCardText className="small text-muted">
                                Product ID: {product.id}
                            </MDBCardText>

                            <MDBBtn color='danger' className='mb-2 w-100'>
                                <MDBIcon fas icon="heart" className="me-2"/> Support This Cause
                            </MDBBtn>
                            <MDBBtn color='warning' className='mb-2 w-100'>
                                <MDBIcon fas icon="heart" className="me-2"/> Share on socials!
                            </MDBBtn>

                            <MDBCardText className="text-center text-muted">
                                <MDBIcon fas icon="info-circle" className="me-2"/>
                                Your support makes a difference!
                            </MDBCardText>
                        </MDBCardBody>
                    </MDBCol>
                </MDBRow>
            </MDBCard>
        </MDBContainer>
    );
};

export default ProductPage;