import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import {
  MDBBtn,
  MDBModal,
  MDBModalBody,
  MDBModalContent,
  MDBModalDialog,
  MDBModalFooter,
  MDBModalHeader,
  MDBModalTitle,
} from "mdb-react-ui-kit";
import "./AddProductForm.css";
import { BASE_API_URL } from "../../api/config";
import Cookies from "js-cookie";

const formatDateTimeLocal = (date) => {
  return date.toISOString().slice(0, 16);
};

/**
 * Component representing the form for adding a new product to the auction.
 * @returns {JSX.Element} - Returns the AddProductForm component
 */
const AddProductForm = () => {
  const [categories, setCategories] = useState([]);
  const seller_jwtToken = Cookies.get("active-user");
  const [minDate, setMinDate] = useState(formatDateTimeLocal(new Date()));
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [endDate, setEndDate] = useState("");

  const [selectedImages, setSelectedImages] = useState({
    image1: null,
    image2: null,
    image3: null,
  });

  const [imageNames, setImageNames] = useState({
    image1: "Choose image 1...",
    image2: "Choose image 2...",
    image3: "Choose image 3...",
  });

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    quantity: "1",
    category_id: "",
    auction_type: "buy_now",
  });

  let navigate = useNavigate();

  /**
   * Function to retrieve all categories from the API.
   */
  const retrieveAllCategories = async () => {
    const response = await axios.get(`${BASE_API_URL}/category/all`);
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

  /**
   * Function to handle input changes in the form fields.
   */
  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "category_id" ? parseInt(value) : value,
    });
  };

  /**
   * Function to handle the image change event.
   * @param {Event} e 
   * @param {string} imageKey 
   */
  const handleImageChange = (e, imageKey) => {
    const file = e.target.files[0];
    setSelectedImages({
      ...selectedImages,
      [imageKey]: file,
    });
    setImageNames({
      ...imageNames,
      [imageKey]: file ? truncateFileName(file.name) : `Choose ${imageKey}...`,
    });
  };

  /**
   * Function to truncate the file name if it exceeds the maximum length.
   * @param {string} fileName
   * @param {number} maxLength
   * @returns {string} - Returns the truncated file name
   */
  const truncateFileName = (fileName, maxLength = 20) => {
    if (fileName.length <= maxLength) return fileName;
    const extension = fileName.split(".").pop();
    const nameWithoutExtension = fileName.substring(
      0,
      fileName.lastIndexOf(".")
    );
    const truncatedName = nameWithoutExtension.substring(
      0,
      maxLength - extension.length - 3
    );
    return `${truncatedName}...${extension}`;
  };

  /**
   * Function to upload images to the server.
   * @param {File[]} files - The array of image files to upload. 
   * @returns 
   */
  const uploadImage = async (files) => {
    if (!files.length) return null;

    const formData = new FormData();

    files.forEach((file, index) => {
      formData.append("files", file);
    });

    try {
      const response = await axios.put(`${BASE_API_URL}/image`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${seller_jwtToken}`,
        },
      });
      return response.data.images;
    } catch (error) {
      console.error("Error uploading images:", error);
      throw error;
    }
  };

  /**
   * Function to save the product details.
   * @param {Event} e
   */
  const saveProduct = (e) => {
    e.preventDefault();
    setShowModal(true);
  };

  /**
   * Function to handle the confirmation of the auction.
   * @param {Event} e
   */
  const handleConfirm = async (e) => {
    setShowModal(false);
    e.preventDefault();

    if (new Date(endDate) <= new Date()) {
      toast.error("End date must be in the future");
      return;
    }

    if (!selectedImages.image1) {
      toast.error("At least one image is required");
      return;
    }

    try {
      setLoading(true);
      const files = ["image1", "image2", "image3"]
        .map((imageKey) => selectedImages[imageKey])
        .filter((file) => file);

      if (files.length > 0) {
        const imageUrls = await uploadImage(files);

        if (!imageUrls || imageUrls.length === 0) {
          toast.error("Failed to upload images");
          return;
        }

        const auctionData = {
          user_id: parseInt(seller_jwtToken.split("-")[0]),
          auction_type: formData.auction_type,
          quantity: parseInt(formData.quantity),
          end_date: new Date(endDate).toISOString(),
          price: parseFloat(formData.price),
          product: {
            name: formData.name,
            description: formData.description,
            category_id: formData.category_id,
            images: imageUrls,
          },
        };

        const response = await axios.put(
          `${BASE_API_URL}/auction`,
          auctionData,
          {
            headers: {
              Authorization: `Bearer ${seller_jwtToken}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.data) {
          toast.success("Auction Added Successfully");
          setTimeout(() => {
            navigate("/home");
          }, 1000);
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.detail || "Error adding auction");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid charity-bg">
      <div className="row justify-content-center py-5">
        <div className="col-md-8">
          <div className="card shadow-lg border-0 rounded-lg">
            <div className="card-header bg-danger text-white text-center py-3">
              <h4 className="mb-0">Place an item for the charities!</h4>
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
                      name="name"
                      onChange={handleInput}
                      value={formData.name}
                      placeholder="Enter item name"
                      required
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label
                      htmlFor="description"
                      className="form-label text-muted"
                    >
                      Item Description
                    </label>
                    <textarea
                      className="form-control"
                      name="description"
                      onChange={handleInput}
                      value={formData.description}
                      placeholder="Describe the item"
                      required
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label text-muted">Category</label>
                    <select
                      name="category_id"
                      onChange={handleInput}
                      className="form-select"
                      value={formData.category_id}
                      required
                    >
                      <option value="">Select Category</option>
                      {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label text-muted">
                      Auction Type
                    </label>
                    <select
                      name="auction_type"
                      onChange={handleInput}
                      className="form-select"
                      value={formData.auction_type}
                      required
                    >
                      <option value="buy_now">Buy Now</option>
                      <option value="bid">Bid</option>
                    </select>
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label text-muted">
                      {formData.auction_type === "bid"
                        ? "Starting Bid"
                        : "Buy Now Price"}
                    </label>
                    <div className="input-group">
                      <span className="input-group-text">$</span>
                      <input
                        type="number"
                        className="form-control"
                        name="price"
                        onChange={handleInput}
                        value={formData.price}
                        placeholder="0.00"
                        required
                        step="0.01"
                        min="0.01"
                      />
                    </div>
                  </div>

                  <div className="col-md-6 mb-3">
                    <label htmlFor="quantity" className="form-label text-muted">
                      Quantity
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      name="quantity"
                      onChange={handleInput}
                      value={formData.quantity}
                      min="1"
                      required
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label htmlFor="endDate" className="form-label text-muted">
                      Auction Deadline
                    </label>
                    <input
                      type="datetime-local"
                      className="form-control"
                      value={endDate}
                      min={minDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      required
                    />
                  </div>

                  <div className="col-md-12 mb-3">
                    <label className="form-label text-muted">Item Images</label>
                    <div className="row g-2">
                      {["image1", "image2", "image3"].map((imageKey, index) => (
                        <div className="col-md-4" key={imageKey}>
                          <div className="form-file">
                            <input
                              type="file"
                              className="form-file-input"
                              onChange={(e) => handleImageChange(e, imageKey)}
                              accept="image/*"
                              required={index === 0}
                            />
                            <label className="form-file-label">
                              <span className="form-file-text">
                                {imageNames[imageKey]}
                              </span>
                              <span className="form-file-button">Browse</span>
                            </label>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="col-12 text-center">
                    <MDBBtn
                      type="submit"
                      className="btn-danger btn-primary btn-lg px-5"
                      onClick={saveProduct}
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <span
                            className="spinner-border spinner-border-sm me-2"
                            role="status"
                            aria-hidden="true"
                          ></span>
                          Starting Auction...
                        </>
                      ) : (
                        "Start Auction"
                      )}
                    </MDBBtn>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <MDBModal open={showModal} onOpen={setShowModal} tabIndex="-1">
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Confirm Auction</MDBModalTitle>
              <MDBBtn
                className="btn-close"
                color="none"
                onClick={() => setShowModal(false)}
              ></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              Are you sure you want to start this auction?
            </MDBModalBody>
            <MDBModalFooter>
              <MDBBtn
                className="btn-outline-danger"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </MDBBtn>
              <MDBBtn color="danger" onClick={handleConfirm} disabled={loading}>
                {loading ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm me-2"
                      role="status"
                      aria-hidden="true"
                    ></span>
                    Confirming...
                  </>
                ) : (
                  "Confirm"
                )}
              </MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
      <ToastContainer />
    </div>
  );
};

export default AddProductForm;
