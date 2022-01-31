import React from 'react';
import {Easing, Animated, Dimensions} from 'react-native';
import {createStackNavigator} from "@react-navigation/stack";
import {createDrawerNavigator} from "@react-navigation/drawer";
import * as SecureStore from 'expo-secure-store';

import {Block, Text, theme} from "galio-framework";

import ComponentsScreen from '../screens/Components';
import HomeScreen from '../screens/Home';
import LoginScreen from '../screens/Login';
import RegisterScreen from '../screens/Register';
import ServicesScreen from '../screens/Shop';
import BookingScreen from '../screens/Booking';
import ContactScreen from '../screens/Contact';
import ItemScreen from '../screens/Item';
import OnboardingScreen from '../screens/Onboarding';
import ProfileScreen from '../screens/Profile';
import SettingsScreen from '../screens/Settings';

import CustomDrawerContent from './Menu';
import {Icon, Header} from '../components';
import {Images, materialTheme} from "../constants/";

const {width} = Dimensions.get("screen");

const Stack = createStackNavigator()
const Drawer = createDrawerNavigator();

const profile = {
    avatar: Images.Profile,
    name: "Tommy Boy",
    type: "Lifestyle Management",
    plan: "Belux",
    rating: 5.0
};

function ProfileStack(props) {
    return (
        <Stack.Navigator initialRouteName="Profile" mode="card" headerMode="screen">
            <Stack.Screen
                name="Profile"
                component={ProfileScreen}
                options={{
                    header: ({navigation, scene}) => (
                        <Header
                            white
                            transparent
                            title="Profile"
                            scene={scene}
                            navigation={navigation}
                        />
                    ),
                    headerTransparent: true
                }}
            />
        </Stack.Navigator>
    );
}

function SettingsStack(props) {
    return (
        <Stack.Navigator initialRouteName="Settings" mode="card" headerMode="screen">
            <Stack.Screen
                name="Settings"
                component={SettingsScreen}
                options={{
                    header: ({navigation, scene}) => (
                        <Header title="Settings" scene={scene} navigation={navigation}/>
                    )
                }}
            />
        </Stack.Navigator>
    );
}

function ComponentsStack(props) {
    return (
        <Stack.Navigator mode="card" headerMode="screen">
            <Stack.Screen
                name="Components"
                component={ComponentsScreen}
                options={{
                    header: ({navigation, scene}) => (
                        <Header title="Components" scene={scene} navigation={navigation}/>
                    )
                }}
            />
        </Stack.Navigator>
    );
}

function LogoutStack(props) {
    const credentials = SecureStore.deleteItemAsync('kwagu_key');
    return (
        <Stack.Navigator mode="card" headerMode="none">
            <Stack.Screen
                name="Onboarding"
                component={OnboardingScreen}
                option={{
                    headerTransparent: true
                }}
            />
            <Stack.Screen name="App" userdata={props} component={AppStack}/>
            <Stack.Screen name="Login" component={LoginStack}/>
            <Stack.Screen name="Register" component={RegisterStack}/>
        </Stack.Navigator>
    );
}

function HomeStack(props) {
    return (
        <Stack.Navigator mode="card" headerMode="screen">
            <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    header: ({navigation, scene}) => (
                        <Header
                            // search
                            // tabs
                            title="Home"
                            navigation={navigation}
                            scene={scene}
                        />
                    )
                }}
            />
            <Stack.Screen
                name="Contact"
                component={ContactScreen}
                options={{
                    header: ({navigation, scene}) => (
                        <Header
                            // search
                            // tabs
                            back={true}
                            title="Contact A-1 Complete"
                            navigation={navigation}
                            scene={scene}
                        />
                    ),
                    headerTransparent: true
                }}
            />
        </Stack.Navigator>
    );
}

function BookingStack(props) {
    return (
        <Stack.Navigator mode="card" headerMode="screen">
            <Stack.Screen
                name="Booking"
                component={BookingScreen}
                options={{
                    header: ({navigation, scene}) => (
                        <Header
                            // search
                            // tabs
                            title="Booking"
                            navigation={navigation}
                            scene={scene}
                        />
                    )
                }}
            />
        </Stack.Navigator>
    );
}

function ContactStack(props) {
    return (
        <Stack.Navigator mode="card" headerMode="screen">
            <Stack.Screen
                name="Contact"
                component={ContactScreen}
                options={{
                    header: ({navigation, scene}) => (
                        <Header
                            // search
                            // tabs
                            back={true}
                            title="Contact"
                            navigation={navigation}
                            scene={scene}
                        />
                    )
                }}
            />
        </Stack.Navigator>
    );
}

function ServicesStack(props) {
    return (
        <Stack.Navigator initialRouteName="Services" mode="card" headerMode="screen">
            <Stack.Screen
                name="Services"
                component={ServicesScreen}
                options={{
                    header: ({navigation, scene}) => (
                        <Header
                            title="Services"
                            scene={scene}
                            navigation={navigation}
                        />
                    )
                }}
            />
            <Stack.Screen
                name="Item"
                component={ItemScreen}
                initialParams={{item: props}}
                options={{
                    header: ({navigation, scene}) => (
                        <Header
                            // search
                            // tabs
                            back={true}
                            title="Session"
                            navigation={navigation}
                            scene={scene}
                        />
                    )
                }}
            />
        </Stack.Navigator>
    );
}

