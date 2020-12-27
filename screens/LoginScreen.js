import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Button, TextInput, TouchableOpacity, Dimensions, Picker } from 'react-native';

import DatePicker from 'react-native-datepicker'
import IconCI from 'react-native-vector-icons/MaterialCommunityIcons';
import IconE from 'react-native-vector-icons/Entypo';
import IconI from 'react-native-vector-icons/Ionicons';
import IconM from 'react-native-vector-icons/MaterialIcons';
import firebase from 'firebase';

//Constants
import { Colors } from './Colors';

//Components
import ButtonCom from '../components/ButtonCom';

const { height: screenHeight, width: screenWidth } = Dimensions.get('window');
let itemFromList = {}
type Props = {};


export default class LoginScreen extends Component<Props> {

  static navigationOptions = ({ navigation }) => ({
    title: 'Flight From TLV',
    headerRight:
      <TouchableOpacity
        style={{ marginRight: 8 }}
        onPress={() => navigation.navigate("Home")}>
        <IconI
          name={'ios-list'}
          style={{ color: Colors.purpleColor, fontSize: 20 }}
        />
      </TouchableOpacity>
  });

  constructor(props) {
    super(props);
    this.state = {
      passengerNumber: "1",
      location: "Barcelona",
      checkBoxSuitcase: true,
      checkBoxFood: true,
      date: "2021-01-01",
      itemFromList: {}
    };
  }


  render() {
    itemFromList = this.props.navigation.getParam('item')
    if (!itemFromList) {
      null
    }
    else {
      console.log('itemFromList', itemFromList)
    }

    return (
      <View style={{ flex: 1, paddingHorizontal: 10 }}>

        {this.renderPassengerPicker()}

        {this.renderLocationPicker()}

        {this.renderDatePicker()}

        {this.renderCheckBox()}

        <ButtonCom
          style={{ paddingTop: 20 }}
          title={"Book Flight"}
          color={Colors.purpleColor}
          onPress={() => this.updateFireBAndGoToList()}
        />

      </View>
    )

  }



  renderPassengerPicker() {
    return (
      <View style={{ alignItems: 'center' }}>
        <IconI
          name={'ios-person-add'}
          style={{ color: Colors.redColor, fontSize: 40 }}
        />
        <Picker
          selectedValue={this.state.passengerNumber}
          style={{ justifyContent: 'center', height: 50, width: 200, paddingTop: 20 }}
          itemStyle={{
            fontSize: 16,
            height: 100,
            alignItems: 'center',
            color: Colors.redColor,
          }}
          onValueChange={(itemValue, itemIndex) => this.setState({ passengerNumber: itemValue })}>
          <Picker.Item label="1" value="1" />
          <Picker.Item label="2" value="2" />
          <Picker.Item label="3" value="3" />
          <Picker.Item label="4" value="4" />
          <Picker.Item label="5" value="5" />
          <Picker.Item label="6" value="6" />
          <Picker.Item label="7" value="7" />
          <Picker.Item label="8" value="8" />
          <Picker.Item label="9" value="9" />
          <Picker.Item label="10" value="10" />
        </Picker>
      </View>
    )
  }

  renderLocationPicker() {
    return (
      <View style={{ alignItems: 'center', paddingTop: 30 }}>
        <View style={{ backgroundColor: Colors.redColor, width: screenWidth, height: 1, margin: 10 }}></View>
        <IconM
          name={'flight'}
          style={{ color: Colors.redColor, fontSize: 40 }}
        />
        <Picker
          selectedValue={this.state.location}
          style={{ justifyContent: 'center', height: 50, paddingTop: 20 }}
          itemStyle={{
            fontSize: 16,
            height: 100,
            width: 200,
            alignItems: 'center',
            color: Colors.redColor,
          }}
          onValueChange={(itemValue, itemIndex) => this.setState({ location: itemValue })}>
          <Picker.Item label="Barcelona" value="Barcelona" />
          <Picker.Item label="Paris" value="Paris" />
          <Picker.Item label="Rome" value="Rome" />
          <Picker.Item label="Rhodes" value="Rhodes" />
          <Picker.Item label="Berlin" value="Berlin" />
        </Picker>
      </View>
    )
  }

  renderDatePicker() {
    return (
      <View style={{ paddingTop: 30, alignItems: 'center' }}>
        <View style={{ backgroundColor: Colors.redColor, width: screenWidth, height: 1 }}></View>
        <DatePicker
          style={{ width: screenWidth - 20, paddingBottom: 20, paddingTop: 10 }}
          date={this.state.date}
          mode="date"
          placeholder="select date"
          format="YYYY-MM-DD"
          minDate="2021-01-01"
          maxDate="2024-01-01"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          customStyles={{
            dateIcon: {
              position: 'absolute',
              left: 0,
              top: 4,
              marginLeft: 0
            },
            dateInput: {
              marginLeft: 36
            }
            // ... You can check the source to find the other keys.
          }}
          onDateChange={(date) => { this.setState({ date: date }) }}
        />
      </View>
    )
  }

  renderCheckBox() {
    return (
      <View style={{ flexDirection: 'row', justifyContent: 'center' }}>

        <TouchableOpacity
          style={{
            paddingTop: 20,
            backgroundColor: 'transparent',
            paddingHorizontal: 20,
          }}
          onPress={() => this.checkBoxSuticasePress()}
        >

          <IconCI
            name={this.state.checkBoxSuitcase ? 'checkbox-marked-outline' : 'checkbox-blank-outline'}
            style={{ color: Colors.redColor, fontSize: 20 }}
          />

          <View style={{ margin: 5 }}>
            <IconE
              name={'suitcase'}
              style={{ color: Colors.redColor, fontSize: 60 }}
            />
          </View>
        </TouchableOpacity>

        <View style={{ backgroundColor: Colors.redColor, width: 3, height: 100, marginTop: 20 }} />

        <TouchableOpacity
          style={{
            paddingTop: 20,
            backgroundColor: 'transparent',
            paddingHorizontal: 20,
          }}
          onPress={() => this.checkBoxFoodPress()}
        >

          <IconCI
            name={this.state.checkBoxFood ? 'checkbox-marked-outline' : 'checkbox-blank-outline'}
            style={{ color: Colors.redColor, fontSize: 20 }}
          />

          <View style={{ margin: 5 }}>
            <IconCI
              name={'food'}
              style={{ color: Colors.redColor, fontSize: 60 }}
            />
          </View>
        </TouchableOpacity>
      </View>
    )
  }

  checkBoxFoodPress() {
    this.setState({
      checkBoxFood: !this.state.checkBoxFood
    })
  }

  checkBoxSuticasePress() {
    // console.log('checkBoxPress')
    this.setState({
      checkBoxSuitcase: !this.state.checkBoxSuitcase
    })
  }

  updateFireBAndGoToList() {
    //Write to Firebase
    firebase.database().ref('users').push(
      {
        passenger: this.state.passengerNumber,
        location: this.state.location,
        suitcase: this.state.checkBoxSuitcase,
        food: this.state.checkBoxFood,
        date: this.state.date,
      }
    ).then(() => {
      console.log("INSERTED !")
    }).catch((error) => {
      console.log(error)
    })

    this.props.navigation.navigate('Home')
  }
}

