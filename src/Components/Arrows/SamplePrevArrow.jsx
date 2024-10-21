import {MDBIcon} from "mdb-react-ui-kit";
import React from "react";

/**
 * SampleNextArrow component represents a custom next arrow for the slider.
 * @component
 * @param {Object} props
 * @param {function} props.onClick - The function to handle the click event
 * @returns {JSX.Element} The SampleNextArrow component
 */
export const SamplePrevArrow = (props) => {
    const {onClick} = props;
    return (
        <div className="custom-prev-arrow" onClick={onClick}>
            <MDBIcon icon={"angle-left"} size="2x" className="d-flex"/>
        </div>
    );
};