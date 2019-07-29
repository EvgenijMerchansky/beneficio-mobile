import React from "react";
import {
  StyleSheet,
  Text,
  View,
} from "react-native";

class PaymentRules extends React.Component {
  render(){
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>
            Платежи
          </Text>
        </View>
        <View style={styles.body}>
          <Text style={styles.bodyCommonText}>
            Здесь нужно описать флоу за что чувак платит, по типу, мэн, мы платим налоги, схемки покупаем, тестим их, и тд. Нам тоже нужна компенсация, но и надо описать еще что он может рачитываться с любой карты или счета, я хз как это красиво сформулировать ((
          </Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f8fd",
    padding: 20,
  },
  header: {
    paddingBottom: 20,
  },
  headerText: {
    color: "#42a4ff",
    fontSize: 22,
    fontFamily: "RobotoLight",
    textAlign: "left",
    fontWeight: "light",
  },
  body: {
    
  },
  bodyCommonText: {
    color: "#a09fa4",
  }
});

export default PaymentRules