import React from 'react';
import { Platform, StatusBar, StyleSheet,  View } from 'react-native';

import AppNavigator from './navigation/AppNavigator';
import Colors from './constants/Colors';


export default class App extends React.Component {

  constructor(props) {
    super(props);
    console.disableYellowBox = true;
  }

  render() {
    const isAndroid = Platform.OS === 'android';
    return (
        <View style={styles.container}>
          { isAndroid ? <StatusBar backgroundColor={Colors.primary} /> : <StatusBar barStyle="default" /> }
          <AppNavigator />
        </View>
      );
  }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f3f2f2',
    },
})
