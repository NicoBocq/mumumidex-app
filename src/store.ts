import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import { weatherApi } from './services/weatherApi';
import uiSlice from './uiSlice';

const rootReducer = combineReducers({
  [weatherApi.reducerPath]: weatherApi.reducer,
  ui: uiSlice,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(weatherApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof rootReducer>;
