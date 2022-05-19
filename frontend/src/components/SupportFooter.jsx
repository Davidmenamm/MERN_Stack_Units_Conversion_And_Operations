import React from 'react';
import '@styles/SupportFooter.scss';
import { CONTACT_INFO, SUPPORT_EMAIL } from '@utils/constants';

const SupportFooter = () => {
  return (
    <div className="support-footer">
      <span>{CONTACT_INFO}</span>
      <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>
    </div>
  );
};

export default SupportFooter;