function ItemStack(props) {
    var title = props.route.params.product.title;
    return (
        <Stack.Navigator mode="card" headerMode="screen">
            <Stack.Screen
                name="Item"
                component={ItemScreen}
                initialParams={{item: props, title: title}}
                options={{
                    header: ({navigation, scene}) => (
                        <Header
                            // search
                            // tabs
                            back={true}
                            title={title}
                            navigation={navigation}
                            scene={scene}
                        />
                    )
                }}
            />
        </Stack.Navigator>
    );
}

function LoginStack(props) {
    return (
        <Stack.Navigator mode="card" headerMode="none">
            <Stack.Screen
                name="Login"
                component={LoginScreen}
            />
            {/*<Stack.Screen name="Belux" component={AppStack}/>*/}
        </Stack.Navigator>
    )
        ;
}

function RegisterStack(props) {
    return (
        <Stack.Navigator mode="card" headerMode="screen">
            <Stack.Screen
                name="Register"
                component={RegisterScreen}
            />
            {/*<Stack.Screen name="A-1 Complete" component={AppStack}/>*/}
        </Stack.Navigator>
    );
}

function AppStack(props) {

    return (
        <Drawer.Navigator
            style={{flex: 1}}
            drawerContent={props => (
                <CustomDrawerContent {...props} profile={profile}/>
            )}
            drawerStyle={{
                backgroundColor: "white",
                width: width * 0.8
            }}
            drawerContentOptions={{
                activeTintColor: "white",
                inactiveTintColor: "#000",
                activeBackgroundColor: materialTheme.COLORS.ACTIVE,
                inactiveBackgroundColor: "transparent",
                itemStyle: {
                    width: width * 0.74,
                    paddingHorizontal: 12,
                    // paddingVertical: 4,
                    justifyContent: "center",
                    alignContent: "center",
                    // alignItems: 'center',
                    overflow: "hidden"
                },
                labelStyle: {
                    fontSize: 18,
                    fontWeight: "normal"
                }
            }}
            initialRouteName="Home"
        >
            <Drawer.Screen
                name="Home"
                component={HomeStack}
                options={{
                    drawerIcon: ({focused}) => (
                        <Icon
                            size={16}
                            name="home"
                            family="GalioExtra"
                            color={focused ? "white" : materialTheme.COLORS.MUTED}
                        />
                    )
                }}
            />
            <Drawer.Screen
                name="Booking"
                component={BookingStack}
                options={{
                    drawerIcon: ({focused}) => (
                        <Icon
                            size={16}
                            name="grid-on"
                            family="material"
                            color={focused ? "white" : materialTheme.COLORS.MUTED}
                        />
                    )
                }}
            />
            <Drawer.Screen
                name="Services"
                component={ServicesStack}
                options={{
                    drawerIcon: ({focused}) => (
                        <Icon
                            size={16}
                            name="services"
                            family="GalioExtra"
                            color={focused ? "white" : materialTheme.COLORS.MUTED}
                        />
                    )
                }}
            />
            <Drawer.Screen
                name="Settings"
                component={SettingsStack}
                // initialParams={{userData: userData}}
                options={{
                    drawerIcon: ({focused}) => (
                        <Icon
                            size={16}
                            name="gears"
                            family="font-awesome"
                            color={focused ? "white" : materialTheme.COLORS.MUTED}
                            style={{marginRight: -3}}
                        />
                    )
                }}
            />
            <Drawer.Screen
                name="Contact"
                component={ContactStack}
                options={{
                    drawerIcon: ({focused}) => (
                        <Icon
                            size={16}
                            name="grid-on"
                            family="material"
                            color={focused ? "white" : materialTheme.COLORS.MUTED}
                        />
                    )
                }}
            />
            <Drawer.Screen
                name="Logout"
                component={LogoutStack}
                options={{
                    drawerIcon: ({focused}) => (
                        <Icon
                            size={16}
                            name="logout"
                            family="GalioExtra"
                            color={focused ? "white" : materialTheme.COLORS.MUTED}
                        />
                    )
                }}
            />
            <Drawer.Screen
                name="Item"
                component={ItemStack}
                options={{
                    drawerIcon: ({focused}) => (
                        <Icon
                            size={16}
                            name="shop"
                            family="GalioExtra"
                            color={focused ? "white" : materialTheme.COLORS.MUTED}
                        />
                    )
                }}
            />
            <Drawer.Screen
                name="Profile"
                component={ProfileStack}
                options={{
                    drawerIcon: ({focused}) => (
                        <Icon
                            size={16}
                            name="circle-10"
                            family="GalioExtra"
                            color={focused ? "white" : materialTheme.COLORS.MUTED}
                        />
                    )
                }}
            />
            <Drawer.Screen
                name="Components"
                component={ComponentsStack}
                options={{
                    drawerIcon: ({focused}) => (
                        <Icon
                            size={16}
                            name="md-switch"
                            family="ionicon"
                            color={focused ? "white" : materialTheme.COLORS.MUTED}
                            style={{marginRight: 2, marginLeft: 2}}
                        />
                    )
                }}
            />
        </Drawer.Navigator>
    );
}

export default function OnboardingStack(props) {

    return (
        <Stack.Navigator mode="card" headerMode="none">
            <Stack.Screen
                name="Onboarding"
                component={OnboardingScreen}
                option={{
                    headerTransparent: true
                }}
            />
            <Stack.Screen name="App" userdata={props} component={AppStack}/>
            <Stack.Screen name="Login" component={LoginStack}/>
            <Stack.Screen name="Register" component={RegisterStack}/>
        </Stack.Navigator>
    );
}
