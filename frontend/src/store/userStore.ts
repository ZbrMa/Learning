import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { userApi } from '../api/userApiSlice';
import authReducer from '../api/authSlice';
import { eventApi } from '../api/eventApiSlice';
import { filtersApi } from '../api/filtersApiSlice';
import { placeApi } from '../api/placeApiSlice';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'],
};

const rootReducer = combineReducers({
  [userApi.reducerPath]: userApi.reducer,
  [eventApi.reducerPath]: eventApi.reducer,
  [filtersApi.reducerPath]: filtersApi.reducer,
  [placeApi.reducerPath]: placeApi.reducer,
  auth: persistReducer(persistConfig, authReducer),
});

export const userStore = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(userApi.middleware, eventApi.middleware, filtersApi.middleware, placeApi.middleware),
});

export const persistor = persistStore(userStore);

export type RootState = ReturnType<typeof userStore.getState>;
export type AppDispatch = typeof userStore.dispatch;
