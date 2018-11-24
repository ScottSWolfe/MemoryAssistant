import React from 'react'
import { Image, StyleSheet, Text, TextInput, View, Button } from 'react-native'
import {firebaseHelper} from '../api/firebaseHelper';

export default class Login extends React.Component {
  state = { email: '', password: '', errorMessage: null }

  handleLogin = () => {
    const { email, password } = this.state;
    firebaseHelper.login(email, password)
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
          <Text style={{ fontSize: 28  }}>Login</Text>
          {this.state.errorMessage &&
            <Text style={{ color: 'red' }}>
              {this.state.errorMessage}
            </Text>}
          <TextInput
            style={styles.textInput}
            autoCapitalize="none"
            placeholder="Email"
            underlineColorAndroid="transparent"
            underlineColor="transparent"
            onChangeText={email => this.setState({ email })}
            value={this.state.email}
          />
          <TextInput
            secureTextEntry
            style={styles.textInput}
            autoCapitalize="none"
            placeholder="Password"
            underlineColorAndroid="transparent"
            underlineColor="transparent"
            onChangeText={password => this.setState({ password })}
            value={this.state.password}
          />
        </View>
        <View style={ styles.subcontainer }>
          <Button title="Login" onPress={this.handleLogin} />
        </View>
        <View style={ styles.subcontainer }>
          <Button
            title="Don't have an account? Sign Up"
            onPress={() => this.props.navigation.navigate('SignUp')}
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
