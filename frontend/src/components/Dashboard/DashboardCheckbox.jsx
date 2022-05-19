import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '@styles/DashboardCheckbox.scss';
import { uiSliceActions } from '@features/ui.slice';

export const FormCheckboxes = () => {
  const dispatch = useDispatch();
  const { forms } = useSelector((state) => state.database);
  const { selectedForms } = useSelector((state) => state.ui);
  const handleToggle = ({ form }) => {
    dispatch(uiSliceActions.toggleSelectedForm(form));
  };

  return (
    <form>
      {forms &&
        Object.keys(forms).map((form) => (
          <label className="checkbox-container" key={`checkbox-${form}`}>
            {form}
            <input type="checkbox" onChange={() => handleToggle({ form })} checked={selectedForms.includes(form)} />
            <span className="checkmark" />
          </label>
        ))}
    </form>
  );
};

export const AipCheckboxes = () => {
  const dispatch = useDispatch();
  const { aips } = useSelector((state) => state.database);
  const { selectedAips } = useSelector((state) => state.ui);
  const handleToggle = ({ aip }) => {
    dispatch(uiSliceActions.toggleSelectedAips(aip));
  };

  return (
    <form>
      {aips &&
        aips.map((aip) => (
          <label className="checkbox-container" key={`checkbox-${aip}`}>
            {aip}
            <input type="checkbox" onChange={() => handleToggle({ aip })} checked={selectedAips.includes(aip)} />
            <span className="checkmark" />
          </label>
        ))}
    </form>
  );
};
