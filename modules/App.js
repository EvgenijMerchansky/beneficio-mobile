import React from 'react';
import {
  createStackNavigator,
  createAppContainer
} from 'react-navigation';

import SplashScreen from './screens/SplashScreen';
import SignUp from './screens/SignUp';
import Dashboard from './screens/Dashboard';
import ForgotPassword from './screens/ForgotPassword';

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
  Dashboard: {
    screen: () => <Dashboard text="Dashboard screen"/>,
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
  ForgotPassword: {
    screen: () => <ForgotPassword text="Forgot password screen"/>,
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