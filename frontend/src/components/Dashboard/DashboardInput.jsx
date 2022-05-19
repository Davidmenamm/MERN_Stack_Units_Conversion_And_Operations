import React from 'react';
import PropTypes from 'prop-types';
import '@styles/DashboardInput.scss';

const DashboardInput = ({ title, prefix, onChange, value, min, max, step, decimals }) => {
  const handleClick = (e) => {
    e.target.select();
  };
  return (
    <div className="dashboard-input">
      <span className="dashboard-input__title">{title}</span>
      <span className="dashboard-input__textbox">
        <span className="dashboard-input__textbox__prefix">{prefix}</span>
        <input type="number" min={min} step={step} max={max} value={value} onChange={onChange} onClick={handleClick} />
      </span>
    </div>
  );
};

DashboardInput.propTypes = {
  title: PropTypes.string.isRequired,
  prefix: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.number,
  min: PropTypes.number,
  max: PropTypes.number,
  step: PropTypes.number,
  decimals: PropTypes.number,
};

DashboardInput.defaultProps = {
  prefix: '',
  onChange: () => {},
  value: 0,
  min: 0,
  max: null,
  step: 0.01,
  decimals: null,
};

export default DashboardInput;
