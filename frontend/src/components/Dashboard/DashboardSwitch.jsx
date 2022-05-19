import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { FormControlLabel, FormGroup, Stack, Switch } from '@mui/material';
import { uiSliceActions } from '@features/ui.slice';
import '@styles/DashboardSwitch.scss';

const BaseSwitch = ({ checked, onChange, label, labelOn }) => {
  return (
    <FormGroup>
      {labelOn ? (
        <Stack direction="row" spacing={1} alignItems="center">
          <span className={checked ? 'dashboard-switch__title--disable' : ''}>{label}</span>
          <Switch className="dashboard-switch--dual" checked={checked} onChange={onChange} />
          <span className={!checked ? 'dashboard-switch__title--disable' : ''}>{labelOn}</span>
        </Stack>
      ) : (
        <FormControlLabel
          control={<Switch className="dashboard-switch" checked={checked} onChange={onChange} />}
          label={label}
        />
      )}
    </FormGroup>
  );
};

BaseSwitch.propTypes = {
  label: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func,
  labelOn: PropTypes.string,
};

BaseSwitch.defaultProps = {
  onChange: () => {},
  labelOn: null,
};

export const PolicyFormLossSwitch = () => {
  const dispatch = useDispatch();
  const { showPolicyFormLossChart } = useSelector((state) => state.ui);
  const handleSwitch = (event) => {
    dispatch(uiSliceActions.togglePolicyFormLossChart(event.target.checked));
  };

  return <BaseSwitch checked={showPolicyFormLossChart} onChange={handleSwitch} label="Policy Loss Chart" />;
};

export const PremiumOrCoverageSwitch = () => {
  const dispatch = useDispatch();
  const { isCoverage } = useSelector((state) => state.ui);
  const handleSwitch = (event) => {
    dispatch(uiSliceActions.toggleIsCoverage(event.target.checked));
  };
  return <BaseSwitch checked={isCoverage} onChange={handleSwitch} label="Premium" labelOn="Coverage" />;
};

export const ProdPlanSwitch = () => {
  const dispatch = useDispatch();
  const { showProductionPlan } = useSelector((state) => state.ui);
  const handleSwitch = (event) => {
    dispatch(uiSliceActions.toggleShowProductionPlan(event.target.checked));
  };
  return <BaseSwitch checked={showProductionPlan} onChange={handleSwitch} label="Compare to Prod. Plan" />;
};
