import React from 'react'
import { Image, StyleSheet, Text, TextInput, View, Button } from 'react-native'
import { firebaseHelper } from '../api/firebaseHelper';

export default class SignUp extends React.Component {

  state = { email: '', password: '', errorMessage: null }

  handleSignUp = () => {
    firebaseHelper.signUp(this.state.email, this.state.password)
      .then(() => this.props.navigation.navigate('PostLoginLoading'))
      .catch(error => this.setState({ errorMessage: error.message }));
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={ [styles.subcontainer, styles.textContainer] } >
        <Image source={require('../assets/images/icon_black.png')} style={{ width: 100, height: 100 }} />
          <Text style={{ fontSize: 34,  }}>Memory Assistant</Text>
          <Text style={{ fontSize: 34,  }}></Text>
          <Text style={{ fontSize: 28 }}>Sign Up</Text>
          {this.state.errorMessage &&
            <Text style={{ color: 'red' }}>
              {this.state.errorMessage}
            </Text>}
          <TextInput
            placeholder="Email"
            autoCapitalize="none"
            underlineColorAndroid="transparent"
            underlineColor="transparent"
            underline
            style={styles.textInput}
            onChangeText={email => this.setState({ email })}
            value={this.state.email}
          />
          <TextInput
            secureTextEntry
            placeholder="Password"
            autoCapitalize="none"
            underlineColorAndroid="transparent"
            underlineColor="transparent"
            style={[styles.textInput,]}
            onChangeText={password => this.setState({ password })}
            value={this.state.password}
          />
        </View>
        <View style={ [styles.subcontainer, ] } >
          <Button title="Sign Up" onPress={this.handleSignUp} />
        </View>
        <View style={ [styles.subcontainer, ] } >
          <Button
            title="Already have an account? Login"
            onPress={() => this.props.navigation.navigate('Login')}
          />
        </View>
      </View>
    )
  }
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  subcontainer: {
    alignItems: 'center',
    padding: 5,
  },
  textContainer: {
    width: '100%',
  },
  textInput: {
    height: 60,
    width: '90%',
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 8,
    fontSize: 26
  }
})
