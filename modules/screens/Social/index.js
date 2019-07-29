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
            Our community
          </Text>
          <Text style={styles.headerSubtext}>
            Join to our community and see news from us.
          </Text>
        </View>
        <ScrollView style={styles.socialBody}>
          <Text style={styles.socialTitle}>
            Links
          </Text>
          <View style={styles.socialBodyWebsite}>
            <Text style={styles.socialBodyWebsiteText}>
              {`Website: `}
              <Text style={{color: '#8dc5ff'}}
                    onPress={() => Linking.openURL('http://google.com')}>
                beneficio.com
              </Text>
            </Text>
          </View>
          <View style={styles.socialBodyEmail}>
            <Text style={styles.socialBodyEmailText}>
              {`Email: `}
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
                    onPress={() => Linking.openURL('https://www.instagram.com')}>
                beneficio.inc
              </Text>
            </Text>
          </View>
          <View style={styles.socialBodyTelegram}>
            <Text style={styles.socialBodyTelegramText}>
              {`Telegram: `}
              <Text style={{color: '#8dc5ff'}}
                    onPress={() => Linking.openURL('http://t.me/@emerchansky')}>
                beneficio-community
              </Text>
            </Text>
          </View>
          <View style={styles.socialBodyFacebook}>
            <Text style={styles.socialBodyFacebookText}>
              {`Facebook: `}
              <Text style={{color: '#8dc5ff'}}
                    onPress={() => Linking.openURL('https://www.facebook.com')}>
                beneficio-community-fb
              </Text>
            </Text>
          </View>
          <Text style={styles.socialTitle}>
            Partners
          </Text>
          <Text style={styles.socialBodyFacebookText}>
            {`{Partner name}: {partner link}`}
          </Text>
        </ScrollView>
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Join to us!
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
    width: "100%"
  },
  socialHeaderText: {
    color: "#9d9ca1",
    fontSize: 24,
  },
  headerSubtext: {
    textAlign: "left",
    fontSize: 12,
    color: "#8dc5ff"
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