/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import { createStackNavigator } from 'react-navigation';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import firebase from 'firebase';


export default class App extends Component<Props> {

  //initialed Firebase
  componentWillMount(){
    var config = {
      apiKey: "AIzaSyCeKD97vkYW7cuX4bkOaW6z4IU5-ggj4f0",
      authDomain: "calrn-dd585.firebaseapp.com",
      databaseURL: "https://calrn-dd585.firebaseio.com",
      projectId: "calrn-dd585",
      storageBucket: "calrn-dd585.appspot.com",
      messagingSenderId: "857438066237"
    };
    firebase.initializeApp(config);
  }


  render() {
    return (
      <AppStackNavigator />
    )
  }
}

const AppStackNavigator =  createStackNavigator({
  Login: LoginScreen,
  Home: HomeScreen,

})

