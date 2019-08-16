import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
} from "react-native";

class PaymentRules extends React.Component {
  render(){
    return (
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>
            Комиссии
          </Text>
        </View>
        <View style={styles.body}>
          <Text style={styles.bodyCommonText}>
            Мы открыты и честны перед своими пользователями, поэтому хотим рассказать за что взимаются комиссионные после прохождения уровня:          </Text>
          <Text style={styles.bodyCommonTextList}>
            1. Мы производим оплаты на покупки различных платных информационных ресурсов.
          </Text>
          <Text style={styles.bodyCommonTextList}>
            2. Компании, предоставляющие нам ресурсы, взимают у нас финансовые средства за интеграцию собственных данных в наше приложение.
          </Text>
          <Text style={styles.bodyCommonTextList}>
            3. В период тестирования уровня, мы вносим оплату со своей стороны.
          </Text>
          <Text style={styles.bodyCommonTextList}>
            4. Наше приложение базируется на новейших технологиях, использование ресурсов которых, требует дополнительных ежемесячных взысканий.
          </Text>
          <Text style={styles.bodyCommonTextList}>
            5. Возмещение онлайн data-search экспертам.
          </Text>
          <Text style={styles.bodyCommonTextList}>
            6. Все масс-медиа порталы оплачиваются с нашей стороны.
          </Text>
          <Text style={styles.bodyCommonTextList}>
            7. Ежемесячные списания с платежной системы за использование ее ресурсов.
          </Text>
        </View>
      </ScrollView>
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
    marginBottom: 40,
    fontSize: 12
  },
  bodyCommonText: {
    color: "#a09fa4",
    paddingBottom: 10,
    fontSize: 12
  },
  bodyCommonTextList: {
    color: "#a09fa4",
    paddingLeft: 15,
    paddingBottom: 25,
    fontSize: 12
  }
});

export default PaymentRules