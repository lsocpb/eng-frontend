import React, {useState, useEffect, useCallback} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import axios from 'axios';
import {
    MDBContainer,
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBSpinner,
    MDBBadge, MDBCardText, MDBRow, MDBCol
} from 'mdb-react-ui-kit';
import Countdown from 'react-countdown';
import FilterSidebar from "./FilterSidebar";
import CategoryList from "./CategoryList";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import {countdownStyles} from "../Utils/countdownStyles";
import useCategories from "../../hooks/useCategories";

export default function CategoryPage() {
    const [products, setProducts] = useState([]);
    const [categoryName, setCategoryName] = useState('');
    const [productId, setProductId] = useState(0);
    const [loading, setLoading] = useState(true);
    const {categoryId} = useParams();
    const [allCategories, loadingCategory] = useCategories();
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [filters, setFilters] = useState({
        price: 5000,
        status: {
            active: false,
            inactive: false
        }
    });


    if (loadingCategory) {
        return <LoadingSpinner/>;
    }

    const handleProductClick = (productId) => {
        navigate(`/product/${productId}/category/${categoryId}`);
    }

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