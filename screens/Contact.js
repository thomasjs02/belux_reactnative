import React, { Component } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import { View, ImageBackground, Dimensions } from 'react-native';
import { Block } from 'galio-framework';
import * as SecureStore from 'expo-secure-store';
import OnboardingScreen from "./Onboarding";
const { height, width } = Dimensions.get('screen');

export default class Example extends Component {
  state = {
    messages: [],
    user: [],
  };

  async componentDidMount() {
    try {
      const credentials = await SecureStore.getItemAsync('kwagu_key');
      if (credentials) {
        let nav = this.props.navigation;
        const myJson = JSON.parse(credentials);
        this.setState({
          user: myJson,
        });
        if(!(myJson.id && myJson.token)){
          SecureStore.deleteItemAsync('kwagu_key');
          SecureStore.setItemAsync('kwagu_login', 1);
          nav.navigate('Login');
        }
        fetch("https://central.kwagu.com/applications/belux/admin/api/mail.php", {
          method: 'POST',
          headers: new Headers({
            'Content-Type': 'application/x-www-form-urlencoded', // <-- Specifying the Content-Type
          }),
          body: "id=" + myJson.id + "&token=" + myJson.token // <-- Post parameters
        })
          .then((response) => response.json())
          .then((responseJson) => {
            if (responseJson) {
              var i2 = 0;
              var msg = [];
              for (var i = 0; i < responseJson.length; i++) {
                if (responseJson[i].type == 'contact') {
                  if (responseJson[i].note) {
                    msg[i2] = {
                      _id: i2,
                      text: responseJson[i].note,
                      createdAt: responseJson[i].date,
                      user: {
                        _id: 1,
                        name: 'A-1 Complete',
                        avatar: 'https://central.kwagu.com/applications/belux/template/assets/images/logo-2.png',
                      }
                    }
                    i2++;
                  }
                  msg[i2] = {
                    _id: i2,
                    text: responseJson[i].message,
                    createdAt: responseJson[i].date,
                    user: {
                      _id: 0,
                      name: responseJson[i].first_name + ' ' + responseJson[i].last_name,
                      avatar: 'https://facebook.github.io/react/img/logo_og.png',
                    }
                  }
                  i2++;
                }
              }
              this.setState({ messages: msg });
            } else {
              SecureStore.setItemAsync('kwagu_login', 1);
              SecureStore.deleteItemAsync('kwagu_key');
              nav.navigate('Login');
            }
          })
          .catch((error) => {
            console.error(error);
          });
      }
    } catch (e) {
      console.log(e);
      SecureStore.setItemAsync('kwagu_login', 1);
      SecureStore.deleteItemAsync('kwagu_key');
      nav.navigate('Login');
    }
  }

  onSend(messages = []) {
    var msg = messages[0].text;
    console.log('id: ' + this.state.user.id);
    console.log('token: ' + this.state.user.token);
    fetch("https://central.kwagu.com/applications/belux/admin/api/message.php", {
      method: 'POST',
      headers: new Headers({
                'Content-Type': 'application/x-www-form-urlencoded', // <-- Specifying the Content-Type
        }),
      body: "id="+this.state.user.id+"&token=" +this.state.user.token+"&message=" +msg
    })
    .then((response) => response.text())
    .then((responseJson) => {
      if(responseJson){
        this.setState((previousState) => ({
          messages: GiftedChat.append(previousState.messages, messages),
        }));
      }else{
        // SecureStore.setItemAsync('kwagu_login', 1);
        // SecureStore.deleteItemAsync('kwagu_key');
        // nav.navigate('Login');
        // alert("The chat is not working momentarily.");
      }
    })
    .catch((error) => {
        console.error(error);
    });
  }

  render() {
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={(messages) => this.onSend(messages)}
        user={{
          _id: 0,
        }}
      />
    );
  }
}
