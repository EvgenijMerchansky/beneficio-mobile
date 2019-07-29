import React from "react";
import { ScrollView } from "react-native";

import HTMLView from 'react-native-htmlview';
import { CONTENT } from '../../constants/privacy';

class PrivacyPolicy extends React.Component {
  render() {
    return(
      <ScrollView style={{ backgroundColor: "#f9f8fd", padding: 10 }}>
        <HTMLView
          style={{ backgroundColor: "#f9f8fd" }}
          value={CONTENT}
        />
      </ScrollView>
    )
  }
}

export default PrivacyPolicy;