import React, { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBListGroup,
    MDBListGroupItem,
    MDBIcon,
} from 'mdb-react-ui-kit';
import { IconColors } from "../../constans/iconColorsConstans";

/**
 * CategoryList component to display a list of categories.
 * @component
 * @param {Object} props
 * @param {Array} props.allCategories - The list of all categories
 * @returns {JSX.Element} The CategoryList component
 */
const CategoryList = ({ allCategories }) => {
    const navigate = useNavigate();
    const listItemRefs = useRef([]);

    useEffect(() => {
        listItemRefs.current = listItemRefs.current.slice(0, allCategories.length);
    }, [allCategories]);

    const handleCategoryClick = (categoryId) => {
        navigate(`/product/category/${categoryId}`);
    };

    const getIconColor = (index) => {
        const colorKeys = Object.keys(IconColors);
        return IconColors[colorKeys[index % colorKeys.length]];
    };

    const handleKeyDown = (event, index, categoryId) => {
        if (event.key === 'Enter') {
            handleCategoryClick(categoryId);
        } else if (event.key === 'ArrowDown' && index < allCategories.length - 1) {
            event.preventDefault();
            listItemRefs.current[index + 1].focus();
        } else if (event.key === 'ArrowUp' && index > 0) {
            event.preventDefault();
            listItemRefs.current[index - 1].focus();
        }
    };

    return (
        <MDBCard className="h-auto shadow-5-strong">
            <MDBCardBody>
                <MDBCardTitle className="text-center mb-4">Looking for a product?</MDBCardTitle>
                <MDBListGroup flush="true">
                    {allCategories.map((category, index) => (
                        <MDBListGroupItem
                            key={index}
                            className="d-flex align-items-center border-0 py-3 hover-shadow"
                            style={{ transition: 'all 0.3s', cursor: 'pointer' }}
                            onClick={() => handleCategoryClick(category.id)}
                            onKeyDown={(e) => handleKeyDown(e, index, category.id)}
                            tabIndex={0}
                            role="button"
                            ref={el => listItemRefs.current[index] = el}
                            aria-label={`View products in category ${category.name}`}
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
                                aria-hidden="true"
                            />
                            <span className="fw-bold flex-grow-1">{category.name}</span>
                            <MDBIcon
                                icon="angle-right"
                                className="ms-auto"
                                style={{ color: '#6c757d' }}
                                aria-hidden="true"
                            />
                        </MDBListGroupItem>
                    ))}
                </MDBListGroup>
            </MDBCardBody>
        </MDBCard>
    );
};

export default CategoryList;