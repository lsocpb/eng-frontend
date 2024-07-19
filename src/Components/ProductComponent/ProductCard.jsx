import React, { useState, useEffect, useRef } from 'react';
import { Link } from "react-router-dom";
import CategoryNavigator from "../Category/CategoryNavigator";
import {MDBCard} from "mdb-react-ui-kit";

const ProductCard = ({ item }) => {
  const [imageStyle, setImageStyle] = useState({});
  const imageRef = useRef(null);

  const descriptionToShow = (description, maxLength) => {
    if (description.length <= maxLength) {
      return description;
    } else {
      const truncatedText = description.substring(0, maxLength);
      return truncatedText + "...";
    }
  };

  useEffect(() => {
    const img = imageRef.current;
    if (img) {
      const handleLoad = () => {
        if (img.naturalHeight < 300) {
          setImageStyle({
            objectFit: 'contain',
            height: `${img.naturalHeight}px`,
          });
        } else {
          setImageStyle({
            objectFit: 'cover',
            height: '300px',
          });
        }
      };

      img.addEventListener('load', handleLoad);
      return () => img.removeEventListener('load', handleLoad);
    }
  }, [item.image_url_1]);

  return (
    <MDBCard>
      <div className="card product-card rounded-card custom-bg h-100 shadow-5-strong mb-1 mt-1">
        <div style={{ height: '300px', overflow: 'hidden' }}>
          <img
            ref={imageRef}
            src={item.image_url_1}
            className="card-img-top img-fluid rounded"
            alt={item.name}
            style={{
              width: '100%',
              ...imageStyle,
            }}
          />
        </div>

        <div className="card-body text-color">
          <h5>
            <CategoryNavigator
              item={{
                id: item.category_id,
              }}
            />
          </h5>
          <h5 className="card-title d-flex justify-content-between">
            <div>
              <b>{item.name}</b>
            </div>
          </h5>
          <p className="card-text">
            <b>{descriptionToShow(item.description, 50)}</b>
          </p>
        </div>
        <div className="card-footer">
          <div className="d-flex justify-content-between mt-2">
            <Link
              to={`/product/${item.id}/category/${item.category_id}`}
              className="mb-2 btn btn-md bg-color custom-bg-text text-center text-white rounded-9 btn-danger">
              Start Bid
            </Link>

            <div className="mx-2 mt-1 text-color">
              <p>
                <span>
                  <h4>${item.price}</h4>
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </MDBCard>
  );
};

export default ProductCard;