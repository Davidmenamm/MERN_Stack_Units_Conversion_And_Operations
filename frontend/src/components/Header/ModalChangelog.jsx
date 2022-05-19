/* eslint-disable react/no-array-index-key */
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { uiSliceActions } from '@features/ui.slice';
import Changelogs from '@utils/changelog';

import '@styles/ModalChangelog.scss';

const ModalChangelog = () => {
  const dispatch = useDispatch();

  return (
    <div className="modal-changelog">
      <div className="modal-changelog__content">
        <div className="modal-changelog__content__header">
          <h2 className="modal-changelog__content__header__title">What&apos;s new in the App?</h2>
        </div>
        <div className="modal-changelog__content__body">
          {Changelogs.map((changelog) => (
            <div key={`modal-changelog-${changelog.version}`}>
              <h3 key={`modal-changelog-${changelog.version}-title`}>{changelog.version}</h3>
              <ul>
                {changelog.changes.map((change, index) => (
                  <li key={`modal-changelog-${changelog.version}-${index}`}>{change}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="modal-changelog__content__footer">
          <button
            type="button"
            className="modal-changelog__content__footer__button"
            onClick={() => dispatch(uiSliceActions.toggleOpenChangelog())}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalChangelog;
