import {SampleNextArrow} from "../Arrows/SampleNextArrow";
import {SamplePrevArrow} from "../Arrows/SamplePrevArrow";
import React from "react";

/**
 * Settings configuration for a slider component.
 *
 * @property {boolean} dots - Determines whether to display navigation dots.
 * @property {boolean} infinite - Enables infinite scrolling of slides.
 * @property {number} speed - Duration of slide transition in milliseconds.
 * @property {number} slidesToShow - Number of slides to show at once.
 * @property {number} slidesToScroll - Number of slides to scroll at once.
 * @property {number} initialSlide - Index of the initial slide to be shown.
 * @property {React.Element} nextArrow - Custom component for the "next" arrow.
 * @property {React.Element} prevArrow - Custom component for the "previous" arrow.
 * @property {Array<Object>} responsive - Array of responsive settings for different breakpoints.
 * @property {number} responsive[].breakpoint - The screen width at which to apply the settings.
 * @property {Object} responsive[].settings - Settings to apply at the specified breakpoint.
 * @property {number} responsive[].settings.slidesToShow - Number of slides to show at the specified breakpoint.
 * @property {number} responsive[].settings.slidesToScroll - Number of slides to scroll at the specified breakpoint.
 * @property {boolean} [responsive[].settings.infinite] - Whether to enable infinite scrolling at the specified breakpoint.
 * @property {boolean} [responsive[].settings.dots] - Whether to display navigation dots at the specified breakpoint.
 * @property {number} [responsive[].settings.initialSlide] - Initial slide index at the specified breakpoint.
 */
export const settings = {
    dots: false,
    infinite: true,
    speed: 700,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,
    nextArrow: <SampleNextArrow/>,
    prevArrow: <SamplePrevArrow/>,
    responsive: [
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                infinite: true,
                dots: false
            }
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                initialSlide: 2
            }
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }
    ]
};