import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBListGroup,
    MDBListGroupItem,
    MDBIcon,
    MDBSpinner
} from 'mdb-react-ui-kit';

const CategoryList = () => {
    const [allCategories, setAllCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const retrieveAllCategory = useCallback(async () => {
        console.log("retrieveAllCategory called");
        const cachedCategories = localStorage.getItem('allCategories');
        const cacheTimestamp = localStorage.getItem('categoriesCacheTimestamp');
        const now = new Date().getTime();

        if (cachedCategories && cacheTimestamp && now - parseInt(cacheTimestamp) < 24 * 60 * 60 * 1000) {
            console.log("Returning cached categories");
            return JSON.parse(cachedCategories);
        }

        console.log("Fetching categories from API");
        try {
            const response = await axios.get("http://localhost:8000/category/fetch/all");
            console.log("API response:", response.data);
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
        console.log("useEffect triggered");
        const getAllCategory = async () => {
            console.log("getAllCategory function called");
            try {
                setLoading(true);
                const categories = await retrieveAllCategory();
                console.log("Categories retrieved:", categories);
                if (Array.isArray(categories)) {
                    setAllCategories(categories);
                } else if (categories && categories.categories) {
                    setAllCategories(categories.categories);
                } else {
                    console.error("Invalid response format from API");
                    setAllCategories([]);
                }
            } catch (error) {
                console.error("Error in getAllCategory:", error);
                setAllCategories([]);
            } finally {
                setLoading(false);
                console.log("Categories fetch completed, loading set to false");
            }
        };
        getAllCategory();
    }, [retrieveAllCategory]);

    const handleCategoryClick = (categoryId) => {
        navigate(`/product/category/${categoryId}`);
    };

    const getIconColor = (index) => {
        const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F06292', '#AED581', '#FFD54F'];
        return colors[index % colors.length];
    };

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{height: '200px'}}>
                <MDBSpinner role='status'>
                    <span className='visually-hidden'>Loading...</span>
                </MDBSpinner>
            </div>
        );
    }

    return (
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
    );
};

export default CategoryList;