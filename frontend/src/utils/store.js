import { combineReducers, configureStore } from '@reduxjs/toolkit';
import uiReducer from '@features/ui.slice';
import authReducer from '@features/auth.slice';
import pagesReducer from '@features/pages.slice';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage'

/**
 * Combine Reducers
 */
const appReducer = combineReducers({
  ui: uiReducer,
  auth: authReducer,
  pages: pagesReducer,
})
const rootReducer = (state, action) => {
  if (action.type === 'auth/clearResults') {
    // this applies to all keys defined in persistConfig(s)
    localStorage.removeItem('persist:root');
    state = undefined;
   }
  return appReducer(state, action);
 }

/** Configure Store and Persistance */
const persistConfig = {
  key: 'root',
  version: 1,
  storage,
}
const rootReducerPersist = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
  reducer: rootReducerPersist,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
export const persistor = persistStore(store);

/**
 * Export Sotre
 */
export default store;
