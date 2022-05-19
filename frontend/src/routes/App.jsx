import React from 'react';
import { useSelector } from 'react-redux';
import { PAGE_HOME, PAGE_OPERATION, PAGE_CONVERSION } from '@utils/constants';
import Layout from '@containers/Layout';
import LoginAD from '@pages/LoginAD';
import NotFound from '@pages/NotFound';
import Historic from '@pages/UploaderHistoric';
import CalculatorPage from '@pages/CalculatorPage';
import '@styles/index.css';
import ServiceUnavailable from '@pages/ServiceUnavailable';

// disable console.log
// console.log = () => {};

const App = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { page } = useSelector((state) => state.ui);
  const { pageOperation, pageConversion } = useSelector((state) => state.pages);

  const displayPage = (path) => {
    switch (path) {
      case PAGE_HOME:
        return <CalculatorPage type="operation" />;
      case PAGE_OPERATION:
        return pageOperation ? <CalculatorPage type="operation" /> : <ServiceUnavailable />;
      case PAGE_CONVERSION:
        return pageConversion ? <CalculatorPage type="conversion" /> : <ServiceUnavailable />;
      default:
        return <NotFound />;
    }
  };
  return <>{isAuthenticated ? <Layout>{displayPage(page)}</Layout> : <LoginAD />}</>;
};

export default App;
