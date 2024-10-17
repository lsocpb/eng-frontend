import React, {useState, useEffect, useCallback} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import axios from 'axios';
import {
    MDBContainer,
    MDBCard,
    MDBCardBody,
    MDBRow, MDBCol
} from 'mdb-react-ui-kit';
import FilterSidebar from "./FilterSidebar";
import CategoryList from "./CategoryList";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import useCategories from "../../hooks/useCategories";
import ProductCardCategoryView from "../ProductComponent/ProductCardCategoryView";
import CountdownTimer from "../CountdownTimer/CountdownTimer";
import {BASE_API_URL} from "../../api/config";
import {useScreenSize} from "../../hooks/useScreenSize";
import {WidthBreakpoints} from "../../constans/WidthBreakpoints";
import MobileCategorySidebar from "./MobileCategoryList";

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
    const {screenWidth} = useScreenSize();

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                const [categoryResponse, productsResponse] = await Promise.all([
                    axios.get(`${BASE_API_URL}/category/${categoryId}`),
                    axios.get(`${BASE_API_URL}/auction/category/${categoryId}`)
                ]);
                setCategoryName(categoryResponse.data.name);
                setProducts(productsResponse.data.auctions);
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

    if (loading) {
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