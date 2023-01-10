import * as React from 'react';
import { Provider } from 'react-redux';

import Weather from './src/App';
import { store } from './src/store';

export default function App() {
  return (
    <Provider store={store}>
      <Weather />
    </Provider>
  );
}
