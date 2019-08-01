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

import { UPDATE_USER_AVATAR } from "../../constants/apis";

import { ImagePicker, Permissions, Constants } from 'expo';

class Profile extends React.Component {
  
  state = {
    image: null,
    loading: false,
  };
  
  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        
        Alert.alert('Подтверждите что даете согласие на доступ к камере и матриалам.');
      }
    }
  };
  
  componentDidMount() {
    let { user } = this.props.navigation.state.params;
    
    this.setState(state => ({ ...state, image: user.avatarUrl }))
  }
  
  updateUserAvatar = (uri) => {
    this.setState(state => ({ ...state, loading: true }));
  
    let { user, getUpdatedUseProfile } = this.props.navigation.state.params;
  
    fetch(UPDATE_USER_AVATAR, {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        userId: user.id
      },
      body: JSON.stringify({ imageUrl: uri })
    }).then(response => {
      if (response.status > 205 && response.status < 500) {
    
        Alert.alert(
          "Что то пошло не так",
          "Пожалуйста, попробуйте снова.",
          [
            {
              text: "OK",
              onPress: () => {
              }
            }
          ]
        );
    
        response.json().then(() => {
          this.setState(state => ({
            ...state,
            loading: false
          }));
        });
      } else {
        response.json().then(data => {
          this.setState(state => ({
            ...state,
            image: data.imageUrl,
            loading: false
          }));
        });
      }
  
      getUpdatedUseProfile();
    })
  };
  
  _pickImage = async () => {
    this.getPermissionAsync();
    
    let result = await ImagePicker.launchImageLibraryAsync({
      base64: true,
      allowsEditing: true,
      aspect: [4, 3],
    });
    
    if (!result.cancelled) {
  
      let uri = `data:image/png;base64,${result.base64}`;
  
      this.updateUserAvatar(uri);
    }
  };
  
  render() {
    let { user } = this.props.navigation.state.params;

    return(
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerImage}>
            <TouchableOpacity onPress={this._pickImage}>
              {this.state.loading ?
                <View style={[styles.loadContainer, styles.horizontal]}>
                  <ActivityIndicator
                    size="small"
                    color="#000"
                  />
                </View> :
                <Image
                  style={styles.headerImageDimensions}
                  source={this.state.image === null ? require("../../../assets/default.png") : {url: this.state.image}}
                />
              }
            </TouchableOpacity>
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
              Прогресс прохождений
            </Text>
          </View>
          <View style={styles.bodyCompletedLevels}>
            <Text style={styles.bodyCompletedLevelsText}>
              Пройденные уровни: {user.completedLevels.length}
            </Text>
          </View>
          <View style={styles.bodyCompletedLevels}>
            <Text style={styles.bodyCompletedLevelsText}>
              Внесенные комиссии: ${user.totalCommissions}
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
  },
  horizontal: {
    width: 160,
    height: 160,
    borderRadius: 80,
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#f9f8fd",
    borderWidth: 3,
    borderStyle: "solid",
    borderColor: "#8dc5ff"
  },
  loadContainer: {
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: "#f9f8fd",
    borderWidth: 3,
    borderStyle: "solid",
    borderColor: "#8dc5ff"
  }
});

export default Profile;