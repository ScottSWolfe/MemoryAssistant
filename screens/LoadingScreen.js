import React from 'react'
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native'
import { firebaseHelper } from '../api/firebaseHelper';

export default class Loading extends React.Component {

  componentDidMount() {
    firebaseHelper.setupNotificationListeners();
    firebaseHelper.onAuthStateChanged(user => {
      this.props.navigation.navigate(user ? 'PostLoginLoading' : 'SignUp');
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Loading</Text>
        <ActivityIndicator size="large" />
      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})
