/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

export const trackedSlice = createSlice({
  name: 'tracked',
  initialState: {
    trackedItems: [],
  },
  reducers: {
    addItem: (state, action) => {
      state.trackedItems.push(action.payload);
    },
    setItems: (state, action) => {
      state.trackedItems = action.payload;
    },
  },
});

export const { addItem, setItems } = trackedSlice.actions;

export default trackedSlice.reducer;
