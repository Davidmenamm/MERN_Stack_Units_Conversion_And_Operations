import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { uiSliceActions } from '@features/ui.slice';
import '@styles/ButtonLanding.scss';

const ButtonLanding = ({ logo, text, route, disable }) => {
  const dispatch = useDispatch();

  const handleSetPage = (newPage) => {
    dispatch(uiSliceActions.setPage(newPage));
  };

  return (
    <div
      disabled={disable}
      className="button-landing"
      onClick={() => {
        handleSetPage(route);
      }}
    >
      <img src={logo} alt={text} className="button-landing__img" />
      <h2 className="button-landing__text">{text}</h2>
    </div>
  );
};

ButtonLanding.propTypes = {
  logo: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  route: PropTypes.string.isRequired,
  disable: PropTypes.bool,
};

ButtonLanding.defaultProps = {
  disable: true,
};

export default ButtonLanding;
