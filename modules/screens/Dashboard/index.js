import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

import DevelopmentState from '../../components/DevelopmentState';

class Dashboard extends React.Component{
  render() {
    console.log(this, 'Dashboard screen');
    return (
      <View style={{
        flex: 1,
        backgroundColor: '#f9f8fd',
        justifyContent: 'center',
        alignItems: 'center' }}
      >
        <DevelopmentState text={this.props.text}/>
      </View>
    )
  }
}

export default Dashboard;