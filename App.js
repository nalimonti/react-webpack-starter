import React from 'react';
import Setup from './src/native';
import store from './src/js/store';

export default function App() {
  return <Setup store={store} />;
}
