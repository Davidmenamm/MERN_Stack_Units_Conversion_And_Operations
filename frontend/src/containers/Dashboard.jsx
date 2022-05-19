import React from 'react';
import PropTypes from 'prop-types';
import '@styles/Dashboard.scss';

const Dashboard = ({ children }) => {
  return <div className="dashboard_panel">{children}</div>;
};

export default Dashboard;

Dashboard.propTypes = {
  children: PropTypes.instanceOf(Object).isRequired,
};
