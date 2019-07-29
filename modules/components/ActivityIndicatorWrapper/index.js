import React from 'react';

import {
  StyleSheet,
  View,
  ActivityIndicator,
} from "react-native";

class ActivityIndicatorWrapper extends React.Component {
  
  static navigationOptions = {
    headerLeft: null,
    headerStyle: {
      backgroundColor: "#f9f8fd",
      borderBottomWidth: 0
    }
  };
  
  render() {
    return (
      <View style={[styles.loadContainer, styles.horizontal]}>
        <ActivityIndicator size="small" color="#000" />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#f9f8fd",
    padding: 10
  },
  loadContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#f9f8fd",
    flexDirection: "column"
  }
});

export default ActivityIndicatorWrapper;