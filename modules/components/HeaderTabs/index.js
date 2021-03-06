import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

class HeaderTabs extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => this.props.onChange("drops")}
          style={[
            styles.dropsTab,
            {
              backgroundColor:
                this.props.currentTab === "drops" ? "#42A4FF" : "transparent"
            }
          ]}
        >
          <Text
            style={[
              styles.dropsTabText,
              {
                color: this.props.currentTab === "drops" ? "white" : "#42A4FF"
              }
            ]}
          >
            Дропы
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.props.onChange("active")}
          style={[
            styles.activeTab,
            {
              backgroundColor:
                this.props.currentTab === "active" ? "#42A4FF" : "transparent"
            }
          ]}
        >
          <Text
            style={[
              styles.activeTabText,
              {
                color: this.props.currentTab === "active" ? "white" : "#42A4FF"
              }
            ]}
          >
            Активные
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.props.onChange("completed")}
          style={[
            styles.completedTab,
            {
              backgroundColor:
                this.props.currentTab === "completed"
                  ? "#42A4FF"
                  : "transparent"
            }
          ]}
        >
          <Text
            style={[
              styles.completedTabText,
              {
                color:
                  this.props.currentTab === "completed" ? "white" : "#42A4FF"
              }
            ]}
          >
            История
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    textAlign: "center",
    alignContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
    backgroundColor: "transparent"
  },
  dropsTab: {
    borderWidth: 1,
    borderColor: "#42A4FF",
    marginRight: -1,
    paddingTop: 6,
    paddingBottom: 6,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    alignItems: "center",
    textAlign: "center",
    width: 80
  },
  activeTab: {
    borderWidth: 1,
    borderColor: "#42A4FF",
    marginRight: -1,
    paddingTop: 6,
    paddingBottom: 6,
    alignItems: "center",
    textAlign: "center",
    width: 80
  },
  completedTab: {
    borderWidth: 1,
    borderColor: "#42A4FF",
    paddingTop: 6,
    paddingBottom: 6,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    alignItems: "center",
    textAlign: "center",
    width: 80
  },
  activeTabText: {
    fontSize: 12,
    color: "#42A4FF"
  },
  completedTabText: {
    fontSize: 12,
    color: "#42A4FF"
  },
  dropsTabText: {
    fontSize: 12,
    color: "#42A4FF"
  }
});

export default HeaderTabs;
