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
import Countdown from 'react-countdown';
import FilterSidebar from "./FilterSidebar";
import CategoryList from "./CategoryList";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

export default function CategoryPage() {
    const [products, setProducts] = useState([]);
    const [categoryName, setCategoryName] = useState('');
    const [productId, setProductId] = useState(0);
    const [loading, setLoading] = useState(true);
    const {categoryId} = useParams();
    const [allCategories, setAllCategories] = useState([]);
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [filters, setFilters] = useState({
        price: 5000,
        status: {
            active: false,
            inactive: false
        }
    });

    const retrieveAllCategory = useCallback(async () => {
        const cachedCategories = localStorage.getItem('allCategories');
        const cacheTimestamp = localStorage.getItem('categoriesCacheTimestamp');
        const now = new Date().getTime();

        if (cachedCategories && cacheTimestamp && now - parseInt(cacheTimestamp) < 24 * 60 * 60 * 1000) {
            return JSON.parse(cachedCategories);
        }

        try {
            const response = await axios.get("http://localhost:8000/category/fetch/all");
            const categories = response.data;

            localStorage.setItem('allCategories', JSON.stringify(categories));
            localStorage.setItem('categoriesCacheTimestamp', now.toString());

            return categories;
        } catch (error) {
            console.error("Error fetching categories:", error);
            return [];
        }
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
            }
        };
        getAllCategory();
    }, [retrieveAllCategory]);

    if (loading) {
        <LoadingSpinner/>
    }

    const handleCategoryClick = (categoryId) => {
        navigate(`/product/category/${categoryId}`);
    };

    const handleProductClick = (productId) => {
        navigate(`/product/${productId}/category/${categoryId}`);
    }

    const countdownStyles = {
        container: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#f8f9fa',
            borderRadius: '8px',
            padding: '10px',
            marginTop: '10px',
        },
        timeUnit: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            margin: '0 8px',
        },
        number: {
            fontSize: '1.2rem',
            fontWeight: 'bold',
            color: '#dc3545',
        },
        label: {
            fontSize: '0.8rem',
            color: '#6c757d',
            textTransform: 'uppercase',
        },
    };

    const renderer = ({days, hours, minutes, seconds, completed}) => {
        if (completed) {
            return <span style={{color: '#dc3545', fontWeight: 'bold'}}>Auction ended</span>;
        } else {
            return (
                <div style={countdownStyles.container}>
                    <div style={countdownStyles.timeUnit}>
                        <span style={countdownStyles.number}>{days}</span>
                        <span style={countdownStyles.label}>days</span>
                    </div>
                    <div style={countdownStyles.timeUnit}>
                        <span style={countdownStyles.number}>{hours}</span>
                        <span style={countdownStyles.label}>hours</span>
                    </div>
                    <div style={countdownStyles.timeUnit}>
                        <span style={countdownStyles.number}>{minutes}</span>
                        <span style={countdownStyles.label}>min</span>
                    </div>
                    <div style={countdownStyles.timeUnit}>
                        <span style={countdownStyles.number}>{seconds}</span>
                        <span style={countdownStyles.label}>sec</span>
                    </div>
                </div>
            );
        }
    };

    const handleFilterChange = (filterType, value, checked) => {
        setFilters(prevFilters => {
            if (filterType === 'status') {
                return {
                    ...prevFilters,
                    status: {
                        ...prevFilters.status,
                        [value]: checked
                    }
                };
            }
            return {
                ...prevFilters,
                [filterType]: filterType === 'price' ? parseFloat(value) : value
            };
        });
    };

    const filteredProducts = products.filter(product => {
        return (
            parseFloat(product.price) <= parseFloat(filters.price) &&
            ((!filters.status.active && !filters.status.inactive) ||
                (filters.status.active && product.status === 'active') ||
                (filters.status.inactive && product.status === 'inactive'))
        );
    });


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
                    <CategoryList allCategories={allCategories} />
                </MDBCol>
                <MDBCol md="7">
                    <MDBCard className="shadow-5-strong">
                        <MDBCardBody>
                            {loading ? (
                                <MDBSpinner role='status'>
                                    <span className='visually-hidden'>Loading...</span>
                                </MDBSpinner>
                            ) : error ? (
                                <p className="text-center">No products found in this category.</p>
                            ) : filteredProducts.length > 0 ? (
                                <MDBRow>
                                    {filteredProducts.map((product) => (
                                        <MDBCol key={product.id} size="12" className="mb-4">
                                            <hr></hr>
                                            <MDBCard onClick={() => handleProductClick(product.id)}
                                                     className="hover-shadow">
                                                <MDBRow className="g-0">
                                                    <MDBCol xs="12" md="4" className="d-flex align-items-stretch">
                                                        <div className="w-100 position-relative"
                                                             style={{minHeight: '200px'}}>
                                                            <img
                                                                src={product.image_url_1}
                                                                alt={product.name}
                                                                className="img-fluid rounded-start"
                                                                style={{
                                                                    position: 'absolute',
                                                                    top: 0,
                                                                    left: 0,
                                                                    width: '100%',
                                                                    height: '100%',
                                                                    objectFit: 'fill'
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
                                                                <small className="text-muted">
                                                                    Ends in: <Countdown
                                                                    date={new Date(product.end_date)}
                                                                    renderer={renderer}/>
                                                                </small>
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
                <MDBCol md="2">
                    <FilterSidebar onFilterChange={handleFilterChange}/>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    );
}