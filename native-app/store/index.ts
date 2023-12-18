import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { apiSlice } from './features/api/apiSlice';
import machineReducer from './features/machine/machineSlice';
import userReducer from './features/user/userSlice';

export const store = configureStore({
  reducer: {
    machine: machineReducer,
    user: userReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
