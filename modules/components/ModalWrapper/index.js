import React from "react";
import {
  Text,
  View,
  TouchableHighlight,
  StyleSheet,
  ScrollView,
  Modal,
  Alert
} from "react-native";

import { RUS } from "../../constants/guide";

class ModalWrapper extends React.Component {
  
  render() {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.props.isOpen}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}>
        <View style={styles.containerGlobalWrapper}>
          <View style={styles.containerWrapper}>
            <ScrollView>
              <View style={styles.header}>
                <Text style={styles.headerText}>
                  {RUS.title}
                </Text>
              </View>
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
            </ScrollView>
            <TouchableHighlight
              style={styles.buttonStyles}
              onPress={() => this.props.onModalClose()}>
              <Text style={{ color: "#fff" }}>Got it!</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
    )
  }
}

const styles = StyleSheet.create({
  containerGlobalWrapper: {
    backgroundColor: "#8b8a8e",
    zIndex: 0,
    padding: 20,
    flex: 1,
    flexDirection: "column",
    justifyContent: "center"
  },
  containerWrapper: {
    backgroundColor: "#f9f8fd",
    zIndex: 9999,
    padding: 20,
    flex: .6,
    borderRadius: 20,
    flexDirection: "column",
    justifyContent: "space-between"
  },
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
    fontSize: 16,
    fontFamily: "RobotoLight",
    textAlign: "center",
    fontWeight: "light",
  },
  buttonStyles: {
    width: "100%",
    height: 40,
    backgroundColor: "#42a4ff",
    borderRadius: 4,
    alignItems: "center",
    paddingTop: 12,
    marginTop: 20
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

export default ModalWrapper;