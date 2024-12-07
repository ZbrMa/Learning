import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { userApi } from '../api/userApiSlice';
import authReducer from '../api/authSlice';
import { eventApi } from '../api/eventApiSlice';
import { filtersApi } from '../api/filtersApiSlice';
import { placeApi } from '../api/placeApiSlice';
import { notificationsApi } from '../api/notificationApiSlice';
import apiSlice from '../api/apiSlice';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'],
};

const rootReducer = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,
  auth: persistReducer(persistConfig, authReducer),
});

export const userStore = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(apiSlice.middleware,userApi.middleware),
});

export const persistor = persistStore(userStore);

export type RootState = ReturnType<typeof userStore.getState>;
export type AppDispatch = typeof userStore.dispatch;
