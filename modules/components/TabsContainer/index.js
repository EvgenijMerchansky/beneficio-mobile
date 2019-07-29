import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

class TabsContainer extends React.Component{
  state = {
    activeTab: "active",
    loading: false,
  };
  
  componentDidMount() {
    
  }
  
  render() {
    console.log(this, 'Dashboard screen');
    return (
      <View style={{
        flex: 1,
        backgroundColor: '#f9f8fd',
        justifyContent: 'center',
        alignItems: 'center' }}
      >
        
      </View>
    )
  }
}

const styles = StyleSheet.create({
  
});

export default TabsContainer;