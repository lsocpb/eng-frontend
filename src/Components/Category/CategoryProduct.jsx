import React, {useState, useEffect, useCallback} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import axios, {all} from 'axios';
import {
    MDBContainer,
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBTable,
    MDBTableHead,
    MDBTableBody,
    MDBSpinner,
    MDBBadge, MDBCardText, MDBRow, MDBCol, MDBCardImage, MDBListGroup, MDBListGroupItem, MDBIcon
} from 'mdb-react-ui-kit';

export default function CategoryPage() {
    const [products, setProducts] = useState([]);
    const [categoryName, setCategoryName] = useState('');
    const [productId, setProductId] = useState(0);
    const [loading, setLoading] = useState(true);
    const {categoryId} = useParams();
    const [allCategories, setAllCategories] = useState([]);
    const navigate = useNavigate();
    const [error, setError] = useState(null);

    const retrieveAllCategory = useCallback(async () => {
        const response = await axios.get(
            "http://localhost:8000/category/fetch/all"
        );
        console.log(response.data);
        return response.data;
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                const categoryResponse = await axios.get(`http://localhost:8000/category/${categoryId}`);
                setCategoryName(categoryResponse.data.name);

                const productsResponse = await axios.get(`http://localhost:8000/product/by-category/${categoryId}`);
                setProducts(productsResponse.data.products);
                setProductId(productsResponse.data.id);
            } catch (error) {
                console.error('Error fetching data:', error);
                setError('Failed to load data');
                setProducts([]);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [categoryId]);

    const getIconColor = (index) => {
        const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F06292', '#AED581', '#FFD54F'];
        return colors[index % colors.length];
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

    const handleCategoryClick = (categoryId) => {
        navigate(`/product/category/${categoryId}`);
    };

    const handleProductClick = (productId) => {
        navigate(`/product/${productId}/category/${categoryId}`);
    }

    return (
        <MDBContainer className="py-5">
            <MDBRow className="mb-4">
                <MDBCol>
                    <h4 className="text-start text-muted font-monospace">
                        category - <span className="text-danger">{categoryName}</span>
                    </h4>
                </MDBCol>
            </MDBRow>
            <MDBRow>
                <MDBCol md="3">
                    <MDBCard className="h-auto shadow-5-strong">
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
                <MDBCol md="9">
                    <MDBCard className="shadow-5-strong">
                        <MDBCardBody>
                            {loading ? (
                                <MDBSpinner role='status'>
                                    <span className='visually-hidden'>Loading...</span>
                                </MDBSpinner>
                            ) : error ? (
                                <p className="text-center">No products found in this category.</p>
                            ) : products.length > 0 ? (
                                <MDBRow>
                                    {products.map((product) => (
                                        <MDBCol key={product.id} size="12" className="mb-4">
                                            <hr></hr>
                                            <MDBCard onClick={() => handleProductClick(product.id)}
                                                     className="hover-shadow">
                                                <MDBRow className="g-0">
                                                    <MDBCol md="4" className="d-flex align-items-stretch">
                                                        <div style={{
                                                            width: '100%',
                                                            position: 'relative',
                                                            overflow: 'hidden'
                                                        }}>
                                                            <MDBCardImage
                                                                src={product.image_url_1}
                                                                alt={product.name}
                                                                className="rounded-start"
                                                                style={{
                                                                    position: 'absolute',
                                                                    top: 0,
                                                                    left: 0,
                                                                    width: '100%',
                                                                    height: '100%',
                                                                    objectFit: 'cover'
                                                                }}
                                                            />
                                                        </div>
                                                    </MDBCol>
                                                    <MDBCol md="8">
                                                        <MDBCardBody>
                                                            <MDBCardTitle>{product.name}</MDBCardTitle>
                                                            <MDBCardText>
                                                                <small
                                                                    className="text-muted">Quantity: {product.quantity}</small>
                                                            </MDBCardText>
                                                            <MDBCardText>
                                                                <small className="text-muted">End
                                                                    Date: {new Date(product.end_date).toLocaleString()}</small>
                                                            </MDBCardText>
                                                            <MDBCardText>
                                                                <h2 className="text-dark">
                                                                    ${parseFloat(product.price).toFixed(2)}</h2>
                                                            </MDBCardText>
                                                            <MDBBadge
                                                                color={product.status === 'active' ? 'success' : 'warning'}
                                                                pill className="align-items-end">
                                                                {product.status}
                                                            </MDBBadge>
                                                        </MDBCardBody>
                                                    </MDBCol>
                                                </MDBRow>
                                            </MDBCard>
                                        </MDBCol>
                                    ))}
                                </MDBRow>
                            ) : (
                                <p className="text-center">No products found in this category.</p>
                            )
                            }
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    );
}