import React from 'react';
import { View } from 'react-native';

export default class Divider extends React.Component {
  render() {
    return (
      <View style={{ borderBottomColor: 'grey', borderBottomWidth: 1, }} />
    );
  }
}
