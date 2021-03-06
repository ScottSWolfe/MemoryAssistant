import { createSwitchNavigator } from 'react-navigation';

import LoadingScreen from '../screens/LoadingScreen'
import SignUpScreen from '../screens/SignUpScreen'
import LoginScreen from '../screens/LoginScreen'
import PostLoginLoadingScreen from '../screens/PostLoginLoadingScreen'
import MainTabNavigator from './MainTabNavigator';


export default createSwitchNavigator({
  Loading: LoadingScreen,
  SignUp: SignUpScreen,
  Login: LoginScreen,
  PostLoginLoading: PostLoginLoadingScreen,
  Main: MainTabNavigator,
});
