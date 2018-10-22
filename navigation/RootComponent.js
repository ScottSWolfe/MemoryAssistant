import React from 'react';
import { Container } from 'native-base';

import MainTabNavigator from './MainTabNavigator';
import Header from '../components/Header';

export default class RootComponent extends React.Component {
  render = () => {
    return (
        <Container >
          <Header navigation={this.props.navigation} />
          <MainTabNavigator />
        </Container>
    );
  };
}
