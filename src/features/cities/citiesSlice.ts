import { createSelector, createSlice } from '@reduxjs/toolkit';

import { RootState } from '../../store';

const initialState = {
  ids: [524901, 703448, 2643743, 2995468],
};

export const citiesSlice = createSlice({
  name: 'cities',
  initialState,
  reducers: {
    addCityId: (state, action) => {
      if (state.ids.includes(action.payload || !action.payload)) {
        return;
      }
      state.ids.push(action.payload);
    },
    removeCity: (state, action) => {
      state.ids = state.ids.filter((id) => id !== action.payload);
    },
  },
});

export default citiesSlice.reducer;

export const { removeCity, addCityId } = citiesSlice.actions;

const selectCitiesState = (state: RootState) => state.cities;

export const selectIds = createSelector(selectCitiesState, (cities) => cities.ids);
