import {MDBIcon} from "mdb-react-ui-kit";
import React from "react";

export const SamplePrevArrow = (props) => {
    const {onClick} = props;
    return (
        <div className="custom-prev-arrow" onClick={onClick}>
            <MDBIcon icon={"angle-left"} size="2x" className="d-flex"/>
        </div>
    );
};