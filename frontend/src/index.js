/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store, { persistor } from '@utils/store';
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'
import App from './routes/App';
import './web.config';

ReactDOM.render(
  <React.StrictMode>
   <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
  </React.StrictMode>,
  document.getElementById('app')
);
