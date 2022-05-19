import Dashboard from '@containers/Dashboard';
import React, { useState } from 'react';
import {
  // CountiesSelector,
  UnitSelector,
  MagnitudeSelector,
  OperatorSelector,
} from '@components/Dashboard/DashboardSelector';
import '@styles/UploaderFooter.scss';
import '@styles/CalculatorPage.scss';
import { useDispatch, useSelector } from 'react-redux';
import Logger from '@components/Calculator/Logger';
import UploaderFooter from '@components/Calculator/CalculatorFooter';
import DashboardInput from '@components/Dashboard/DashboardInput';
import { uiSliceActions } from '@features/ui.slice';
import { postData } from '@utils/requests';
import { urlCalculate, urlConvert } from '@utils/urls';

const CalculatorPage = ({ type }) => {
  const dispatch = useDispatch();
  const {
    selectedMagnitude,
    selectedUnitA,
    selectedUnitB,
    selectedOperator,
    selectedQuantityA,
    selectedQuantityB,
    log,
  } = useSelector((state) => state.ui);

  // handles
  const handleQuantityA = (event) => {
    dispatch(uiSliceActions.setSelectedQuantityA(event.target.value));
  };
  const handleQuantityB = (event) => {
    dispatch(uiSliceActions.setSelectedQuantityB(event.target.value));
  };
  const handleCalculate = async (e) => {
    let body;
    let url;
    if (type === 'conversion') {
      body = {
        magnitudeName: selectedMagnitude,
        quantityA: selectedQuantityA,
        unitA: selectedUnitA,
        unitB: selectedUnitB,
      };
      url = urlConvert;
    } else if (type === 'operation') {
      body = {
        operator: selectedOperator,
        magnitudeName: selectedMagnitude,
        quantityA: selectedQuantityA,
        unitA: selectedUnitA,
        quantityB: selectedQuantityB,
        unitB: selectedUnitB,
      };
      url = urlCalculate;
    }
    await postData(url, body).then((response) => {
      const logCopy = JSON.parse(JSON.stringify(log));
      const typeFormat = type
        .toString()
        .toLowerCase()
        .replace(/\b(\w)/g, (s) => s.toUpperCase());
      logCopy.push({ type: typeFormat, ...response });
      dispatch(uiSliceActions.setLog(logCopy));
    });
  };

  return (
    <>
      <div className="upload-page-container">
        <Dashboard>
          <MagnitudeSelector />
          <UnitSelector option="a" />
          <DashboardInput
            title=""
            prefix=""
            onChange={handleQuantityA}
            value={selectedQuantityA}
            min={0}
            max={1000000 * 1000000}
            step={1}
            decimals={2}
          />
          <UnitSelector option="b" />
          {type === 'operation' && (
            <>
              <DashboardInput
                title=""
                prefix=""
                onChange={handleQuantityB}
                value={selectedQuantityB}
                min={0}
                max={1000000 * 1000000}
                step={1}
                decimals={2}
              />
              <OperatorSelector />
            </>
          )}
        </Dashboard>
        <div className="upload-page-container__content">
          <Logger log={log} />
        </div>
      </div>
      <UploaderFooter activateButton onUpload={handleCalculate} />
    </>
  );
};

export default CalculatorPage;
