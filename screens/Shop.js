import React, {useEffect, useState} from 'react';
import {Alert, StyleSheet, Dimensions, ScrollView} from 'react-native';
import {Button, Block, Text, Input, theme} from 'galio-framework';
import {AppLoading} from 'expo';
import index from "./../src/js/index";

import {Icon, Product} from '../components/';

const {width} = Dimensions.get('screen');
import products from '../constants/products';

export default class Services extends React.Component {

    state = {
        isLoadingDone: false
    }

    // apiData = props.mydata.data;
    renderSearch = () => {
        const {navigation} = this.props;
        const iconCamera = <Icon size={16} color={theme.COLORS.MUTED} name="zoom-in" family="material"/>

        return (
            <Input
                right
                color="black"
                style={styles.search}
                iconContent={iconCamera}
                placeholder="What are you looking for?"
                onFocus={() => navigation.navigate('Pro')}
            />
        )
    }

    renderTabs = () => {
        const {navigation} = this.props;

        return (
            <Block row style={styles.tabs}>
                <Button shadowless style={[styles.tab, styles.divider]} onPress={() => navigation.navigate('Pro')}>
                    <Block row middle>
                        <Icon name="grid" family="feather" style={{paddingRight: 8}}/>
                        <Text size={16} style={styles.tabTitle}>Booking</Text>
                    </Block>
                </Button>
                <Button shadowless style={styles.tab} onPress={() => navigation.navigate('Pro')}>
                    <Block row middle>
                        <Icon size={16} name="camera-18" family="GalioExtra" style={{paddingRight: 8}}/>
                        <Text size={16} style={styles.tabTitle}>Contact</Text>
                    </Block>
                </Button>
            </Block>
        )
    }

    renderContainer = () => {
        return (
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.products}>
                {this.renderProducts()}
            </ScrollView>
        )
    }

    renderProducts() {
        var items = [];
        var i = 0;
        var newData = store.getState().products;
        return newData.map(function (itemdata) {
            items[i] = {
                id: i,
                key: itemdata.id,
                title: itemdata.name,
                description: itemdata.description,
                image: "https://central.kwagu.com/applications/belux/assets/images/shop/" + itemdata.image,
                price: itemdata.price
            }
            return (
                <Block key={itemdata.id} flex>
                    <Product product={items[i]} horizontal/>
                </Block>
            )
            i++;
        });
    }

    render() {
        return (
            <Block flex center style={styles.home}>
                {this.renderContainer()}
            </Block>
        );
    }

    _loadResourcesAsync = async () => {
    };

    _handleLoadingError = error => {
        // In this case, you might want to report the error to your error
        // reporting service, for example Sentry
        console.warn(error);
    };

    _handleFinishLoading = () => {
        this.setState({isLoadingDone: true});
    };

}

const styles = StyleSheet.create({
    home: {
        width: width,
    },
    search: {
        height: 48,
        width: width - 32,
        marginHorizontal: 16,
        borderWidth: 1,
        borderRadius: 3,
    },
    header: {
        backgroundColor: theme.COLORS.WHITE,
        shadowColor: theme.COLORS.BLACK,
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowRadius: 8,
        shadowOpacity: 0.2,
        elevation: 4,
        zIndex: 2,
    },
    tabs: {
        marginBottom: 24,
        marginTop: 10,
        elevation: 4,
    },
    tab: {
        backgroundColor: theme.COLORS.TRANSPARENT,
        width: width * 0.50,
        borderRadius: 0,
        borderWidth: 0,
        height: 24,
        elevation: 0,
    },
    tabTitle: {
        lineHeight: 19,
        fontWeight: '300'
    },
    divider: {
        borderRightWidth: 0.3,
        borderRightColor: theme.COLORS.MUTED,
    },
    products: {
        width: width - theme.SIZES.BASE * 2,
        paddingVertical: theme.SIZES.BASE * 2,
    },
});
