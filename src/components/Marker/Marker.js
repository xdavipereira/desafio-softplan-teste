import React from "react";
import PropTypes from "prop-types";
import './Marker.scss';

function Marker({ text }) {
  return <div className="marker-container">{text}</div>;
}

Marker.propTypes = {
  text: PropTypes.string.isRequired,
};

export default Marker;
