import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Linking,
} from "react-native";

class Social extends React.Component {
  render() {
    return(
      <View style={styles.container}>
        <View style={styles.socialHeader}>
          <Text style={styles.socialHeaderText}>
            Наше сообщество
          </Text>
          <Text style={styles.headerSubtext}>
            {`Присоединяйся к нашему сообществу\nчто бы быть в курсе всех последних новостей`}
          </Text>
        </View>
        <ScrollView style={styles.socialBody}>
          <Text style={styles.socialTitle}>
            Ссылки
          </Text>
          <View style={styles.socialBodyWebsite}>
            <Text style={styles.socialBodyWebsiteText}>
              {`Веб-сайт: `}
              <Text style={{color: '#8dc5ff'}}
                    onPress={() => Linking.openURL('http://merchansky-001-site1.dtempurl.com/')}>
                beneficio.com
              </Text>
            </Text>
          </View>
          <View style={styles.socialBodyEmail}>
            <Text style={styles.socialBodyEmailText}>
              {`Електронный адрес: `}
              <Text style={{color: '#8dc5ff'}}
                    onPress={() => Linking.openURL('mailto:beneficioinc@gmail.com')}>
                beneficioinc
              </Text>
            </Text>
          </View>
          <View style={styles.socialBodyLinkedIn}>
            <Text style={styles.socialBodyLinkedInText}>
              {`LinkedIn: `}
              <Text style={{color: '#8dc5ff'}}
                    onPress={() => Linking.openURL('https://www.linkedin.com')}>
                beneficio
              </Text>
            </Text>
          </View>
          <View style={styles.socialBodyInstagram}>
            <Text style={styles.socialBodyInstagramText}>
              {`Instagram: `}
              <Text style={{color: '#8dc5ff'}}
                    onPress={() => Linking.openURL('https://instagram.com/beneficioinc?igshid=1k2gwqx8p6xw7')}>
                beneficio.inc
              </Text>
            </Text>
          </View>
          <View style={styles.socialBodyTelegram}>
            <Text style={styles.socialBodyTelegramText}>
              {`Telegram: `}
              <Text style={{color: '#8dc5ff'}}
                    onPress={() => Linking.openURL('https://t.me/beneficioinc')}>
                beneficio-community
              </Text>
            </Text>
          </View>
          <View style={styles.socialBodyFacebook}>
            <Text style={styles.socialBodyFacebookText}>
              {`Facebook: `}
              <Text style={{color: '#8dc5ff'}}
                    onPress={() => Linking.openURL('https://www.facebook.com/beneficioinc/?ref=aymt_homepage_panel&eid=ARB225N89pJKx5b5HYLCumQZf26FYErjKYnJTzgjdeR2ZWFtTFxYRKQSHA7mgn8a5PMaXxCnjZ0en4vp')}>
                beneficio-community-fb
              </Text>
            </Text>
          </View>
          <Text style={styles.socialTitle}>
            Наши партнеры
          </Text>
          <Text style={styles.socialBodyFacebookText}>
            {`{Имя партнера}: {ссылка на партнера}`}
          </Text>
        </ScrollView>
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Присоединяйся к нам!
          </Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f9f8fd",
    width: "100%",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    flex: 1
  },
  socialHeader: {
    backgroundColor: "#f9f8fd",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    textAlign: "center",
    padding: 20,
    width: "100%",
  },
  socialHeaderText: {
    color: "#42a4ff",
    fontSize: 22,
    fontFamily: "RobotoLight",
    textAlign: "left",
    fontWeight: "light",
    paddingBottom: 20
  },
  headerSubtext: {
    textAlign: "left",
    fontSize: 12,
    color: "#9d9ca1",
  },
  socialBody: {
    backgroundColor: "#f9f8fd",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    padding: 20,
    width: "100%"
  },
  socialTitle: {
    color: "#9d9ca1",
    textDecorationLine: "underline",
    textDecorationStyle: "solid",
    textDecorationColor: "#9d9ca1",
    paddingBottom: 10,
  },
  socialBodyWebsite: {
    
  },
  socialBodyWebsiteText: {
    color: "#bdbcc1",
    paddingLeft: 20,
    paddingBottom: 10,
  },
  socialBodyEmail: {
    
  },
  socialBodyEmailText: {
    color: "#bdbcc1",
    paddingLeft: 20,
    paddingBottom: 10,
  },
  socialBodyLinkedIn: {
    
  },
  socialBodyLinkedInText: {
    color: "#bdbcc1",
    paddingLeft: 20,
    paddingBottom: 10,
  },
  socialBodyInstagram: {
    
  },
  socialBodyInstagramText: {
    color: "#bdbcc1",
    paddingLeft: 20,
    paddingBottom: 10,
  },
  socialBodyTelegram: {
    
  },
  socialBodyTelegramText: {
    color: "#bdbcc1",
    paddingLeft: 20,
    paddingBottom: 10,
  },
  socialBodyFacebook: {
    
  },
  socialBodyFacebookText: {
    color: "#bdbcc1",
    paddingLeft: 20,
    paddingBottom: 10,
  },
  footer: {
    backgroundColor: "#f9f8fd",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    width: "100%",
    padding: 20,
  },
  footerText: {
    color: "#bdbcc1"
  }
});

export default Social;