import React from 'react';
import { TextInput, ImageBackground, StyleSheet, StatusBar, Dimensions } from 'react-native';
import { Block, Button, Text, theme } from 'galio-framework';
import index from "../src/js/index";
import * as SecureStore from 'expo-secure-store';

const { height, width } = Dimensions.get('screen');

import materialTheme from '../constants/Theme';
import Images from '../constants/Images';

export default class Onboarding extends React.Component {
  state = {
    isSignedIn: false,
    user: []
  }

  async componentDidMount(){
    try {
      const credentials = await SecureStore.getItemAsync('kwagu_key');
      // const credentials = await SecureStore.deleteItemAsync('kwagu_key');

      if (credentials && !this.state.user.first_name) {
        const myJson = JSON.parse(credentials);
        this.setState({
          isSignedIn: true,
          user: myJson
        });
      }
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    const { navigation } = this.props;
    return (
      <Block flex style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Block flex center>
          <ImageBackground
            source={require('./../assets/images/onboard.jpg')}
            style={{ height: height, width: width, marginTop: '-70%', zIndex: 1 }}
          />
        </Block>
        <Block flex space="between" style={styles.padded}>
          <Block flex space="around" style={{ zIndex: 2 }}>
            <Block>
              <Block>
                <Text color="white" size={40}>Lifestyle</Text>
              </Block>
              <Block row>
                <Text color="white" size={50}>Management</Text>
              </Block>
              <Text size={18} color='rgba(255,255,255,0.6)'>
                If this is your first time with Belux, schedule a free consultation with one of our associates.
                View our services and book an appointment for our assistance.
              </Text>
            </Block>
              {this.state.isSignedIn ? (
                <Block center>
                    <Button shadowless style={styles.button} color={materialTheme.COLORS.BUTTON_COLOR} onPress={() => navigation.navigate('App')}>
                      GET STARTED
                    </Button>
                </Block>
              ) :(
                <Block center>
                    <Button shadowless style={styles.button} color={materialTheme.COLORS.BUTTON_COLOR} onPress={() => navigation.navigate('Login')}>
                      Login
                    </Button>
                    <Button shadowless style={styles.button} color={materialTheme.COLORS.PRIMARY} onPress={() => navigation.navigate('Register')}>
                      Register
                    </Button>
                </Block>
              )}
          </Block>
        </Block>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
  },
  padded: {
    paddingHorizontal: theme.SIZES.BASE * 2,
    position: 'relative',
    bottom: theme.SIZES.BASE,
  },
  button: {
    width: width - theme.SIZES.BASE * 4,
    height: theme.SIZES.BASE * 3,
    shadowRadius: 0,
    shadowOpacity: 0,
  },
});
