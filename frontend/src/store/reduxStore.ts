import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { userApi } from '../api/userApiSlice';
import authReducer from '../api/authSlice';
import apiSlice from '../api/apiSlice';
import langReducer from '../redux/languageSlice';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth','lang'],
};

const rootReducer = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,
  auth: persistReducer(persistConfig, authReducer),
  lang: persistReducer(persistConfig,langReducer),
});

export const reduxStore = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(apiSlice.middleware,userApi.middleware),
});

export const persistor = persistStore(reduxStore);

export type RootState = ReturnType<typeof reduxStore.getState>;
export type AppDispatch = typeof reduxStore.dispatch;
