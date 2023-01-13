import { createSelector, createSlice } from '@reduxjs/toolkit';

import { weatherApi } from '../services/weatherApi';
import { RootState } from '../store';

const initialState = {
  ids: [524901, 703448, 2643743, 2995468],
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  // extraReducers: (builder) => {
  //   builder.addMatcher(weatherApi.endpoints.getCityId.matchFulfilled, (state, action) => {
  //     if (state.ids.includes(action.payload)) {
  //       return;
  //     }
  //     state.ids.push(action.payload);
  //   });
  // },
  reducers: {
    addCityId: (state, action) => {
      if (state.ids.includes(action.payload)) {
        return;
      }
      state.ids.push(action.payload);
    },
    removeCity: (state, action) => {
      state.ids = state.ids.filter((id) => id !== action.payload);
    },
  },
});

export default uiSlice.reducer;

export const { removeCity, addCityId } = uiSlice.actions;

const selectUiState = (state: RootState) => state.ui;

export const selectIds = createSelector(selectUiState, (ui) => ui.ids.join(','));
