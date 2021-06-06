import { configureStore } from '@reduxjs/toolkit';
import trackedReducer from './trackedSlice';

export default configureStore({
  reducer: {
    tracked: trackedReducer,
  },
});
