import React from 'react';
import Navigator from './navigation';
import { createAppContainer } from 'react-navigation';

const AppContainer = createAppContainer(Navigator);

export default function App() {
  return (
    <AppContainer rootTag="SplashScreen"/>
  );
}