import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import { weatherApi } from './api';

const rootReducer = combineReducers({
  [weatherApi.reducerPath]: weatherApi.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(weatherApi.middleware),
});

setupListeners(store.dispatch);
