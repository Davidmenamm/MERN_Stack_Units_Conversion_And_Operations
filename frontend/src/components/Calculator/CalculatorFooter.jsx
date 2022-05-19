import { BUTTON_CALCULATE } from '@utils/constants';
import React from 'react';

const UploaderFooter = ({ activateButton, onUpload }) => {
  return (
    <div className="uploader-footer-container">
      {activateButton && (
        <button onClick={onUpload} className="uploader-footer-container__button" type="button" id="file" name="file">
          {BUTTON_CALCULATE}
        </button>
      )}
    </div>
  );
};

export default UploaderFooter;
