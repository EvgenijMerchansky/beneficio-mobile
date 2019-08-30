import React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  ScrollView,
  ActivityIndicator,
  Image,
  Alert
} from "react-native";

class LotteryTicket extends React.Component {
  render() {
    
    let { userId, push, lotteryIsBoughtByUser, lotteryTicket } = this.props;
  
    return(
      <View style={styles.ticketContainer}>
        <View style={styles.ticketRibbon}>
          <Text style={styles.ticketRibbonText}>
            TICKET
          </Text>
        </View>
        <View style={styles.ticketContainerInfo}>
          <Text style={styles.ticketContainerInfoText}>
            {lotteryTicket.name}
          </Text>
          <Text style={styles.ticketContainerInfoText}>
            {lotteryTicket.description}
          </Text>
        </View>
        <View style={styles.ticketContainerPrize}>
          <View style={styles.ticketContainerPrizeWrapper}>
            <Text style={styles.ticketContainerPrizeText}>
              ${lotteryTicket.prize}
            </Text>
          </View>
        </View>
        <View style={styles.ticketButtonWrapper}>
          <TouchableOpacity
            style={!lotteryIsBoughtByUser ? styles.ticketButtonNotBought : styles.ticketButtonTicketIsBought} // dynamic
            onPress={() => push("Lottery", { userId: userId })}
            disabled={lotteryIsBoughtByUser}
          >
            {
              lotteryIsBoughtByUser ?
                <Text style={styles.ticketButtonFinishInfoText}>{lotteryTicket.finishDate}</Text> :
                <Text style={styles.ticketButtonBuyTicketText}>играть {`($${lotteryTicket.price})`}</Text>
            }
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  ticketContainer: {
    height: 100,
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-between",
    borderStyle: "solid",
    borderWidth: 2,
    borderColor: "#42a4ff",
    marginTop: 25,
    marginBottom: 10,
    padding: 10,
    borderRadius: 10,
    position: "relative",
    overflow: "hidden"
  },
  ticketContainerInfo: {
    width: "35%",
    paddingLeft: 10,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "flex-start"
  },
  ticketContainerInfoText: {
    fontSize: 12,
    marginBottom: 5,
    color: "#42a4ff"
  },
  ticketButtonNotBought: {
    width: "100%",
    backgroundColor: "#57ba5f",
    color: "#fff",
    borderRadius: 5,
  },
  ticketButtonTicketIsBought: {
    width: "100%",
    borderRadius: 7,
  },
  ticketButtonFinishInfoText: {
    borderRadius: 4,
    borderStyle: "solid",
    borderWidth: 2,
    borderColor: "#42a4ff",
    color: "#42a4ff",
    fontSize: 10,
    textAlign: "center",
    paddingTop: 10,
    paddingBottom: 10,
    width: "100%",
    verticalAlign: "center",
    backgroundColor: "#f9f8fd",
  },
  ticketButtonBuyTicketText: {
    textAlign: "center",
    paddingTop: 10,
    paddingBottom: 10,
    width: "100%",
    verticalAlign: "center",
    color: "#fff",
    fontSize: 10,
  },
  ticketContainerPrize: {
    width: "30%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  ticketContainerPrizeText: {
    fontSize: 18,
    color: "#57ba5f"
  },
  ticketRibbon: {
    width: 130,
    height: 20,
    backgroundColor: "#42a4ff",
    position: "absolute",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    transform: [{ rotate: '315deg'}],
    top: 12,
    left: -45
  },
  ticketRibbonText: {
    textAlign: "center",
    fontSize: 12,
    color: "#fff"
  },
  ticketButtonWrapper: {
    width: "35%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  ticketContainerPrizeWrapper: {
    height: 70,
    width: 70,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    borderStyle: "solid",
    borderWidth: 2,
    borderColor: "#42a4ff",
    backgroundColor: "#f9f8fd",
  }
});

export default LotteryTicket;