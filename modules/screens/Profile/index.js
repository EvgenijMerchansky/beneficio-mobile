import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image
} from "react-native";

const userAvatar = "http://news.mspravka.info/wp-content/uploads/2019/05/00-2.jpg";

class Profile extends React.Component {
  render() {
    let { user } = this.props.navigation.state.params;
  
    return(
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerImage}>
            <Image
              style={styles.headerImageDimensions}
              source={{url: userAvatar}}
            />
          </View>
          <View style={styles.headerName}>
            <Text style={styles.headerNameText}>{user.firstName} {user.lastName}</Text>
            <Text style={styles.headerNameSubtext}>
              {user.completedLevels.length < 10 ? "(Начинающий)" :
                user.completedLevels.length < 20 ? "(Опытный)" :
                  user.completedLevels.length < 40 ? "(Профессионал)" : "(Мастер)"}
            </Text>
          </View>
        </View>
        <View style={styles.body}>
          <View style={styles.bodyTitleBlock}>
            <Text style={styles.bodyTitleBlockText}>
              Персональные данные
            </Text>
          </View>
          <View style={styles.bodyEmail}>
            <Text style={styles.bodyEmailText}>
              Имейл: {user.email}
            </Text>
          </View>
          <View style={styles.bodyPhone}>
            <Text style={styles.bodyPhoneText}>
              Телефон: {user.phone}
            </Text>
          </View>
          <View style={styles.bodyTitleBlock}>
            <Text style={styles.bodyTitleBlockText}>
              Сообщества
            </Text>
          </View>
          <View style={styles.bodyTelegram}>
            <Text style={styles.bodyTelegramText}>
              Telegram: {user.telegramNickname ? user.telegramNickname : "-"}
            </Text>
          </View>
          <View style={styles.bodyInstagram}>
            <Text style={styles.bodyInstagramText}>
              Instagram: {user.whatsUpNickname ? user.whatsUpNickname : "-"}
            </Text>
          </View>
          <View style={styles.bodyTitleBlock}>
            <Text style={styles.bodyTitleBlockText}>
              Прогресс прохождений
            </Text>
          </View>
          <View style={styles.bodyCompletedLevels}>
            <Text style={styles.bodyCompletedLevelsText}>
              Пройденные уровни: {user.completedLevels.length}
            </Text>
          </View>
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    flexDirection: "column",
    backgroundColor: "#f9f8fd"
  },
  header: {
    flex: .7,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-around",
    width: "100%",
    padding: 20,
    paddingTop: 40,
    backgroundColor: "#f9f8fd"
  },
  headerImage: {
    marginBottom: 15,
  },
  headerImageDimensions: {
    width: 160,
    height: 160,
    borderRadius: 80,
    objectFit: "cover",
    backgroundSize: "cover",
    borderWidth: 3,
    borderStyle: "solid",
    borderColor: "#8dc5ff"
  },
  headerName: {
    
  },
  headerNameText: {
    color: "#9d9ca1",
    fontSize: 24,
  },
  headerNameSubtext: {
    textAlign: "center",
    fontSize: 16,
    color: "#9d9ca1"
  },
  body: {
    flex: 1,
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    width: "100%",
    paddingLeft: 20,
    backgroundColor: "transparent",
    fontSize: 20
  },
  bodyTitleBlock: {
    paddingTop: 15,
    paddingBottom: 15,
  },
  bodyTitleBlockText: {
    color: "#9d9ca1",
    textDecorationLine: "underline",
    textDecorationStyle: "solid",
    textDecorationColor: "#9d9ca1"
  },
  bodyEmail: {
    paddingTop: 10,
    paddingBottom: 15,
    paddingLeft: 20
  },
  bodyEmailText: {
    color: "#bdbcc1",
  },
  bodyPhone: {
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 20
  },
  bodyPhoneText: {
    color: "#bdbcc1"
  },
  bodyTelegram: {
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 20
  },
  bodyTelegramText: {
    color: "#bdbcc1"
  },
  bodyInstagram: {
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 20
  },
  bodyInstagramText: {
    color: "#bdbcc1"
  },
  bodyCompletedLevels: {
    paddingTop: 10,
    paddingBottom: 15,
    paddingLeft: 20
  },
  bodyCompletedLevelsText: {
    color: "#bdbcc1"
  }
});

export default Profile;