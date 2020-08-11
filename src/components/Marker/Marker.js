import React from "react";
import PropTypes from "prop-types";
import './Marker.scss';

function Marker({ text = 0 }) {
  return <div className="marker-container">{Math.round(text)} KM</div>;
}

Marker.propTypes = {
  text: PropTypes.number.isRequired,
};

export default Marker;
