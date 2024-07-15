import React, {useState, useEffect} from "react";
import axios from "axios";
import {ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {useNavigate} from "react-router-dom";
import {MDBBtn, MDBInput} from "mdb-react-ui-kit";
import "./AddProductForm.css";

const AddProductForm = () => {
    const [categories, setCategories] = useState([]);

    const seller = sessionStorage.getItem("active-user");
    const seller_jwtToken = sessionStorage.getItem("active-user");

    let navigate = useNavigate();

    const retrieveAllCategories = async () => {
        const response = await axios.get(
            "http://localhost:8000/category/fetch/all"
        );
        return response.data;
    };

    useEffect(() => {
        const getAllCategories = async () => {
            const resCategory = await retrieveAllCategories();
            if (resCategory) {
                setCategories(resCategory.categories);
            }
        };

        getAllCategories();
    }, []);

    const [endDate, setEndDate] = useState("");
    const [selectedImage1, setSelectImage1] = useState(null);
    const [selectedImage2, setSelectImage2] = useState(null);
    const [selectedImage3, setSelectImage3] = useState(null);

    const [image1Name, setImage1Name] = useState("Choose image 1...");
    const [image2Name, setImage2Name] = useState("Choose image 2...");
    const [image3Name, setImage3Name] = useState("Choose image 3...");

    const [product, setProduct] = useState({
        name: "",
        description: "",
        price: "",
        quantity: "",
        category_id: "",
    });

    const handleInput = (e) => {
        const {name, value} = e.target;
        setProduct({
            ...product,
            [name]: name === 'category_id' ? parseInt(value) : value
        });
    };

    const saveProduct = async (e) => {
        e.preventDefault();
        if (!seller) {
            toast.error("Seller Id is missing!!!", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            return;
        }

        const formData = new FormData();
        formData.append("name", product.name);
        formData.append("description", product.description);
        formData.append("price", parseFloat(product.price));
        formData.append("quantity", parseInt(product.quantity));
        formData.append("category_id", product.category_id);
        formData.append("end_date", new Date(endDate).getTime());
        formData.append("image1", selectedImage1);
        formData.append("image2", selectedImage2);
        formData.append("image3", selectedImage3);

        try {
            const response = await axios.post(
                "http://localhost:8000/product/add",
                formData,
                {
                    headers: {
                        Authorization: "Bearer " + seller_jwtToken,
                    },
                }
            );
            const data = response.data;

            if (data.success) {
                toast.success("Auction Added Successfully", {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });

                setTimeout(() => {
                    navigate("/home");
                }, 2000);
            } else {
                toast.success("Auction added Successfully", {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                //setTimeout(() => {
                //    window.location.reload(true);
                //}, 2000);
            }
        } catch (error) {
            console.error(error);
            if (error.response) {
                console.error("Response data:", error.response.data);
            }
            toast.error("Error adding a product, u may missing some fields", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            setTimeout(() => {
                window.location.reload(true);
            }, 2000);
        }
    };

    const truncateFileName = (fileName, maxLength = 20) => {
        if (fileName.length <= maxLength) return fileName;
        const extension = fileName.split('.').pop();
        const nameWithoutExtension = fileName.substring(0, fileName.lastIndexOf('.'));
        const truncatedName = nameWithoutExtension.substring(0, maxLength - extension.length - 3);
        return `${truncatedName}...${extension}`;
    };

    return (
        <div className="container-fluid charity-bg">
            <div className="row justify-content-center py-5">
                <div className="col-md-8">
                    <div className="card shadow-lg border-0 rounded-lg">
                        <div className="card-header bg-danger text-white text-center py-3">
                            <h4 className="mb-0">Place an item for the bid!</h4>
                        </div>
                        <div className="card-body">
                            <form>
                                <div className="row g-3">
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="title" className="form-label text-muted">
                                            Item Name
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="title"
                                            name="name"
                                            onChange={handleInput}
                                            value={product.name}
                                            placeholder="Enter item name"
                                        />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="description" className="form-label text-muted">
                                            Item Description
                                        </label>
                                        <textarea
                                            className="form-control"
                                            id="description"
                                            name="description"
                                            rows="3"
                                            onChange={handleInput}
                                            value={product.description}
                                            placeholder="Describe the item"
                                        />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label text-muted">
                                            Category
                                        </label>
                                        <select
                                            name="category_id"
                                            onChange={handleInput}
                                            className="form-select"
                                        >
                                            <option value="">Select Category</option>
                                            {categories.map((category) => (
                                                <option key={category.id} value={category.id}>{category.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="quantity" className="form-label text-muted">
                                            Quantity
                                        </label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            id="quantity"
                                            name="quantity"
                                            onChange={handleInput}
                                            value={product.quantity}
                                            placeholder="Enter quantity"
                                        />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="price" className="form-label text-muted">
                                            Estimated Value
                                        </label>
                                        <div className="input-group">
                                            <span className="input-group-text">$</span>
                                            <input
                                                type="number"
                                                className="form-control"
                                                id="price"
                                                name="price"
                                                onChange={handleInput}
                                                value={product.price}
                                                placeholder="0.00"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="endDate" className="form-label text-muted">
                                            Auction Deadline
                                        </label>
                                        <input
                                            type="datetime-local"
                                            className="form-control"
                                            id="endDate"
                                            value={endDate}
                                            onChange={(e) => setEndDate(e.target.value)}
                                        />
                                    </div>
                                    <div className="col-md-12 mb-3">
                                        <label className="form-label text-muted">
                                            Item Images
                                        </label>
                                        <div className="row g-2">
                                            <div className="col-md-4">
                                                <div className="form-file">
                                                    <input
                                                        type="file"
                                                        className="form-file-input"
                                                        id="image1"
                                                        name="image1"
                                                        onChange={(e) => {
                                                            setSelectImage1(e.target.files[0]);
                                                            setImage1Name(e.target.files[0] ? truncateFileName(e.target.files[0].name) : "Choose image 1...");
                                                        }}
                                                        required
                                                    />
                                                    <label className="form-file-label" htmlFor="image1">
                                                        <span className="form-file-text">{image1Name}</span>
                                                        <span className="form-file-button">Browse</span>
                                                    </label>
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="form-file">
                                                    <input
                                                        type="file"
                                                        className="form-file-input"
                                                        id="image2"
                                                        name="image2"
                                                        onChange={(e) => {
                                                            setSelectImage2(e.target.files[0]);
                                                            setImage2Name(e.target.files[0] ? truncateFileName(e.target.files[0].name) : "Choose image 2...");
                                                        }}
                                                        required
                                                    />
                                                    <label className="form-file-label" htmlFor="image2">
                                                        <span className="form-file-text">{image2Name}</span>
                                                        <span className="form-file-button">Browse</span>
                                                    </label>
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="form-file">
                                                    <input
                                                        type="file"
                                                        className="form-file-input"
                                                        id="image3"
                                                        name="image3"
                                                        onChange={(e) => {
                                                            setSelectImage3(e.target.files[0]);
                                                            setImage3Name(e.target.files[0] ? truncateFileName(e.target.files[0].name) : "Choose image 3...");
                                                        }}
                                                        required
                                                    />
                                                    <label className="form-file-label" htmlFor="image3">
                                                        <span className="form-file-text">{image3Name}</span>
                                                        <span className="form-file-button">Browse</span>
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12 text-center">
                                        <MDBBtn
                                            type="submit"
                                            className="btn-danger btn-primary btn-lg px-5"
                                            onClick={saveProduct}
                                        >
                                            Start Auction
                                        </MDBBtn>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer/>
        </div>
    );
};

export default AddProductForm;