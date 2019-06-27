import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

const DevelopmentState = ({ text }) => [
  <View>
    <Image
      style={{width: 100, height: 100}}
      source={require('../../../assets/service/developmentStateLogo.png')}
    />
  </View>,
  <Text>
    {text}.
  </Text>,
  <Text style={styles.textColor}>
    in development state...
  </Text>
];

const styles = StyleSheet.create({
  textColor: {
    color: '#177d00'
  }
});

export default DevelopmentState;