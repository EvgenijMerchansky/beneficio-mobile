import React from 'react';
import {
  createStackNavigator,
  createAppContainer
} from 'react-navigation';

import SplashScreen from './screens/SplashScreen';
import SignUp from './screens/SignUp';

const Navigator = createStackNavigator({
  SplashScreen: {
    screen: SplashScreen,
    navigationOptions: {
    title: '',
      header: null
    },
  },
  SignUp: {
    screen: () => <SignUp text="Sign up screen"/>,
    navigationOptions: {
      title: '',
      headerStyle: {
        backgroundColor: '#f9f8fd',
        borderBottomWidth: 0,
      },
      headerTitleStyle: {
        fontWeight: 'bold',
      },
      headerTintColor: '#000',
    },
  },
});

const AppContainer = createAppContainer(Navigator);

export default function App() {
  return (
    <AppContainer rootTag="SplashScreen"/>
  );
}