import React from 'react';
import SupportFooter from '@components/SupportFooter';
import Engineering from '@assets/engineering.svg';
import '@styles/ServiceUnavailable.scss';

const ServiceUnavailable = () => {
  return (
    <div className="service-unavailable">
      <img className="service-unavailable__icon" src={Engineering} />
      <h1>503</h1>
      <h2>Service Unavailable</h2>
      <p>This module of the app has been set to maintenance mode by your administrator and is no longer available.</p>
      <SupportFooter />
    </div>
  );
};

export default ServiceUnavailable;
