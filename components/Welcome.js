import React from 'react';
import { withNavigation } from '@react-navigation/compat';
import { TouchableWithoutFeedback, View, TouchableOpacity, StyleSheet, TextInput, Dimensions, ScrollView, Image, ImageBackground, Platform } from 'react-native';
import { Button, Block, Text, theme } from 'galio-framework';

import Icon from './Icon';
import materialTheme from '../constants/Theme';

const { height, width } = Dimensions.get('window');
const iPhoneX = () => Platform.OS === 'ios' && (height === 812 || width === 812 || height === 896 || width === 896);

class Welcome extends React.Component {

  render() {
    // let user = this.props.user;
    const { user, navigation } = this.props;

    return (
      <Block flex>

        <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
          <Block row={true} card flex style={[styles.product, styles.shadow]}>
            <TouchableWithoutFeedback onPress={() => navigation.navigate('Settings')}>
              <Block flex style={[styles.imageContainer, styles.shadow]}>
                <Image source={require('./../assets/images/ios.png')} style='full' />
              </Block>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => navigation.navigate('Settings')}>
              <Block flex space="between" style={styles.productDescription}>
                <Text size={15} style={styles.productTitle}>Welcome {user.first_name}</Text>
                <Text size={14}>Belux</Text>
                <Text size={12} muted={!materialTheme.COLORS.PRIMARY} color={materialTheme.COLORS.PRIMARY}>Lifestyle Management Service</Text>
              </Block>
            </TouchableWithoutFeedback>
          </Block>
        </Block>

        <Block center>
          <Block row style={styles.tabs}>
            <Button shadowless style={[styles.tab, styles.divider]} onPress={() => navigation.navigate('Booking')}>
              <Block row middle>
                <Icon name="book-bookmark" family="foundation" style={{ paddingRight: 8 }} />
                <Text size={16} style={styles.tabTitle}>Booking</Text>
              </Block>
            </Button>
            <Button shadowless style={styles.tab} onPress={() => navigation.navigate('Settings')}>
              <Block row middle>
                <Icon size={16} name="package" family="feather" style={{ paddingRight: 8 }} />
                <Text size={16} style={styles.tabTitle}>Settings</Text>
              </Block>
            </Button>
          </Block>
        </Block>

      </Block>
    );
  }
}

export default withNavigation(Welcome);

const styles = StyleSheet.create({
  button: {
    padding: 12,
    position: 'relative',
  },
  title: {
    width: '100%',
    fontSize: 16,
    fontWeight: 'bold',
  },
  navbar: {
    paddingVertical: 0,
    paddingBottom: theme.SIZES.BASE * 1.5,
    paddingTop: iPhoneX ? theme.SIZES.BASE * 4 : theme.SIZES.BASE,
    zIndex: 5,
  },
  shadow: {
    backgroundColor: theme.COLORS.WHITE,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.2,
    elevation: 3,
  },
  notify: {
    backgroundColor: materialTheme.COLORS.LABEL,
    borderRadius: 4,
    height: theme.SIZES.BASE / 2,
    width: theme.SIZES.BASE / 2,
    position: 'absolute',
    top: 8,
    right: 8,
  },
  header: {
    backgroundColor: theme.COLORS.WHITE,
  },
  divider: {
    borderRightWidth: 0.3,
    borderRightColor: theme.COLORS.MUTED,
  },
  search: {
    height: 48,
    width: width - 32,
    marginHorizontal: 16,
    borderWidth: 1,
    borderRadius: 3,
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
  product: {
    backgroundColor: theme.COLORS.WHITE,
    marginVertical: theme.SIZES.BASE,
    borderWidth: 0,
    minHeight: 114,
  },
  productTitle: {
    flex: 1,
    flexWrap: 'wrap',
    paddingBottom: 3,
  },
  productDescription: {
    padding: theme.SIZES.BASE / 2,
  },
  imageContainer: {
    elevation: 1,
  },
  image: {
    borderRadius: 3,
    marginHorizontal: theme.SIZES.BASE / 2,
    marginTop: -16,
  },
  shadow: {
    shadowColor: theme.COLORS.BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    shadowOpacity: 0.1,
    elevation: 2,
  },
})