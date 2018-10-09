import React from 'react';
import { createSwitchNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import LoadingScreen from '../screens/LoadingScreen'
import SignUpScreen from '../screens/SignUpScreen'
import LoginScreen from '../screens/LoginScreen'

export default createSwitchNavigator({
  Loading: LoadingScreen,
  Login: LoginScreen,
  SignUp: SignUpScreen,
  Main: MainTabNavigator,
});
