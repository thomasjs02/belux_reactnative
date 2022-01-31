import React from 'react';
import { TouchableWithoutFeedback, View, TouchableOpacity, StyleSheet, TextInput, Dimensions, ScrollView, Image, ImageBackground, Platform } from 'react-native';
import { Button, Block, Text, theme } from 'galio-framework';
import Icon from './../components/Icon';
import Welcome from './../components/Welcome';

import {Images, materialTheme, overview} from '../constants';
import { HeaderHeight } from "../constants/utils";
import * as SecureStore from 'expo-secure-store';
import moment from "moment";
import {Overview} from "../components";

const { width, height } = Dimensions.get('screen');
const thumbMeasure = (width - 48 - 32) / 3;

export default class Profile extends React.Component {

  state = {
    user: [],
  }

  async componentDidMount() {
    try {
      const credentials = await SecureStore.getItemAsync('kwagu_key');
      if (credentials) {
        const myJson = JSON.parse(credentials);
        this.setState({
          user: myJson,
        });
        fetch("https://central.kwagu.com/applications/belux/admin/api/home.php", {
          method: 'POST',
          headers: new Headers({
            'Content-Type': 'application/x-www-form-urlencoded', // <-- Specifying the Content-Type
          }),
          body: "id=" + myJson.id + "&token=" + myJson.token // <-- Post parameters
        })
            .then((response) => response.json())
            .then((responseJson) => {
              if (responseJson) {
                var total_event = 0;
                var total_upcoming = 0;
                var total_past = 0;
                let totalEvent = [];
                let upcomingEvent = [];
                let pastEvent = [];
                if(responseJson.booking){
                  for (var i = 0; i < responseJson.booking.length; i++) {

                    var row = responseJson.booking[i];
                    if (row.type == 'booking' && row.start_date != 'Invalid date') {
                      let subject = row.subject;
                      let start_date = row.start_date;
                      let start_time = row.start_time;
                      let startDate = moment(start_date.toString()).format();
                      let end_time = row.end_time;
                      let description = row.description;
                      // let day = "2021-01-19T06:00:00.000Z";
                      let style = { backgroundColor: '#' + ('#00000' + (Math.random() * (1 << 24) | 0).toString(16)).slice(-6) };
                      totalEvent.push({
                        subject: subject,
                        start_date: start_date,
                        start_time: start_time,
                        startDate: startDate,
                        end_time: end_time,
                        description: description,
                      });
                      if(moment(start_date) > moment()){
                        upcomingEvent.push({
                          subject: subject,
                          start_date: start_date,
                          start_time: start_time,
                          startDate: startDate,
                          end_time: end_time,
                          description: description,
                        });
                      }else{
                        pastEvent.push({
                          subject: subject,
                          start_date: start_date,
                          start_time: start_time,
                          startDate: startDate,
                          end_time: end_time,
                          description: description,
                        });
                      }
                    }
                  }
                }
                total_event = totalEvent.length;
                total_past = pastEvent.length;
                total_upcoming = upcomingEvent.length
              } else {
                alert('Messaging not working temporarily.')
              }
            })
            .catch((error) => {
              console.error(error);
            });
      }
    } catch (e) {
      console.log(e);
    }
  };


  renderTabs = () => {
    return (
      <Block flex>
        <Block row space="between" style={{ padding: theme.SIZES.BASE, }}>
          <Block middle>
            <Text bold size={12} style={{ marginBottom: 8 }}>0</Text>
            <Text muted size={12}>Bookings</Text>
          </Block>
          <Block middle>
            <Text bold size={12} style={{ marginBottom: 8 }}>0</Text>
            <Text muted size={12}>Orders</Text>
          </Block>
          <Block middle>
            <Text bold size={12} style={{ marginBottom: 8 }}>0</Text>
            <Text muted size={12}>Messages</Text>
          </Block>
        </Block>
      </Block>
    )
  }

  renderButtons = () => {
    return (
      <Block flex style={styles.group}>
        <Block style={styles.container}>
          <Block center>
            <Button shadowless style={[styles.button, styles.shadow]}>
              Book Session
                </Button>
          </Block>
          <Block center>
            <Button shadowless color="info" style={[styles.button, styles.shadow]}>
              View Services
                </Button>
          </Block>
          <Block center>
            <Button shadowless color="success" style={[styles.button, styles.shadow]}>
              View Messages
                </Button>
          </Block>
        </Block>
      </Block>
    )
  }

  renderSocial = () => {
    return (
      <Block flex style={styles.group}>
        <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
          <Block center>
            <Text bold size={16} style={styles.title}>
              Social
            </Text>
          </Block>
          <Block row center space="between">
            <Block flex middle right>
              <Button
                round
                onlyIcon
                shadowless
                icon="instagram"
                iconFamily="font-awesome"
                iconColor={theme.COLORS.WHITE}
                iconSize={theme.SIZES.BASE * 1.625}
                color={theme.COLORS.INSTAGRAM}
                style={[styles.social, styles.shadow]}
              />
            </Block>
            <Block flex middle left>
              <TouchableOpacity
                style={styles.button}
              >
                <Button
                  round
                  onlyIcon
                  shadowless
                  icon="youtube"
                  iconFamily="font-awesome"
                  iconColor={theme.COLORS.WHITE}
                  iconSize={theme.SIZES.BASE * 1.625}
                  color={theme.COLORS.YOUTUBE}
                  style={[styles.social, styles.shadow]}
                />
              </TouchableOpacity>
            </Block>
          </Block>
        </Block>
      </Block>
    )
  }

  renderCards = () => {
    return (
        <Block flex style={styles.group}>
          {/*<Text bold size={16} style={styles.title}>*/}
          {/*    A-1 Complete*/}
          {/*</Text>*/}
          <Block flex>
            <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
              <Overview product={overview[0]} horizontal />
              <Block flex row>
                {/*<Overview product={overview[1]} style={{ marginRight: theme.SIZES.BASE }} />*/}
                <Overview product={overview[2]} />
              </Block>
              <Overview product={overview[3]} horizontal />
            </Block>
          </Block>
        </Block>
    )
  }

  render() {
    const { navigation } = this.props;
    return (
      <Block flex center style={{ marginBottom: 60 }}>
        <ScrollView
          style={styles.components}
          showsVerticalScrollIndicator={false}>
          <Welcome user={this.state.user} navigation={navigation} />
          {this.renderCards()}
          {/*{this.renderButtons()}*/}
          {/*{this.renderTabs()}*/}
          {/*{this.renderSocial()}*/}
        </ScrollView>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  components: {
    width: width
  },
  title: {
    paddingVertical: theme.SIZES.BASE,
    paddingHorizontal: theme.SIZES.BASE * 2,
  },
  group: {
    paddingTop: theme.SIZES.BASE * 1.75,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
  button: {
    marginBottom: theme.SIZES.BASE,
    width: width - (theme.SIZES.BASE * 2),
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
  divider: {
    borderRightWidth: 0.3,
    borderRightColor: theme.COLORS.MUTED,
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
});
