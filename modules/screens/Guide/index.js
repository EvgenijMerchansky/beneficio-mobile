import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
} from "react-native";

import { RUS } from "../../constants/guide";

class Guide extends React.Component {
  render() {
    return(
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>
            {RUS.title}
          </Text>
        </View>
        <View style={styles.body}>
          <Text style={styles.commonText}>
            {RUS.subtitle}
          </Text>
          <Text style={styles.commonText}>
            {RUS.reasons}
          </Text>
          {
            RUS.reasonsList.map(item => <Text style={styles.listItem}>{item}</Text>)
          }
          <Text style={styles.commonText}>
            {RUS.factors}
          </Text>
  
          <Text style={styles.commonText}>
            {RUS.overview}
          </Text>
          <Text style={styles.commonText}>
            {RUS.teamWork}
          </Text>
          <Text style={styles.commonText}>
            {RUS.security}
          </Text>
          <Text style={styles.commonText}>
            {RUS.howItWorks}
          </Text>
          <Text style={styles.commonText}>
            {RUS.nextStep}
          </Text>
          {
            RUS.workList.map(item => <Text style={styles.listItem}>{item}</Text>)
          }
          <Text style={styles.commonText}>
            {RUS.afterWork}
          </Text>
          <Text style={styles.commonText}>
            {RUS.whatNext}
          </Text>
          <Text style={styles.commonText}>
            {RUS.smartPhone}
          </Text>
          <Text style={styles.commonText}>
            {RUS.levelTime}
          </Text>
          <Text style={styles.commonText}>
            {RUS.afterLevel}
          </Text>
          <Text style={styles.commonText}>
            {RUS.aboutProcess}
          </Text>
          <Text style={styles.commonText}>
            {RUS.gamePoints}
          </Text>
          <Text style={styles.commonText}>
            {RUS.knowledgeImprovement}
          </Text>
          <Text style={styles.commonText}>
            {RUS.commissions}
          </Text>
          <Text style={styles.commonText}>
            {RUS.paymentProcess}
          </Text>
          <Text style={styles.commonText}>
            {RUS.nextLevels}
          </Text>
          <Text style={styles.commonText}>
            {RUS.privacy}
          </Text>
          <Text style={styles.commonText}>
            {RUS.community}
          </Text>
          {
            RUS.communityList.map(item => <Text style={styles.listItem}>{item}</Text>)
          }
          <Text style={styles.commonText}>
            {RUS.communityOffer}
          </Text>
          <Text style={styles.commonText}>
            {RUS.profile}
          </Text>
          <Text style={styles.commonText}>
            {RUS.finish}
          </Text>
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f9f8fd",
  },
  header: {
    padding: 20,
    backgroundColor: "f9f8fd",
    position: "fixed"
  },
  headerText: {
    color: "#42a4ff",
    fontSize: 22,
    fontFamily: "RobotoLight",
    textAlign: "left",
    fontWeight: "light",
  },
  body: {
    flex: 0.9,
    padding: 20,
  },
  commonText: {
    color: "#a09fa4",
    fontSize: 14,
    paddingBottom: 15,
  },
  listItem: {
    color: "#a09fa4",
    fontSize: 14,
    paddingBottom: 7,
    paddingLeft: 40
  }
});

export default Guide;