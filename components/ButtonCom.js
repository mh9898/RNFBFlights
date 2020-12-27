
import React, {Component} from 'react';
import {Text, View, Button} from 'react-native';

export default class ButtonCom extends Component<Props> {


  render() {
    return (
      <View style={{paddingTop:40}}>
        <Button title = {this.props.title}
                color = {this.props.color}
                onPress={this.props.onPress}
        />
      </View>
    )
  }
}