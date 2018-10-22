import React from 'react';
import { Container, Spinner } from 'native-base';

import MainTabNavigator from './MainTabNavigator';
import Header from '../components/Header';

export default class RootComponent extends React.Component {
  render = () => {
    return (
        <Container >
          <Header />
          <MainTabNavigator />
        </Container>
    );
  };
}
