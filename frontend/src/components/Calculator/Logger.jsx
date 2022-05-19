import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import '@styles/Logger.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { uiSliceActions } from '@features/ui.slice';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

/**
 * Uploader Console
 */
const Logger = ({ log }) => {
  const dispatch = useDispatch();
  // Access Redux State
  // Local State
  const [loading, setLoading] = useState(true);
  const [currentEvents, setCurrentEvents] = useState(null);
  const [currentEventsSearch, setCurrentEventsSearch] = useState(null);

  // handle delete
  const handleDeleteEvent = (event) => {
    const newLog = currentEvents.filter((e) => e._id !== event._id);
    dispatch(uiSliceActions.setLog(newLog));
  };
  // use effect for log change
  useEffect(() => {
    setLoading(true);
    setCurrentEvents(log);
    setCurrentEventsSearch(log);
    setLoading(false);
  }, [log]);

  // Return Display
  return (
    <>
      {!loading && (
        <div className="uploader-console-container">
          {currentEventsSearch &&
            currentEventsSearch.map((event) => {
              return (
                <div key={event._id} className="uploader-console-container__wrapper">
                  <button
                    type="button"
                    className="uploader-console-container__delete-button"
                    onClick={() => handleDeleteEvent(event)}
                  >
                    <FontAwesomeIcon icon={faTrash} size="2x" className="uploader-console-container__delete-icon" />
                  </button>
                  <div className="uploader-console-container__content">
                    {Object.entries(event).map((item) => {
                      let classStyle = 'uploader-console-container__content__item';
                      if (item[0] === 'message') {
                        classStyle = 'uploader-console-container__content__item-extended';
                      }
                      if (item[0] !== '_id') {
                        return (
                          <p key={`${item}`} className={classStyle}>
                            {`${item[0].toLowerCase().replace(/\b(\w)/g, (s) => s.toUpperCase())}:\n${item[1]}`}
                          </p>
                        );
                      }
                    })}
                  </div>
                </div>
              );
            })}
        </div>
      )}
    </>
  );
};

export default Logger;
