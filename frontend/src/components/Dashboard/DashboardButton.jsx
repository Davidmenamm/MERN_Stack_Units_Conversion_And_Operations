import React from 'react';
import PropTypes from 'prop-types';
import '@styles/DashboardButton.scss';

const DashboardButton = ({ onClick, text, color, disabled }) => {
  const colorClass = color ? `dashboard-button--${color}` : '';
  const disabledClass = disabled ? 'dashboard-button--disabled' : '';

  return (
    <button
      className={`dashboard-button ${colorClass} ${disabledClass}`}
      type="button"
      onClick={onClick}
      disabled={disabled}
    >
      <span>{text}</span>
    </button>
  );
};

DashboardButton.propTypes = {
  onClick: PropTypes.func,
  text: PropTypes.string,
  color: PropTypes.string,
  disabled: PropTypes.bool,
};

DashboardButton.defaultProps = {
  onClick: () => {},
  text: '',
  color: '',
  disabled: false,
};

export default DashboardButton;
