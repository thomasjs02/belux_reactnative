import React from 'react';
import {StyleSheet, ImageBackground, KeyboardAvoidingView, TextInput, TouchableOpacity, Dimensions, ScrollView} from 'react-native';
import {Button, Block, Text, Input, theme} from 'galio-framework';
// import { SecureStore } from 'expo';
import * as SecureStore from 'expo-secure-store';
import index from "./../src/js/index";

import {LinearGradient} from 'expo-linear-gradient';
import {materialTheme} from '../constants/';
import {HeaderHeight} from "../constants/utils";

const {width} = Dimensions.get('window');
// const { height, width } = Dimensions.get('screen');

export default class Login extends React.Component {

    state = {
        token: '',
        email: '',
        password: '',
    }


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

    __submitLoginForm = async () => {
        let nav = this.props.navigation;
        var token = this.state.token;
        var email = this.state.email;
        var password = this.state.password;
        fetch("https://central.kwagu.com/applications/belux/admin/json/user-auth.php", {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/x-www-form-urlencoded', // <-- Specifying the Content-Type
            }),
            body: "email=" + email + "&password=" + password // <-- Post parameters
        })
            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson) {
                    const id = responseJson.id;
                    const token = responseJson.token;
                    const first_name = responseJson.first_name;
                    const last_name = responseJson.last_name;
                    const phone = responseJson.phone;
                    const credentials = {id, token, email, password, first_name, last_name, phone};
                    this.storeData(credentials);
                    nav.navigate('App');

                } else {
                    console.log(responseJson);
                    alert('Incorrect login')
                }
            })
            .catch((error) => {
                console.error(error);
                alert('Incorrect login')
            });

    }

    render() {
        const { navigation } = this.props;
        return (
            <LinearGradient
                start={{x: 0, y: 0}}
                end={{x: 0.25, y: 1.1}}
                locations={[0.2, 1]}
                colors={['#211700', '#3d2d02']}
                style={[styles.signin, {flex: 1, paddingTop: theme.SIZES.BASE * 4}]}>
                <Block flex middle>
                    <KeyboardAvoidingView behavior="padding" enabled>

                        <Text style={styles.titleText}>Belux</Text>
                        <Text style={styles.titleText}>Login</Text>
                        <TextInput
                            value={this.state.email}
                            keyboardType='email-address'
                            onChangeText={(email) => this.setState({email})}
                            placeholder='email'
                            placeholderTextColor='#ffffff'
                            style={styles.input}
                        />
                        <TextInput
                            value={this.state.password}
                            onChangeText={(password) => this.setState({password})}
                            placeholder={'password'}
                            secureTextEntry={true}
                            placeholderTextColor='#ffffff'
                            style={styles.input}
                        />
                        <TouchableOpacity
                            style={styles.button}
                        >
                            <Text style={styles.buttonText} onPress={this.__submitLoginForm}> Login </Text>
                        </TouchableOpacity>

                    </KeyboardAvoidingView>
                </Block>
                <Button size="large" color="transparent" shadowless onPress={() => navigation.navigate('Register')}>
                    <Text center color={theme.COLORS.WHITE} size={theme.SIZES.FONT * 0.75}>
                        Create an account? Register
                    </Text>
                </Button>
            </LinearGradient>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffffcc',
    },
    titleText: {
        fontFamily: 'Baskerville',
        fontSize: 50,
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff'
    },
    button: {
        alignItems: 'center',
        backgroundColor: '#ffffff',
        width: 200,
        height: 44,
        padding: 10,
        borderWidth: 1,
        borderColor: '#ffffff',
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
        borderColor: '#ffffff',
        color: '#ffffff',
        marginVertical: 10,
    },
});