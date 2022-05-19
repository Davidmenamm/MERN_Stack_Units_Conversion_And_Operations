import React from 'react';
import PropTypes from 'prop-types';
import GridLoading from '@assets/grid.svg';
import '@styles/LoadingMessage.scss';

const LoadingMessage = ({ message }) => {
  return (
    <div className="loader-container">
      <img src={GridLoading} alt="loading image" className="loader-container__image" />
      <span>{message}</span>
    </div>
  );
};

export default LoadingMessage;

LoadingMessage.propTypes = {
  message: PropTypes.string,
};

LoadingMessage.defaultProps = {
  message: 'Loading',
};
