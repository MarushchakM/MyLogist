import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './features/trucks/counterSlice';
import trucksReducer from './features/trucks/trucksSlice';
export const makeStore = () => {
  return configureStore({
    reducer: {
      counter: counterReducer,
      trucks: trucksReducer,
    },
  })
}

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];