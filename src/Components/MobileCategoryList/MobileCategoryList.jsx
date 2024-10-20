import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  MDBIcon,
  MDBListGroup,
  MDBListGroupItem,
  MDBBtn,
} from "mdb-react-ui-kit";
import { IconColors } from "../../constans/iconColorsConstans";

/**
 * MobileCategorySidebar component represents a sidebar that displays all categories on mobile devices.
 * @component
 * @param {Object} props
 * @param {Array} props.allCategories - The list of all categories
 * @returns {JSX.Element} The MobileCategorySidebar component
 */
const MobileCategorySidebar = ({ allCategories }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const sidebarRef = useRef(null);
  const toggleButtonRef = useRef(null);

  const toggleSidebar = () => setIsOpen(!isOpen);

  /**
   * Handler for category click
   */
  const handleCategoryClick = (categoryId) => {
    navigate(`/product/category/${categoryId}`);
    setIsOpen(false);
  };

  /**
   * Function to get the color of the icon based on the index
   */
  const getIconColor = (index) => {
    const colorKeys = Object.keys(IconColors);
    return IconColors[colorKeys[index % colorKeys.length]];
  };

  useEffect(() => {
    /**
     * Function to handle click outside the sidebar
     * @param {Event} event - The event object
     */
    const handleClickOutside = (event) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target) &&
        toggleButtonRef.current &&
        !toggleButtonRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    isOpen && document.body.classList.add("overflow-hidden");
    !isOpen && document.body.classList.remove("overflow-hidden");
  }, [isOpen]);

  return (
    <>
      <div
        ref={sidebarRef}
        className={`position-fixed top-0 start-0 h-100 bg-white shadow transition-all`}
        style={{
          maxWidth: isOpen ? "300px" : "0px",
          overflowX: "hidden",
          overflow: "auto",
          zIndex: 1040,
          transition: "all 0.5s ease-out",
        }}
      >
        <button
          ref={toggleButtonRef}
          className="position-fixed bg-transparent border-0"
          onClick={toggleSidebar}
          style={{
            zIndex: 1050,
            marginTop: "200px",
            marginLeft: isOpen ? "190px" : "0px",
            transition: "all 0.5s ease-out",
          }}
          aria-label="Toggle category menu"
        >
          <MDBIcon
            icon={isOpen ? "circle-arrow-left" : "circle-arrow-right"}
            size="2xl"
            color="danger"
          />
        </button>
        <div className="p-3">
          <h5 className="text-center mb-4">Categories</h5>
          <MDBListGroup flush="true">
            {allCategories.map((category, index) => (
              <MDBListGroupItem
                key={index}
                className="d-flex align-items-center border-0 py-3"
                style={{ cursor: "pointer" }}
                onClick={() => handleCategoryClick(category.id)}
              >
                <MDBIcon
                  icon={category.icon}
                  className="me-3"
                  size="lg"
                  style={{
                    width: "30px",
                    color: getIconColor(index),
                    textAlign: "center",
                  }}
                />
                <span className="fw-bold">{category.name}</span>
              </MDBListGroupItem>
            ))}
          </MDBListGroup>
        </div>
      </div>
    </>
  );
};

export default MobileCategorySidebar;
