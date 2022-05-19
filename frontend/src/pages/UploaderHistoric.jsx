import Dashboard from '@containers/Dashboard';
import React, { useEffect, useRef, useState } from 'react';
import '@styles/UploaderFooter.scss';
import '@styles/CalculatorPage.scss';
import UploaderFooter from '@components/Calculator/CalculatorFooter';
import Uppy from '@uppy/core';
import Logger from '@components/Calculator/Logger';

const UploaderHistoric = () => {
  // const { selectedAip, selectedState, selectedYear, selectedType } = useSelector((state) => state.ui);
  const [loading, setLoading] = useState(true);
  const [uploaderRef, setUploaderRef] = useState(null);
  const [blobUri, setBlobUri] = useState(null);
  const [blobPath, setBlobPath] = useState(null);
  const [newsPath, setNewsPath] = useState(null);
  const [toggle, setToggle] = useState(false);
  // get blob uri
  const getBlobUri = async () => {
    setLoading(true);
    // fetch settings
    const settingsLocation = process.env.NODE_ENV === 'development' ? 'settings.local.json' : 'settings.json';
    await fetch(settingsLocation).then((response) => {
      response.json().then((settings) => {
        console.log('settings', settings);
        setBlobUri(settings.BLOB_URI);
        setBlobPath(settings.BLOB_PATH);
        setNewsPath(settings.NEWS_PATH);
        setLoading(false);
      });
    });
  };
  // use effect
  useEffect(async () => {
    await getBlobUri();
  }, []);
  const handleUpload = (e) => {
    uploaderRef.upload();
  };
  return (
    <>
      <div className="upload-page-container">
        <Dashboard>
          <p className="upload-page-container__text">
            The historic log of all the Calculator events for the year 2022.
          </p>
        </Dashboard>
        {!loading && (
          <div className="upload-page-container__content">
            {console.log('blob uri0', blobUri)}
            <Logger blobUri={blobUri} newsPath={newsPath} toggle={toggle} setToggle={setToggle} />
          </div>
        )}
      </div>
      <UploaderFooter onUpload={handleUpload} />
    </>
  );
};

export default UploaderHistoric;
