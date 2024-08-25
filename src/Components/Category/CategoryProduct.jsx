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
import useFetchProducts from "../../hooks/useFetchProducts";
import ProductCardCategoryView from "../ProductComponent/ProductCardCategoryView";
import CountdownTimer from "../CountdownTimer/CountdownTimer";

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

    if (loadingCategory) {
        return <LoadingSpinner/>;
    }

    const handleProductClick = (productId) => {
        navigate(`/product/${productId}/category/${categoryId}`);
    }

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
                            {error ? (
                                <p className="text-center">No products found in this category.</p>
                            ) : filteredProducts.length > 0 ? (
                                <MDBRow>
                                    {filteredProducts.map((product) => (
                                        <ProductCardCategoryView
                                            key={product.id}
                                            product={product}
                                            onClick={handleProductClick}
                                            CountdownTimer={CountdownTimer}
                                        />
                                    ))}
                                </MDBRow>
                            ) : (
                                <p className="text-center">No products found in this category.</p>
                            )}
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