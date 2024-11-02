import React, {useState, useEffect, useCallback, useMemo} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import axios from 'axios';
import {
    MDBContainer,
    MDBCard,
    MDBCardBody,
    MDBRow,
    MDBCol,
    MDBPagination,
    MDBPaginationItem,
    MDBPaginationLink
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

const ITEMS_PER_PAGE = 10;

export default function CategoryPage() {
    const [products, setProducts] = useState([]);
    const [categoryName, setCategoryName] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
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
            setProducts(response.data.auctions || []);
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

    const filteredProducts = useMemo(() => {
        return products.filter(product => {
            // Price filter
            if (product.price > filters.price) {
                return false;
            }

            // Status filter
            if (filters.status.active && product.is_auction_finished) {
                return false;
            }
            if (filters.status.inactive && !product.is_auction_finished) {
                return false;
            }

            return true;
        });
    }, [products, filters]);

    const paginatedProducts = useMemo(() => {
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        const endIndex = startIndex + ITEMS_PER_PAGE;
        return filteredProducts.slice(startIndex, endIndex);  // Now using filteredProducts
    }, [filteredProducts, currentPage]);  // Updated dependencies

    const totalPages = useMemo(() => {
        return Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
    }, [filteredProducts]);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        window.scrollTo(0, 0);
    };

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
        setCurrentPage(1);  // Reset to first page when filters change
    }, []);

    const renderPagination = () => {
        if (totalPages <= 1) return null;

        return (
            <MDBPagination className="mb-0 justify-content-center">
                <MDBPaginationItem disabled={currentPage === 1}>
                    <MDBPaginationLink onClick={() => handlePageChange(currentPage - 1)}>
                        Previous
                    </MDBPaginationLink>
                </MDBPaginationItem>

                {[...Array(totalPages)].map((_, index) => (
                    <MDBPaginationItem key={index + 1} active={currentPage === index + 1}>
                        <MDBPaginationLink onClick={() => handlePageChange(index + 1)}>
                            {index + 1}
                        </MDBPaginationLink>
                    </MDBPaginationItem>
                ))}

                <MDBPaginationItem disabled={currentPage === totalPages}>
                    <MDBPaginationLink onClick={() => handlePageChange(currentPage + 1)}>
                        Next
                    </MDBPaginationLink>
                </MDBPaginationItem>
            </MDBPagination>
        );
    };

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
                {screenWidth <= WidthBreakpoints.md && (
                    <MDBCol md="2">
                        <FilterSidebar onFilterChange={handleFilterChange}/>
                    </MDBCol>
                )}
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
                            ) : filteredProducts.length === 0 ? (
                                <p className="text-center">No products found with current filters.</p>
                            ) : (
                                <>
                                    <MDBRow>
                                        {paginatedProducts.map((product) => (
                                            <ProductCardCategoryView
                                                key={product.id}
                                                product={product}
                                                onClick={() => handleProductClick(product.id)}
                                                CountdownTimer={CountdownTimer}
                                            />
                                        ))}
                                    </MDBRow>
                                    {renderPagination()}
                                </>
                            )}
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
                {screenWidth > WidthBreakpoints.md && (
                    <MDBCol md="2">
                        <FilterSidebar onFilterChange={handleFilterChange}/>
                    </MDBCol>
                )}
            </MDBRow>
        </MDBContainer>
    );
}