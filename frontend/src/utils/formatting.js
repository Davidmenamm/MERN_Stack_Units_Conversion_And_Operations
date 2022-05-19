/**
 * To adapt format of any value in the application
 */

/**
 * Format dates in objects to be serializable in redux
 */
export const formatDatesInObject = (obj) => {
  const newObj = {
    ...obj,
    expiresOn: new Date(obj.expiresOn).toUTCString(),
    extExpiresOn: new Date(obj.extExpiresOn).toUTCString(),
  };
  return newObj;
};
