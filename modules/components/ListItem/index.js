import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";

class ListItem extends React.PureComponent {
  render() {
  
    let { item } = this.props;
    
    return (
      <TouchableOpacity
        disabled={!item.isOpen}
        onPress={() => this.props.pushHandler(item.id)}
      >
        <View style={styles.container}>
          <View style={styles.ImageBlock}>
            <Image
              style={styles.ImageBlockDimensions}
              source={{uri: item.logoUrl}}
            />
          </View>
          <View style={styles.DescriptionBlock}>
            <Text style={styles.DescriptionBlockTitle}>
              {this.props.activeTab === "drops" ? <Text style={styles.dropItem}>DROP</Text> : ''} {item.title}
            </Text>
            <Text style={styles.DescriptionBlockTime}>
              {this.props.activeTab === "drops" ? "Дата окончания: " : "Время прохождения: "}{item.time}{this.props.activeTab === "active" ? "ч" : ""}
            </Text>
            <Text style={styles.DescriptionBlockEarnings}>
              Заработок: ${item.possibleEarnings}
            </Text>
            <Text style={styles.DescriptionBlockCommission}>
              Комиссия: ${item.percentPrice}
            </Text>
          </View>
          <View style={styles.AccessBlock}>
            <Image
              style={styles.AccessBlockImgDimensions}
              source={
                this.props.activeTab === "completed"
                  ? require("../../../assets/done.png")
                  : item.isOpen
                    ? require("../../../assets/open.png")
                    : require("../../../assets/lock.png")
              }
            />
            {this.props.index === 0 && !item.isOpen && this.props.activeTab !== "completed" && (
              <Text style={styles.timeToNext}>
                {`Откроется\nчерез ${this.props.timeToNext}${this.props.activeTab === "active" ? "ч" : "м"}`}
              </Text>
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "100%",
    backgroundColor: "#fff",
    height: 100,
    borderBottomColor: "#e8e7ec",
    borderBottomWidth: 1,
  },
  ImageBlock: {
    height: "100%"
  },
  ImageBlockDimensions: {
    objectFit: "cover",
    height: "100%",
    width: 100,
    borderRightWidth: 10,
    borderStyle: "solid",
    borderColor: "#42a4ff"
  },
  DescriptionBlock: {
    flex: 1,
    padding: 7
  },
  DescriptionBlockTitle: {
    marginBottom: 5,
    color: "#42a4ff",
    fontSize: 16
  },
  DescriptionBlockTime: {
    color: "#bdbcc1",
    fontSize: 12
  },
  DescriptionBlockEarnings: {
    color: "#bdbcc1",
    fontSize: 12
  },
  DescriptionBlockCommission: {
    color: "#bdbcc1",
    fontSize: 12
  },
  AccessBlock: {
    height: "100%",
    flex: 0.4,
    flexDirection: "column",
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  AccessBlockImgDimensions: {
    height: 35,
    width: 35
  },
  timeToNext: {
    paddingTop: 4,
    textAlign: "center",
    color: "#bdbcc1",
    fontSize: 10
  },
  dropItem: {
    backgroundColor: "#42a4ff",
    color: "#fff",
    borderRadius: 20
  }
});

export default ListItem;
