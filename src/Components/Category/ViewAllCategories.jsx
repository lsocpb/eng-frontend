import {useState, useEffect, useCallback} from "react";
import axios from "axios";
import React from "react";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import {MDBBadge, MDBBtn, MDBSpinner, MDBTable, MDBTableBody, MDBTableHead} from "mdb-react-ui-kit";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

const ViewAllCategories = () => {
    const [allCategories, setAllCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    const admin_jwtToken = sessionStorage.getItem("active-user");

    let navigate = useNavigate();

    const retrieveAllCategory = useCallback(async () => {
        const response = await axios.get(
            "http://localhost:8000/category/fetch/all"
        );
        return response.data;
    }, []);

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

    const deleteCategory = (categoryId, e) => {
        fetch(
            "http://localhost:8000/category/delete?category_id=" + categoryId,
            {
                method: "DELETE",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + admin_jwtToken,
                },
            }
        )
            .then((result) => {
                result.json().then((res) => {
                    if (res.success) {
                        setTimeout(() => {
                            window.location.reload(true);
                        }, 1000);
                    } else if (!res.success) {
                        setTimeout(() => {
                            window.location.reload(true);
                        }, 1000);
                    }
                });
            })
            .catch((error) => {
                console.error(error);
                setTimeout(() => {
                    window.location.reload(true);
                }, 1000);
            });
    };

    return (
        <div className="mt-3">
            <div
                className="card form-card"
                style={{
                    height: "45rem",
                }}
            >
                <div
                    className="card-body"
                    style={{
                        overflowY: "auto",
                    }}
                >
                    <div className="table-responsive">
                        <MDBTable>
                            <MDBTableHead className="table-bordered border-color bg-color custom-bg-text">
                                <tr>
                                    <th scope="col">Category Name</th>
                                    <th scope="col">Description</th>
                                    <th scope="col">Status</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </MDBTableHead>
                            <MDBTableBody>
                                {allCategories.map((category) => {
                                    return (
                                        <tr>
                                            <td>
                                                <div className="mt-3 d-flex align-items-center text-center">
                                                    <p>{category.name}</p>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="mt-3 d-flex align-items-center">
                                                    <p>{category.description}</p>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="mt-3 d-flex align-items-center">
                                                    <MDBBadge color="warning">{category.status}</MDBBadge>
                                                </div>
                                            </td>
                                            <td>
                                                <MDBBtn
                                                    onClick={() => deleteCategory(category.id)}
                                                    className="mt-2 btn-danger btn-sm bg-color custom-bg-text mx-n3"
                                                >
                                                    Delete
                                                </MDBBtn>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </MDBTableBody>
                        </MDBTable>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewAllCategories;
