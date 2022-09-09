import React from "react";
import PropTypes from 'prop-types'


function Alert({ type, message }) {
  const alertTypes = {
    error: "alert-error",
    success: "alert-success",
    warning: "alert-warning"
  };

  return message && (
    <div className={`alert ${alertTypes[type]} shadow-lg flex items-center justify-center`}>
      <div>
        <span>{message}</span>
      </div>
    </div>
  );
}

Alert.defaultProps = {
  type: "error",
  message: "Sorry something went wrong !"
}

Alert.propTypes = {
  type: PropTypes.string,
  message: PropTypes.string
};

export default Alert;
