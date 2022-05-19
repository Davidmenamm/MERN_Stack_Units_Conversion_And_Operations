/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import Logo from '@assets/fractals.svg';
import Toast from '@components/Toast';

import '@styles/Header.scss';

import '@styles/Login.scss';
import { getMsalObject } from '@utils/auth';
import { useDispatch } from 'react-redux';
import { VERSION } from 'underscore';
import { authenticateAD } from '@features/auth.slice';

const Login = () => {
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState({});
  const [settingsObject, setSettingsObject] = useState(false);
  const [msalObject, setMsalObject] = useState(null);

  const initialSettings = async () => {
    // fetch settings
    const settingsLocation = process.env.NODE_ENV === 'development' ? 'settings.local.json' : 'settings.json';
    const settings = await fetch(settingsLocation).then((response) => {
      return response.json();
    });
    const msal = await getMsalObject();
    // local State
    setSettingsObject(settings);
    setMsalObject(msal);
  };

  useEffect(() => {
    initialSettings();
  }, []);

  // reset error
  useEffect(() => {
    setError(null);
  }, [error]);

  // login function
  const login = async () => {
    try {
      // authenticate user
      dispatch(authenticateAD({ msal: msalObject, settings: settingsObject }));
      // const result = await msalObject.loginPopup({
      //   scopes: Config.scopes,
      //   prompt: 'select_account',
      // });
      // console.log(result);
      // setIsAuthenticated(true);
      // if (result) {
      // }
    } catch (err) {
      console.log(err);
      setError(err);
      setIsAuthenticated(false);
      setUser({});
    }
  };

  // logout function
  const logout = () => {
    msalObject.logoutRedirect();
    setIsAuthenticated(false);
    setUser({});
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    login();
  };

  return (
    <div className="login">
      <img src={Logo} className="logo-black" />
      <p>Fractals</p>
      {VERSION}
      <hr />
      <form action="/" className="login__form" onSubmit={handleSubmit}>
        <div className="login__form__password"></div>
        <input type="submit" value="Login" className="login__form__login-button" />
      </form>
      {error && <Toast type="error" message="Incorrect username or password" />}
    </div>
  );
};
export default Login;
