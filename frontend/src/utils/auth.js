
import { PublicClientApplication } from '@azure/msal-browser';

/**
 * Get Msal Object
 */
export const getMsalObject = async () => {
  const settingsLocation = process.env.NODE_ENV === 'development' ? 'settings.local.json' : 'settings.json';
  const settings = await fetch(settingsLocation).then((response) => {
    console.log(response);
    return response.json();
  });
  const { APP_ID, REDIRECT_URI, AUTHORITY } = settings;
  const msal = new PublicClientApplication({
    auth: {
      clientId: APP_ID,
      authority: AUTHORITY,
      redirectUri: REDIRECT_URI,
    },
    // cache: {
    //   cacheLocation: 'localStorage',
    //   storeAuthStateInCookie: true,
    // },
  });
  return msal;
};

/**
 * Logout Function
 * @param {*} loginResponse
 */
export const logout = async (loginResponse) => {
  const msalObject = await getMsalObject();
  // fetch settings
  const settingsLocation = process.env.NODE_ENV === 'development' ? 'settings.local.json' : 'settings.json';
  const redirectUri = await fetch(settingsLocation)
    .then((response) => {
      return response.json();
    })
    .then((settings) => {
      return settings.REDIRECT_URI;
    });
  // logout request
  const logoutRequest = {
    account: await msalObject.getAccountByUsername(loginResponse.account.username),
    mainWindowRedirectUri: redirectUri,
  };
  // logout popup
  await msalObject.logoutPopup(logoutRequest);
};

/**
 * Get Azure Storage Token
 * @param {*} loginResponse
 */
export const getStorageToken = async (loginResponse) => {
  const msalObject = await getMsalObject();
  // Request Blob Storage access token
  const settingsLocation = process.env.NODE_ENV === 'development' ? 'settings.local.json' : 'settings.json';
  const blobUri = await fetch(settingsLocation)
    .then((response) => {
      return response.json();
    })
    .then((settings) => {
      return settings.BLOB_URI;
    });
  const userName = msalObject.getAccountByUsername(loginResponse.account.username);
  let storageResponse = null;
  if (userName) {
    console.log('getStorageToken1', msalObject, loginResponse, loginResponse.account, userName);
    const request = {
      account: userName,
      scopes: [`${blobUri}/user_impersonation`],
    };
    storageResponse = await msalObject.acquireTokenSilent(request);
    console.log('getStorageToken2', storageResponse);
  } else {
    logout(loginResponse);
  }
  return storageResponse;
};