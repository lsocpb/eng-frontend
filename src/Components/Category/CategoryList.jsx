import React from 'react';
import {useNavigate} from 'react-router-dom';
import {
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBListGroup,
    MDBListGroupItem,
    MDBIcon,
} from 'mdb-react-ui-kit';
import {IconColors} from "../../constans/iconColorsConstans";

const CategoryList = ({allCategories}) => {
    const navigate = useNavigate();

    const handleCategoryClick = (categoryId) => {
        navigate(`/product/category/${categoryId}`);
    };

    const getIconColor = (index) => {
        const colorKeys = Object.keys(IconColors);
        return IconColors[colorKeys[index % colorKeys.length]];
    };

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