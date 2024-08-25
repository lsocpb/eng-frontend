import {MDBIcon} from "mdb-react-ui-kit";
import React from "react";

export const SampleNextArrow = (props) => {
    const {onClick} = props;
    return (
        <div className="custom-next-arrow" onClick={onClick}>
            <MDBIcon icon={"angle-right"} size="2x" className="d-flex"/>
        </div>
    );
};