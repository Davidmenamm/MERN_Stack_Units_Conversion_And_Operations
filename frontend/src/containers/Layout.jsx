/* eslint-disable no-console */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Header from '@components/Header/Header';
import { useDispatch, useSelector } from 'react-redux';
import ModalChangelog from '@components/Header/ModalChangelog';
import { getMsalObject, getStorageToken, logout } from '@utils/auth';
import { authSliceActions } from '@features/auth.slice';
import { formatDatesInObject } from '@utils/formatting';

const Layout = ({ children }) => {
  const { openChangelog } = useSelector((state) => state.ui);
  const { loginResponse } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  /**
   * Logout
   */
  const Logout = async () => {
    const msalObject = await getMsalObject();
    const logoutResponse = await logout(loginResponse, msalObject).then((response) => {
      dispatch(authSliceActions.clearResults());
    });
  };

  /** Check Token Expirations */
  useEffect(() => {
    // Every n miliseconds interval
    const n = 10 * 1000;
    const interval = setInterval(async () => {
      const initDateTimeLogin = new Date();
      const endDateTimeLogin = new Date(loginResponse.expiresOn);
      const initDateTimeBlob = new Date();
      const endDateTimeBlob = new Date(loginResponse.expiresOn);
      // if date expired Login
      if (initDateTimeLogin > endDateTimeLogin) {
        Logout();
      }
      // if date expired Blob Storage
      if (initDateTimeBlob > endDateTimeBlob) {
        const msalObject = await getMsalObject();
        const storageResponse = await getStorageToken(loginResponse, msalObject);
        const login = formatDatesInObject(loginResponse);
        const storage = formatDatesInObject(storageResponse);
        dispatch(authSliceActions.setLoginResponse(login));
        dispatch(authSliceActions.setStorageResponse(storage));
      }
    }, n);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Header />
      {children}
      {openChangelog && <ModalChangelog />}
    </>
  );
};

export default Layout;

Layout.propTypes = {
  children: PropTypes.instanceOf(Object).isRequired,
};
