import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, FlatList, Dimensions, Button} from 'react-native';
import { createStackNavigator } from 'react-navigation';
import IconCI from 'react-native-vector-icons/MaterialCommunityIcons'
import IconE from 'react-native-vector-icons/Entypo';
import IconI from 'react-native-vector-icons/Ionicons';
import firebase from 'firebase';
import _ from 'lodash'
import {Colors} from '../Constants/Colors';


const { height: screenHeight, width: screenWidth } = Dimensions.get('window');

type Props = {};
export default class HomeScreen extends Component<Props> {

  constructor(props){
    super(props);
    this.state = {
      db: []
    };
  }

  static navigationOptions = {
    title: 'Booked Flights',
  };

  componentDidMount(){
    //Get Data form Firebase
    firebase.database().ref('users').on('value', (data) => {
      let fireBaseData = data.toJSON()
      console.log('fireBaseData', fireBaseData)

      let db = _.map(fireBaseData, (val, uid) => {
        return {...val, uid};
      })
      this.setState({
        db : db
      })
      console.log('db', db)
    })
  }



  render() {
    return (
      <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
        <FlatList
          data={this.state.db}
          renderItem={({item, index}) => this.renderFlatListItem(item, index)}
          //          renderItem={({item}) => <Text style={{fontSize: 20}}>{item.key} {item.title}</Text>}
          keyExtractor={(item, i) => item.uid}


        />
      </View>
    )
  }

  renderFlatListItem(item, index){
    console.log('item', item)

    return(
      <View style={{flex: 1}}>

        <View style={{width: screenWidth, height: 1, backgroundColor: 'red'}}/>

        <View style={{flex: 1, flexDirection:'row', justifyContent:'flex-start' }}>
          <Text style={{color: Colors.redColor}}>{item.location}</Text>


          <View style={{flex: 1, flexDirection:'row', justifyContent:'flex-end' }}>

            <Text>{item.passenger}</Text>
            <IconI
              name={'ios-person'}
              style={{color: Colors.redColor, fontSize: 20 }}
            />
            {item.food ?
              <IconCI
                name={'food'}
                style={{color: Colors.redColor, fontSize: 20}}
              />
              : null
            }
            {item.suitcase ?
              <IconE
                name={'suitcase'}
                style={{color: Colors.redColor, fontSize: 20}}
              />
              : null
            }



          </View>


        </View>


        <View style={{flex: 1, flexDirection:'row', justifyContent:'flex-start'}}>

          <Text style={{marginRight:40}}>{item.date}</Text>





          <View style={{flex: 1, flexDirection:'row', justifyContent:'flex-end'}}>
            <Button
              title = "Delete"
              color="#841584"
              onPress={()=> this.deleteFlight(item)}
            />


          </View>

          </View>

        <View style={{width: screenWidth, height: 1, backgroundColor: 'red'}}/>

        </View>

    )
  }

  deleteFlight(item){
// //Delete Firebase
    firebase.database().ref(`/users/${[item.uid]}`).remove();
  }

  editFlight(item){

    const { navigate } = this.props.navigation

    // this.props.navigation.navigate('Login', {helloFN :'hello form NAV Home'})
    // console.log('editFlight-item', item)
// //Update FireBase
    // var id = firebase.database().ref('users/002').update({
    //   name: 'Keren Har'
    // })
  }
}


{/*<Button*/}
  {/*title = "Edit"*/}
  {/*color="#841584"*/}
  {/*onPress={()=> this.props.navigation.navigate('Login', {item: item})}*/}
{/*/>*/}


{/*<View style={{flex: 1, flexDirection:'row', justifyContent:'center'}}>*/}
  {/*<Text>{item.location}</Text>*/}