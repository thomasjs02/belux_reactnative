import React from 'react';
import {Alert, Dimensions, StyleSheet, KeyboardAvoidingView, Platform, TouchableOpacity, TextInput} from 'react-native';

import { Block, Button, Input, Text, theme } from 'galio-framework';

import { LinearGradient } from 'expo-linear-gradient';
import { materialTheme } from '../constants/';
import { HeaderHeight } from "../constants/utils";
import * as SecureStore from "expo-secure-store";

const { height, width } = Dimensions.get('window');

export default class Register extends React.Component {

  state = {
    email: '',
    password: '',
    first: '',
    last: '',
  }

  async componentDidMount(){
    try {
      const credentials = await SecureStore.getItemAsync('kwagu_key');
      console.log('value of credentials: ', credentials);

      if (credentials && !this.state.first_name) {
        const myJson = JSON.parse(credentials);
        this.setState({
          id: myJson.id,
          token: myJson.token,
          first_name: myJson.first_name,
          last_name: myJson.last_name,
          email: myJson.email,
        });
      }
    } catch (e) {
      console.log(e);
    }
  };

  storeData = async (credentials) => {
    try {
      await SecureStore.setItemAsync(
          'kwagu_key',
          JSON.stringify(credentials)
      );
      // this.setState({ email: '', password: '' });
    } catch (e) {
      console.log(e);
    }
  }

  __submitRegisterForm = async () => {
    let nav = this.props.navigation;
    var email = this.state.email;
    var password = this.state.password;
    var first = this.state.first;
    var last = this.state.last;
    fetch("https://central.kwagu.com/applications/belux/admin/json/user-create.php", {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/x-www-form-urlencoded', // <-- Specifying the Content-Type
      }),
      body: "email=" + email + "&password=" + password + "&first=" + first + "&last=" + last // <-- Post parameters
    })
        .then((response) => response.json())
        .then((responseJson) => {
          if (responseJson) {
            const id = responseJson.id;
            const token = responseJson.token;
            const first_name = responseJson.first_name;
            const last_name = responseJson.last_name;
            const phone = responseJson.phone;
            const credentials = {id, token, email, password, first_name, last_name};
            this.storeData(credentials);
            nav.navigate('App');

          } else {
            console.log(responseJson);
            alert('Error')
          }
        })
        .catch((error) => {
          alert("Can't create account.")
          console.error(error);
        });

  }

  render() {
    const { navigation } = this.props;
    return (
        <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 0.25, y: 1.1 }}
            locations={[0.2, 1]}
            colors={['#4B5320', '#15002B']}
            style={[styles.signup, { flex: 1, paddingTop: theme.SIZES.BASE * 4 }]}>
          <Block flex middle>
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "position"} enabled keyboardVerticalOffset={0}>
              <Block flex={1} center space="between">
                <Block center>
                  <Input
                      bgColor='transparent'
                      placeholderTextColor={materialTheme.COLORS.PLACEHOLDER}
                      borderless
                      value={this.state.first}
                      onChangeText={(first) => this.setState({first})}
                      color="white"
                      type="default"
                      placeholder="First Name"
                      autoCapitalize="none"
                      style={[styles.input, this.state.first ? styles.inputActive : null]}
                  />
                  <Input
                      bgColor='transparent'
                      placeholderTextColor={materialTheme.COLORS.PLACEHOLDER}
                      borderless
                      value={this.state.last}
                      onChangeText={(last) => this.setState({last})}
                      color="white"
                      type="default"
                      placeholder="Last Name"
                      autoCapitalize="none"
                      style={[styles.input, this.state.last ? styles.inputActive : null]}
                  />
                  <Input
                      bgColor='transparent'
                      placeholderTextColor={materialTheme.COLORS.PLACEHOLDER}
                      borderless
                      value={this.state.email}
                      onChangeText={(email) => this.setState({email})}
                      color="white"
                      type="email-address"
                      placeholder="Email"
                      autoCapitalize="none"
                      style={[styles.input, this.state.email ? styles.inputActive : null]}
                  />
                  <Input
                      bgColor='transparent'
                      placeholderTextColor={materialTheme.COLORS.PLACEHOLDER}
                      value={this.state.password}
                      onChangeText={(password) => this.setState({password})}
                      borderless
                      color="white"
                      password
                      viewPass
                      placeholder="Password"
                      iconColor="white"
                      style={[styles.input, this.state.password ? styles.inputActive : null]}
                  />
                </Block>
                <Block flex center style={{ marginTop: 20 }}>
                  <TouchableOpacity
                      style={styles.button}
                  >
                    <Text style={styles.buttonText} onPress={this.__submitRegisterForm}> SIGN UP </Text>
                  </TouchableOpacity>
                  <Button size="large" color="transparent" shadowless onPress={() => navigation.navigate('Login')}>
                    <Text center color={theme.COLORS.WHITE} size={theme.SIZES.FONT * 0.75}>
                      Already have an account? Sign In
                    </Text>
                  </Button>
                </Block>
              </Block>
            </KeyboardAvoidingView>
          </Block>
        </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  signup: {
    marginTop: Platform.OS === 'android' ? -HeaderHeight : 0,
  },
  social: {
    width: theme.SIZES.BASE * 3.5,
    height: theme.SIZES.BASE * 3.5,
    borderRadius: theme.SIZES.BASE * 1.75,
    justifyContent: 'center',
    shadowColor: 'rgba(0, 0, 0, 0.3)',
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowRadius: 8,
    shadowOpacity: 1
  },
  input: {
    width: width * 0.9,
    borderRadius: 0,
    color: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: materialTheme.COLORS.PLACEHOLDER,
  },
  inputActive: {
    borderBottomColor: "white",
  },
});
