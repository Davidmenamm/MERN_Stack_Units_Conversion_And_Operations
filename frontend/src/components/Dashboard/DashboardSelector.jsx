/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from 'react';
import { Box, Chip, FormControl, FormHelperText, MenuItem, Select, Tooltip } from '@mui/material';
import PropTypes from 'prop-types';
import '@styles/DashboardSelector.scss';
import { useDispatch, useSelector } from 'react-redux';
import { uiSliceActions } from '@features/ui.slice';
import { getData } from '@utils/requests';
import { urlGetMagnitudes, urlGetUnits } from '../../utils/urls';

// This functional component cannot be customized obeying the propTypes rules because it modifies the MUI library
const CustomMenuItem = (props) => {
  // eslint-disable-next-line react/prop-types
  const { children, data, ...other } = props;
  // eslint-disable-next-line react/prop-types
  return data.description ? (
    // eslint-disable-next-line react/prop-types
    <Tooltip title={data.description} placement="right">
      <div>
        <MenuItem {...other}>{children}</MenuItem>
      </div>
    </Tooltip>
  ) : (
    <MenuItem value={data} {...other}>
      {children}
    </MenuItem>
  );
};

const BaseSelector = ({ label, value, onChange, items, disabled, multiple }) => {
  return (
    <FormControl className="dashboard-selector__form">
      <FormHelperText className="dashboard-selector__form__label">{label}</FormHelperText>
      <Select
        className={`dashboard-selector__form__select ${multiple ? 'dashboard-selector__form__select--multiple' : ''}`}
        labelId={`${label}-select-label`}
        id={`${label}-select`}
        value={value}
        label={label}
        multiple={multiple}
        onChange={onChange}
        notched={false}
        disabled={disabled}
        renderValue={(selected) => {
          if (multiple) {
            return (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {selected.map((display) => (
                  <Chip key={`${label}-select-label-${display}`} label={display} />
                ))}
              </Box>
            );
          }
          return selected;
        }}
      >
        {items &&
          items.constructor === Object &&
          Object.keys(items).map((item) => {
            return (
              <CustomMenuItem key={`${label}-${item}`} value={item} data={items[item]}>
                {item}
              </CustomMenuItem>
            );
          })}
        {console.log(items, Array.isArray(items))}
        {items &&
          Array.isArray(items) &&
          items.map((item) => {
            console.log(item);
            return (
              <CustomMenuItem key={`${label}-${item}`} value={item} data={item}>
                {item}
              </CustomMenuItem>
            );
          })}
      </Select>
    </FormControl>
  );
};

/**
 *Selectors
 */
export const MagnitudeSelector = () => {
  const dispatch = useDispatch();
  const [magnitudes, setMagnitudes] = useState([]);

  const getInfo = async () => {
    await getData(urlGetMagnitudes).then((response) => {
      console.log('response', response);
      const vals = [];
      response.data.forEach((item) => {
        vals.push(item.name);
      });
      setMagnitudes(vals);
    });
  };

  useEffect(() => {
    getInfo();
  }, []);

  const { selectedMagnitude } = useSelector((state) => state.ui);
  const handleSelectedMagnitudeChange = (event) => {
    dispatch(uiSliceActions.setSelectedMagnitude(event.target.value));
  };

  return (
    <BaseSelector
      label="Magnitude"
      value={selectedMagnitude}
      onChange={handleSelectedMagnitudeChange}
      items={magnitudes}
      disabled={!magnitudes}
    />
  );
};

export const UnitSelector = ({ option }) => {
  const dispatch = useDispatch();
  const { selectedMagnitude } = useSelector((state) => state.ui);
  const { selectedUnitA, selectedUnitB } = useSelector((state) => state.ui);
  const [units, setUnits] = useState([]);

  const getInfo = async (selected) => {
    await getData(`${urlGetUnits}${selected}`).then((response) => {
      const vals = [];
      response.data.forEach((item) => {
        vals.push(item.name);
      });
      setUnits(vals);
    });
  };

  useEffect(() => {
    getInfo(selectedMagnitude);
  }, [selectedMagnitude]);

  const handleSelectedUnitChange = (event) => {
    if (option === 'a') {
      dispatch(uiSliceActions.setSelectedUnitA(event.target.value));
    } else {
      dispatch(uiSliceActions.setSelectedUnitB(event.target.value));
    }
  };

  return (
    <BaseSelector
      label="Unit"
      value={option === 'a' ? selectedUnitA : selectedUnitB}
      onChange={handleSelectedUnitChange}
      items={units}
      disabled={!units}
    />
  );
};

export const OperatorSelector = () => {
  const dispatch = useDispatch();
  const { selectedOperator } = useSelector((state) => state.ui);
  const operators = ['add', 'subtract', 'multiply', 'divide'];
  const handleOperatorChange = (event) => {
    dispatch(uiSliceActions.setSelectedOperator(event.target.value));
  };

  return (
    <BaseSelector
      label="Operator"
      value={selectedOperator}
      onChange={handleOperatorChange}
      items={operators}
      disabled={!operators}
    />
  );
};
