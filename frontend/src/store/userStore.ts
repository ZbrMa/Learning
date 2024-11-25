import { configureStore } from '@reduxjs/toolkit';
import { userApi } from '../api/userApiSlice';
import authReducer from '../api/authSlice';
import { eventApi } from '../api/eventApiSlice';
import { filtersApi } from '../api/filtersApiSlice';

export const userStore = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    [eventApi.reducerPath]: eventApi.reducer,
    [filtersApi.reducerPath]: filtersApi.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware,eventApi.middleware, filtersApi.middleware),
});

export type RootState = ReturnType<typeof userStore.getState>;
export type AppDispatch = typeof userStore.dispatch;