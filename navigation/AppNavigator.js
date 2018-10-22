import { createSwitchNavigator } from 'react-navigation';

import LoadingScreen from '../screens/LoadingScreen'
import SignUpScreen from '../screens/SignUpScreen'
import LoginScreen from '../screens/LoginScreen'
import PostLoginLoadingScreen from '../screens/PostLoginLoadingScreen'
import RootComponent from './RootComponent';

export default createSwitchNavigator({
  Loading: LoadingScreen,
  Login: LoginScreen,
  SignUp: SignUpScreen,
  PostLoginLoading: PostLoginLoadingScreen,
  Main: RootComponent,
});
