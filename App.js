import React from 'react';
import { Platform, StatusBar, StyleSheet,  View, ScrollView, Text, TextInput, TouchableOpacity, Switch } from 'react-native';
import AppNavigator from './navigation/AppNavigator';
import SplashScreen from 'react-native-splash-screen'



export default class App extends React.Component {

  constructor(props) {
    super(props);
    console.disableYellowBox = true;
  }

  render() {
    return (
        <View style={styles.container}>
          {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
          <AppNavigator />
        </View>
      );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f3f2f2',
        marginTop: 30
    },
    item: {
        fontSize: 20,
    },
    line: {
        flex: 1,
        height: 0.3,
        backgroundColor: 'darkgray',
    },
})
