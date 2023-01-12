import * as React from 'react';
import { Provider } from 'react-redux';

import RootApp from './src/RootApp';
import { store } from './src/store';

export default function App() {
  return (
    <Provider store={store}>
      <RootApp />
    </Provider>
  );
}
