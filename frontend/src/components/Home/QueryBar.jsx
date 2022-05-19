import React from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import '@styles/QueryBar.scss';
import { useSelector, useDispatch } from 'react-redux';
import { uiSliceActions } from '@features/ui.slice';

const QueryBar = () => {
  const { stateData } = useSelector((state) => state.database);
  const { selectedState, selectedCounty, selectedTownship, selectedRange } = useSelector((state) => state.ui);
  const dispatch = useDispatch();

  const handleChange = (event) => {
    const { value } = event.target;
    dispatch(uiSliceActions.setState(value));
  };

  const handleCountyChange = (event) => {
    const { value } = event.target;
    dispatch(uiSliceActions.setCounty(value));
    if (Object.keys(stateData[selectedState][value]).length === 1) {
      const township = Object.keys(stateData[selectedState][value])[0];
      dispatch(uiSliceActions.setTownship(township));
      if (Object.keys(stateData[selectedState][value][township]).length === 1) {
        dispatch(uiSliceActions.setRange(stateData[selectedState][value][township][0]));
      }
    }
  };

  const handleTownshipsChange = (event) => {
    const { value } = event.target;
    dispatch(uiSliceActions.setTownship(value));
    if (Object.keys(stateData[selectedState][selectedCounty][value]).length === 1) {
      const range = stateData[selectedState][selectedCounty][value][0];
      dispatch(uiSliceActions.setRange(range));
    }
  };

  const handleRangeChange = (event) => {
    const { value } = event.target;
    dispatch(uiSliceActions.setRange(value));
  };

  return (
    <div className="querybar">
      <FormControl fullWidth disabled={!stateData}>
        <InputLabel id="state-select-label">State</InputLabel>
        <Select
          labelId="state-select-label"
          id="state-select"
          value={selectedState}
          label="State"
          onChange={handleChange}
        >
          {stateData &&
            Object.keys(stateData)
              .sort()
              .map((state) => (
                <MenuItem key={state} value={state}>
                  {state}
                </MenuItem>
              ))}
        </Select>
      </FormControl>
      <FormControl fullWidth disabled={!selectedState}>
        <InputLabel id="county-select-label">County</InputLabel>
        <Select
          labelId="county-select-label"
          id="county-select"
          value={selectedCounty}
          label="County"
          onChange={handleCountyChange}
        >
          {stateData &&
            selectedState &&
            Object.keys(stateData[selectedState])
              .sort()
              .map((counties) => (
                <MenuItem key={counties} value={counties}>
                  {counties}
                </MenuItem>
              ))}
        </Select>
      </FormControl>
      <FormControl fullWidth disabled={!selectedCounty}>
        <InputLabel id="township-select-label">Township</InputLabel>
        <Select
          labelId="township-select-label"
          id="township-select"
          value={selectedTownship}
          label="Township"
          onChange={handleTownshipsChange}
        >
          {stateData &&
            selectedState &&
            selectedCounty &&
            Object.entries(stateData[selectedState][selectedCounty]).map((townships) => (
              <MenuItem key={townships[0]} value={townships[0]}>
                {townships[0]}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
      <FormControl fullWidth disabled={!selectedTownship}>
        <InputLabel id="range-select-label">Ranges</InputLabel>
        <Select
          labelId="range-select-label"
          id="range-select"
          value={selectedRange}
          label="Range"
          onChange={handleRangeChange}
        >
          {stateData &&
            selectedState &&
            selectedCounty &&
            selectedTownship &&
            stateData[selectedState][selectedCounty][selectedTownship].map((range) => (
              <MenuItem key={range} value={range}>
                {range}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default QueryBar;
