import React from 'react';
import Root from './src/native';
import store from './src/js/store';

export default function App() {
  return <Root store={store} />;
}
