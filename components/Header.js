import React from 'react';
import { Header, Body, Title } from 'native-base';
import { View, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import COLORS from '../constants/Colors';
import { firebaseHelper } from '../api/firebaseHelper';

const icon = require('../assets/images/icon_white_cropped.png');

export default class AppHeader extends React.Component {
  
  constructor(props) {
    super(props);
    this.onSettingsSelected = this.onSettingsSelected.bind(this);
  }

  onSettingsSelected() {
    firebaseHelper.logout();
    this.props.navigation.navigate('Loading');
  }

  render() {
    return (
      <Header style={{ backgroundColor: COLORS.primary }}>
        <Body
          style={{
            flex: 1,
            flexDirection: 'row',
          }}
        >
          <View style={{ paddingLeft: 15, flex: 1, flexDirection: 'row', alignItems: 'center', }}>
            <Image style={{ width: 20, height: 20, }} source={icon} />
            <Title
                style={{
                  color: 'white',
                  paddingLeft: 10,
                }}
            >
                Memory Assistant
            </Title>
          </View>
          <TouchableOpacity
            onPress={this.onSettingsSelected}
            style={{ paddingRight: 25, }}
            >
            <Ionicons
              name="ios-settings"
              size={23}
              color={'white'}
            />
          </TouchableOpacity>
         </Body>
        </Header>
    );
  }
}
