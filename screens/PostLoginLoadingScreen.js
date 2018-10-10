import React from 'react'
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native'
import { firebaseHelper } from '../api/firebaseHelper';

export default class PostLoginLoadingScreen extends React.Component {

  componentDidMount() {
    this.loadUserData()
      .then(() => { this.props.navigation.navigate('Main') })
      .catch((error) => { console.log(error) });
  }

  async loadUserData() {
    return firebaseHelper.initializeUserData();
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
