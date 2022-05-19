import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getStorageToken } from '@utils/auth';
import { formatDatesInObject } from '@utils/formatting';
import { postData, getData } from '@utils/requests';

export const authDatabase = createAsyncThunk('auth/authDatabase', async ({ host, user, password }) => {
  const response = await postData(`${host}_session`, { name: user, password });
  return response;
});

export const confirmAuth = createAsyncThunk('auth/confirmAuth', async ({ host }) => {
  const response = await getData(`${host}_session`);
  return response;
});

export const authenticateAD = createAsyncThunk('auth/authenticateAD', async ({ msal, settings }) => {
  // login AD popup
  const loginResponse = await msal.loginPopup({
    scopes: settings.SCOPES,
    prompt: 'select_account',
  });
  // Request Blob Storage access token
  const storageResponse = await getStorageToken(loginResponse, msal);
  // response
  console.log('typeoff', new Date(loginResponse.expiresOn).toUTCString());
  const response = {
    loginResponse: formatDatesInObject(loginResponse),
    storageResponse: formatDatesInObject(storageResponse)
  };
  console.log(response);
  // return
  return response;
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: false,
    loginResponse: null,
    storageResponse: null,
    // msalObject: null,
    isLoading: false,
    error: null,
    host: null,
    currentFiles: [],
  },
  reducers: {
    clearResults() {},
    setAuthentication: (state, action) => {
      state.isAuthenticated = action.payload;
    },
    setHost: (state, action) => {
      state.host = action.payload;
    },
    setLoginResponse: (state, action) => {
      state.loginResponse = action.payload;
    },
    setStorageResponse: (state, action) => {
      state.storageResponse = action.payload;
    },
    setCurrentFiles: (state, action) => {
      state.currentFiles = action.payload;
    },
    setAuthenticationInfo: (state, action) => {
      state.msalObject = action.payload.msalObject;
      state.loginResponse = action.payload.loginResponse;
      state.storageResponse = action.payload.storageResponse;
    },
  },
  extraReducers: {
    // Azure AD Authentication
    [authenticateAD.fulfilled]: (state, action) => {
      // state.msalObject = action.payload.msal;
      state.loginResponse = {
        account: action.payload.loginResponse.account,
        expiresOn: action.payload.loginResponse.expiresOn,
      };
      state.storageResponse = {
        accessToken: action.payload.storageResponse.accessToken
      };
      state.isAuthenticated = action.payload.error !== 'unauthorized';
      state.error = action.payload.error ? action.payload.error : null;
      state.isLoading = false;
    },
    [authenticateAD.rejected]: (state) => {
      state.isAuthenticated = false;
    },
    [authenticateAD.pending]: (state) => {
      state.isAuthenticated = false;
      state.error = null;
      state.isLoading = true;
    },
    // normal authentication
    [authDatabase.fulfilled]: (state, action) => {
      state.isAuthenticated = action.payload.error !== 'unauthorized';
      state.error = action.payload.error ? action.payload.error : null;
      state.isLoading = false;
    },
    [authDatabase.rejected]: (state) => {
      state.isAuthenticated = false;
    },
    [authDatabase.pending]: (state) => {
      state.isAuthenticated = false;
      state.error = null;
      state.isLoading = true;
    },
    [confirmAuth.fulfilled]: (state, action) => {
      if (typeof action.payload.error !== 'undefined') {
        state.isAuthenticated = action.payload.error === 'offline' ? true : action.payload.userCtx.name !== null;
      } else {
        state.isAuthenticated = action.payload.userCtx.name !== null;
      }
      state.isLoading = false;
    },
    [confirmAuth.pending]: (state) => {
      state.isAuthenticated = false;
      state.isLoading = true;
    },
    [confirmAuth.rejected]: (state) => {
      state.isAuthenticated = false;
      state.isLoading = false;
    },
  },
});

export const authSliceActions = authSlice.actions;
export default authSlice.reducer;
