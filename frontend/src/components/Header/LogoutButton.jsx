import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '@styles/LogoutButton.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPowerOff } from '@fortawesome/free-solid-svg-icons';
import { getMsalObject, logout } from '@utils/auth';
import { authSliceActions } from '@features/auth.slice';

/**
 * Logout Button Component
 * @returns {JSX}
 */
const LogoutButton = () => {
  const dispatch = useDispatch();
  // redux state
  const { loginResponse } = useSelector((state) => state.auth);
  const Logout = async () => {
    const msalObject = await getMsalObject();
    const logoutResponse = await logout(loginResponse, msalObject).then((response) => {
      dispatch(authSliceActions.clearResults());
    });
  };

  // return
  return (
    <a onClick={Logout} className="logout-button">
      <FontAwesomeIcon icon={faPowerOff} />
    </a>
  );
};

export default LogoutButton;
