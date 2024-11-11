import {MDBIcon} from "mdb-react-ui-kit";

/**
 * SampleNextArrow component represents a custom next arrow for the slider.
 * @component
 * @param {Object} props
 * @param {function} props.onClick - The function to handle the click event
 * @returns {JSX.Element} The SampleNextArrow component
 */
export const SampleNextArrow = (props) => {
    const {onClick} = props;
    return (
        <div className="custom-next-arrow" onClick={onClick}>
            <MDBIcon icon={"angle-right"} size="2x" className="d-flex"/>
        </div>
    );
};