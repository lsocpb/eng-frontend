import React, {useState, useEffect, useCallback, useMemo} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import axios from 'axios';
import {
    MDBContainer,
    MDBCard,
    MDBCardBody,
    MDBRow, MDBCol
} from 'mdb-react-ui-kit';
import FilterSidebar from "../FilterSidebar/FilterSidebar";
import CategoryList from "../CategoryList/CategoryList";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import useCategories from "../../hooks/useCategories";
import ProductCardCategoryView from "../ProductComponent/ProductCardCategoryView";
import CountdownTimer from "../CountdownTimer/CountdownTimer";
import {BASE_API_URL} from "../../api/config";
import {useScreenSize} from "../../hooks/useScreenSize";
import {WidthBreakpoints} from "../../constans/WidthBreakpoints";
import MobileCategorySidebar from "../MobileCategoryList/MobileCategoryList";

/**
 * CategoryPage component displays all products in a category.
 * @returns {JSX.Element} - The CategoryPage component
 */
export default function CategoryPage() {
    const [products, setProducts] = useState([]);
    const [categoryName, setCategoryName] = useState('');
    const [productId, setProductId] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filters, setFilters] = useState({
        price: 5000,
        status: {
            active: false,
            inactive: false
        }
    });

    const {categoryId} = useParams();
    const [allCategories, loadingCategory] = useCategories();
    const navigate = useNavigate();
    const {screenWidth} = useScreenSize();

    const fetchCategory = async () => {
        try {
            const response = await axios.get(`${BASE_API_URL}/category/id/${categoryId}`);
            setCategoryName(response.data.name);
        } catch (error) {
            setCategoryName('');
            setError('Failed to fetch category');
        }
    };

    const fetchProducts = async () => {
        try {
            const response = await axios.get(`${BASE_API_URL}/auction/category/${categoryId}`);
            setProducts(response.data.auctions);
            setProductId(response.data.id);
        } catch (error) {
            setProducts([]);
            setError('No products found in this category');
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                await Promise.all([fetchCategory(), fetchProducts()]);
            } catch (error) {
                setError('Failed to load data');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [categoryId]);

    useEffect(() => {
        console.log(filteredProducts.length);
    }, []);

    const filteredProducts = useMemo(() => {
        return products.filter(product => {
            if (product.price > filters.price) {
                return false;
            }

            if (filters.status.active && !product.isActive) {
                return false;
            }
            if (filters.status.inactive && product.isActive) {
                return false;
            }

            return true;
        });
    }, [products, filters]);

    const handleProductClick = useCallback((productId) => {
        navigate(`/auction/${productId}`);
    }, [navigate]);

    const handleFilterChange = useCallback((filterType, value, checked) => {
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
    }, []);

    if (loading) {
        return <LoadingSpinner/>;
    }

    return (
        <MDBContainer className="py-5">
            {screenWidth <= WidthBreakpoints.md && (
                <MobileCategorySidebar allCategories={allCategories}/>
            )}
            <MDBRow className="mb-4">
                <MDBCol>
                    <h4 className="text-start text-muted font-monospace">
                        category - <span className="text-danger">{categoryName}</span>
                    </h4>
                </MDBCol>
            </MDBRow>
            <MDBRow>
                <MDBCol md="3">
                    {screenWidth > WidthBreakpoints.md && (
                        <CategoryList allCategories={allCategories}/>
                    )}
                </MDBCol>
                <MDBCol md="7">
                    <MDBCard className={screenWidth > WidthBreakpoints.md ? "shadow-5-strong" : "mt-4 shadow-5-strong"}>
                        <MDBCardBody>
                            {error ? (
                                <p className="text-center text-danger">{error}</p>
                            ) : products.length === 0 ? (
                                <p className="text-center">No products found in this category.</p>
                            ) : (
                                <MDBRow>
                                    {products.map((product) => (
                                        <ProductCardCategoryView
                                            key={product.id}
                                            product={product}
                                            onClick={handleProductClick}
                                            CountdownTimer={CountdownTimer}
                                        />
                                    ))}
                                </MDBRow>
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