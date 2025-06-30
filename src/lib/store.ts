import { configureStore } from '@reduxjs/toolkit';
import trucksReducer from './features/trucks/trucksSlice';
import trailersReducer from './features/trailers/trailersSlice';
import usersReducer from './features/users/usersSlice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      trucks: trucksReducer,
      trailers: trailersReducer,
      users: usersReducer,
    },
  })
}

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];