import { createSelector, createSlice } from '@reduxjs/toolkit';

import { weatherApi } from './services/api';
import { RootState } from './store';

const initialState = {
  ids: [524901, 703448, 2643743, 2995468],
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  extraReducers: (builder) => {
    builder.addMatcher(weatherApi.endpoints.getCityId.matchFulfilled, (state, action) => {
      state.ids.push(action.payload);
    });
  },
  reducers: {
    removeCity: (state, action) => {
      state.ids = state.ids.filter((id) => id !== action.payload);
    },
  },
});

export default uiSlice.reducer;

export const { removeCity } = uiSlice.actions;

const selectUiState = (state: RootState) => state.ui;

export const selectIds = createSelector(selectUiState, (ui) => ui.ids.join(','));
