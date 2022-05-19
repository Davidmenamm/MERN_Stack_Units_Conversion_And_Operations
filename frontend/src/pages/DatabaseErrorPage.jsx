import React from 'react';
import { useSelector } from 'react-redux';
import SupportFooter from '@components/SupportFooter';
import DatabaseErrorLogo from '@assets/database-error.svg';
import RefreshLogo from '@assets/refresh.svg';
import '@styles/DatabaseErrorPage.scss';

const DatabaseErrorPage = () => {
  const { error } = useSelector((state) => state.database);
  const handleUpdate = () => {
    window.location.reload();
  };

  return (
    <div className="database-error-page">
      <img src={DatabaseErrorLogo} className="database-error-page__icon" alt="Database Error" />
      <h1>Critical Database Error</h1>
      <h2>It seems your local database lacks critical information to work.</h2>
      <h2>Please be sure you have completely downloaded the database at least once.</h2>
      <button className="database-error-page__update-button" type="button" onClick={handleUpdate}>
        <div className="database-error-page__update-button__content">
          <img className="database-error-page__update-button__content__image" src={RefreshLogo} />
          Refresh App
        </div>
      </button>
      <SupportFooter />
      <div className="database-error-page__stacktrace">
        <span className="database-error-page__stacktrace__text">Stack trace:</span>
        <div className="database-error-page__stacktrace__error-log">
          {error.map((e, i) => {
            // eslint-disable-next-line react/no-array-index-key
            return <div key={`error-${i}`}>{JSON.stringify(e.summary || e.stack || e)}</div>;
          })}
        </div>
      </div>
    </div>
  );
};

export default DatabaseErrorPage;
