import React from 'react';
import Countdown from 'react-countdown';
import { countdownStyles } from "../Utils/countdownStyles";

/**
 * Renders a countdown timer.
 * @param {Object} props - The component props.
 * @param {Date} props.date - The end date for the countdown.
 * @returns {React.ReactElement} The countdown component.
 */
const CountdownTimer = ({ date }) => {
  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      return <span style={{color: '#dc3545', fontWeight: 'bold'}}>Auction ended</span>;
    } else {
      return (
        <div style={countdownStyles.container}>
          <div style={countdownStyles.timeUnit}>
            <span style={countdownStyles.number}>{days}</span>
            <span style={countdownStyles.label}>days</span>
          </div>
          <div style={countdownStyles.timeUnit}>
            <span style={countdownStyles.number}>{hours}</span>
            <span style={countdownStyles.label}>hours</span>
          </div>
          <div style={countdownStyles.timeUnit}>
            <span style={countdownStyles.number}>{minutes}</span>
            <span style={countdownStyles.label}>min</span>
          </div>
          <div style={countdownStyles.timeUnit}>
            <span style={countdownStyles.number}>{seconds}</span>
            <span style={countdownStyles.label}>sec</span>
          </div>
        </div>
      );
    }
  };

  return <Countdown date={date} renderer={renderer} />;
};

export default CountdownTimer;