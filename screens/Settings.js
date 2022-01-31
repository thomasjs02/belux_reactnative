import React from 'react';
import { View, TouchableOpacity, StyleSheet, TextInput, Dimensions, ScrollView, Image, ImageBackground, Platform } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { FancyAlert, LoadingIndicator } from 'react-native-expo-fancy-alerts';
// import { SecureStore } from 'expo';
import { Block, Text, theme } from 'galio-framework';
import { LinearGradient } from 'expo-linear-gradient';

import { Icon } from '../components';
import { Images, materialTheme } from '../constants';
import { HeaderHeight } from "../constants/utils";
import { TextInputMask } from 'react-native-masked-text'

import index from "./../src/js/index";
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('screen');
const thumbMeasure = (width - 48 - 32) / 3;

export default class Settings extends React.Component {

  state = {
    id: '',
    token: '',
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    isLoading: false,
    loginModal: false
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
          phone: myJson.phone,
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
      // alert('saved');
      // this.setState({ email: '', password: '' });
    } catch (e) {
      console.log(e);
    }
  }

  __submitProfileForm = async () => {
    var id = this.state.id
    var token = this.state.token
    var first_name = this.state.first_name
    var last_name = this.state.last_name
    var email = this.state.email
    var phone = this.state.phone;
    this.setState({
      isLoading: true,
    });
    fetch("https://central.kwagu.com/applications/belux/admin/api/user.php", {
      method: 'POST',
      headers: new Headers({
                'Content-Type': 'application/x-www-form-urlencoded', // <-- Specifying the Content-Type
        }),
      body: "id="+id+"&token=" +token+"&first_name=" +first_name+"&last_name=" +last_name+"&email=" +email+"&phone=" +phone
    })
    .then((response) => response.json())
    .then((responseJson) => {
      if(responseJson){
        const credentials = { id, token, email, first_name, last_name, phone };
        this.storeData(credentials);
        this.setState({
          loginModal: true,
          isLoading: false,
        });
        // navigation.navigate('A-1 Complete');

      }else{
        alert('Incorrect login')
      }
    })
    .catch((error) => {
        console.error(error);
    });

  }

  render() {

    return (
      <Block flex style={styles.profile}>
        <Block flex>
          <ImageBackground
            source={{uri: Images.Profile}}
            style={styles.profileContainer}
            imageStyle={styles.profileImage}>
            <Block flex style={styles.profileDetails}>
              <Block style={styles.profileTexts}>
                <Text color="white" size={28} style={{ paddingBottom: 8 }}>
                  {this.state.first_name + ' ' + this.state.last_name}
                  {/* John Doe */}
                </Text>
                <Block row space="between">
                  <Block row>
                    <Block middle style={styles.pro}>
                      <Text size={16} color="white">Pro</Text>
                    </Block>
                    <Text color="white" size={16} muted style={styles.seller}>Seller</Text>
                    <Text size={16} color={materialTheme.COLORS.WARNING}>
                      4.8 <Icon name="shape-star" family="GalioExtra" size={14} />
                    </Text>
                  </Block>
                </Block>
              </Block>
              <LinearGradient colors={['rgba(0,0,0,0)', 'rgba(0,0,0,1)']} style={styles.gradient} />
            </Block>
          </ImageBackground>
        </Block>
        <Block flex style={styles.options}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Block style={styles.container}>
              <TextInput
                value={this.state.first_name}
                keyboardType='default'
                onChangeText={(first_name) => this.setState({ first_name })}
                placeholder='First Name'
                placeholderTextColor='#333333'
                style={styles.input}
              />
              <TextInput
                value={this.state.last_name}
                keyboardType='default'
                onChangeText={(last_name) => this.setState({ last_name })}
                placeholder='Last Name'
                placeholderTextColor='#333333'
                style={styles.input}
              />
              <TextInput
                value={this.state.email}
                keyboardType='email-address'
                onChangeText={(email) => this.setState({ email })}
                placeholder='Email'
                placeholderTextColor='#333333'
                style={styles.input}
              />
              <TextInputMask
                type={'custom'}
                options={{
                  mask: '(999) 999-9999'
                }}
                value={this.state.phone}
                onChangeText={text => {
                  this.setState({
                    phone: text
                  })
                }}
              />
              <TextInput
                value={this.state.phone}
                keyboardType='phone-pad'
                onChangeText={(phone) => this.setState({ phone })}
                placeholder='Phone #'
                placeholderTextColor='#333333'
                style={styles.input}
              />
              <TouchableOpacity
                style={styles.button}
              >
                <Text style={styles.buttonText} onPress={this.__submitProfileForm}> Save </Text>
              </TouchableOpacity>
            </Block>
          </ScrollView>
        </Block>
        <FancyAlert
        visible={this.state.loginModal}
        icon={<View style={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'green',
          borderRadius: 50,
          width: '100%',
        }}><Text>👍</Text></View>}
        style={{ backgroundColor: 'white' }}
      >
        <Text style={{ marginTop: -16, marginBottom: 32 }}>Your info successfully saved!</Text>
              <TouchableOpacity
                style={styles.button}
              >
                <Text style={styles.buttonText} onPress={(loginModal) => this.setState({ loginModal: false })}> 💯 </Text>
              </TouchableOpacity>
      </FancyAlert>
      <LoadingIndicator visible={this.state.isLoading} />
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profile: {
    marginTop: Platform.OS === 'android' ? -HeaderHeight : 0,
    marginBottom: -HeaderHeight * 2,
  },
  profileImage: {
    width: width * 1.1,
    height: 'auto',
  },
  profileContainer: {
    width: width,
    height: height / 2,
  },
  profileDetails: {
    paddingTop: theme.SIZES.BASE * 4,
    justifyContent: 'flex-end',
    position: 'relative',
  },
  profileTexts: {
    paddingHorizontal: theme.SIZES.BASE * 2,
    paddingVertical: theme.SIZES.BASE * 2,
    zIndex: 2
  },
  pro: {
    backgroundColor: materialTheme.COLORS.LABEL,
    paddingHorizontal: 6,
    marginRight: theme.SIZES.BASE / 2,
    borderRadius: 4,
    height: 19,
    width: 38,
  },
  seller: {
    marginRight: theme.SIZES.BASE / 2,
  },
  options: {
    position: 'relative',
    padding: theme.SIZES.BASE,
    marginHorizontal: theme.SIZES.BASE,
    marginTop: -theme.SIZES.BASE * 7,
    borderTopLeftRadius: 13,
    borderTopRightRadius: 13,
    backgroundColor: theme.COLORS.WHITE,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 8,
    shadowOpacity: 0.2,
    zIndex: 2,
  },
  thumb: {
    borderRadius: 4,
    marginVertical: 4,
    alignSelf: 'center',
    width: thumbMeasure,
    height: thumbMeasure
  },
  gradient: {
    zIndex: 1,
    left: 0,
    right: 0,
    bottom: 0,
    height: '30%',
    position: 'absolute',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#ffffff',
    width: 200,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: '#333333',
    borderRadius: 25,
    marginBottom: 10,
  },
  buttonText: {
    fontFamily: 'Baskerville',
    fontSize: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: 200,
    fontFamily: 'Baskerville',
    fontSize: 20,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: '#333333',
    marginVertical: 10,
  },
});
