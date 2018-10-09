import Expo from 'expo';
import React from 'react';
import { StatusBar, View } from 'react-native';
import { Container, Spinner } from 'native-base';
import { ReactiveBase } from '@appbaseio/reactivesearch-native';

import CONFIG from '../constants/Config';
import COLORS from '../constants/Colors';
//import MainTabNavigator from './MainTabNavigator';
import AppNavigator from './AppNavigator';

export default class RootComponent extends React.Component {
  render = () => {
    return (
        <Container >
          <AppNavigator />
        </Container>
    );
  };
}
