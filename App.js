import React from 'react';
import Setup from './src/native';
import configureStore from './src/store/index';

const { persistor, store } = configureStore();
console.log(store);

export default function App() {
  return <Setup store={store} persistor={persistor} />;
}
