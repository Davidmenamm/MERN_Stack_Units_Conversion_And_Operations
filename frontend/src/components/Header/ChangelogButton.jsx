import React from 'react';
import FileIcon from '@assets/file-text.svg';
import { useDispatch, useSelector } from 'react-redux';
import { uiSliceActions } from '@features/ui.slice';
import '@styles/ChangelogButton.scss';

const ChangelogButton = () => {
  const dispatch = useDispatch();
  const { openChangelog } = useSelector((state) => state.ui);

  const classNameChangelogButtonActive = openChangelog ? 'changelog-button--active' : '';

  return (
    <button
      type="button"
      className={`changelog-button ${classNameChangelogButtonActive}`}
      onClick={() => dispatch(uiSliceActions.toggleOpenChangelog())}
    >
      <img src={FileIcon} alt="changelog" className="changelog-button__icon" />
    </button>
  );
};

export default ChangelogButton;
