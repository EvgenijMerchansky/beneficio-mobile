import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  FlatList,
  Image
} from "react-native";
import { GET_LEVELS_LIST, SIGN_OUT, GET_USER, REFRESH_TOKEN } from "../../constants/apis";

import HeaderTabs from "../../components/HeaderTabs/index";
import ListItem from "../../components/ListItem/index";

const EmptyList = () => (
  <View style={styles.emptyList}>
    <Text style={styles.emptyListText}>
      Список пуст.
    </Text>
  </View>
);

const stateReseter = {
  userId: "",
  activeTab: "active",
  accessToken: "",
  refreshToken: "",
  overview: false,
  expires: "",
  lists: {
    activeList: [],
    completedList: [],
    activeCount: 0,
    completedCount: 0,
    timeToNextLevelOpening: 0
  },
  user: {},
  loading: false
};

class Dashboard extends React.Component {
  state = {
    userId: "",
    activeTab: "active",
    accessToken: "",
    refreshToken: "",
    overview: "",
    expires: "",
    lists: {
      activeList: [],
      completedList: [],
      activeCount: 0,
      completedCount: 0,
      timeToNextLevelOpening: 0
    },
    user: {},
    loading: false
  };
  
  componentDidMount() {
    let {
      userId,
      accessToken,
      refreshToken,
      expires,
      overview
    } = this.props.navigation.state.params;
  
    this.setState(state => ({ ...state, overview: overview }));
    
    this.getListsAsync(userId, accessToken, refreshToken, expires);
    this.getUserProfile(userId, accessToken);
    this.showOverview(overview);
  }
  
  showOverview = (overview) => {
  
    if (overview) {
      Alert.alert(
        "Добро пожаловать в beneficio!",
        `Прежде всего, предлагаю тебе прочитать раздел "Гайд" для разьяснения в пользовании приложением.`,
        [
          {
            text: "Понял, принял!",
            onPress: () => this.props.navigation.push("Rules")
          }
        ]
      );
    }
    
    return false;
  };
  
  refreshToken = (refreshToken, userId) => {
    const refreshTokenBody = {
      refreshToken: refreshToken
    };
    
    const refreshTokenSettings = {
      method: "post",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        userId: userId
      },
      body: JSON.stringify(refreshTokenBody)
    };
    
    fetch(REFRESH_TOKEN, refreshTokenSettings)
      .then(response => {
        if (response.status > 205 && response.status < 500) {
          this.setState(state => ({
            ...state,
            ...stateReseter,
            loading: false
          }));
          
          Alert.alert(
            "Что то пошло не так",
            "Пожалуйста повторите снова.",
            [
              {
                text: "OK",
                onPress: () => this.props.navigation.push("SplashScreen")
              }
            ]
          );
          
          return false;
        }
        
        response.json().then(data => {
          this.setState(state => ({
            ...state,
            accessToken: data.accessToken,
            refreshToken: data.refreshToken,
            expires: data.expires,
            loading: false
          }));
        });
      })
      .catch(() => {
        this.setState(state => ({
          ...state,
          ...stateReseter,
          loading: false
        }));
      });
  };
  
  getListsAsync = (userId, bearer, refreshToken, expires) => {
    this.setState(state => ({
      ...state,
      loading: true,
      userId,
      accessToken: bearer,
      refreshToken,
      expires
    }));
    
    fetch(GET_LEVELS_LIST, {
      method: "get",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${bearer}`,
        userId: userId
      }
    }).then(response => {
      if (response.status > 205 && response.status < 500) {
        this.refreshToken(refreshToken, userId);
        
        fetch(GET_LEVELS_LIST, {
          method: "get",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.state.accessToken}`,
            userId: this.state.userId
          }
        }).then(response => {
          response.json().then(data => {
            this.setState(state => ({
              ...state,
              lists: {
                ...data
              },
              loading: false
            }));
          });
        });
      } else {
        response.json().then(data => {
          this.setState(state => ({
            ...state,
            lists: {
              ...data
            },
            loading: false
          }));
        });
      }
    });
  };
  
  getUserProfile = (userId, accessToken) => {
    this.setState(state => ({ ...state, loading: true }));
    
    const settings = {
      method: "get",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        userId: userId,
        Authorization: `Bearer ${accessToken}`,
      }
    };
    
    fetch(GET_USER, settings)
      .then(response => {
        
        if (response.status > 205 && response.status < 500) {
          this.refreshToken(this.state.refreshToken, this.state.userId);
          
          fetch(GET_USER, settings)
            .then(response => {
              
              response.json().then(data => {
                this.setState(state => ({
                  ...state,
                  user: {
                    ...data
                  },
                  loading: false
                }));
              })
            })
        } else {
          response.json().then(data => {
            this.setState(state => ({
              ...state,
              user: {
                ...data
              },
              loading: false
            }));
          });
        }
      })
  };
  
  signOut = () => {
    Alert.alert("Do you really want exit?", "", [
      {
        text: "Logout",
        onPress: () => this.signOutRequest()
      },
      {
        text: "Cancel",
        onPress: () => {}
      }
    ]);
  };
  
  signOutRequest = () => {
    this.setState(state => ({
      ...state,
      loading: true
    }));
    
    fetch(SIGN_OUT, {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.state.accessToken}`,
        userId: this.state.userId
      }
    }).then(response => {
      if (response.status > 205 && response.status < 500) {
        this.refreshToken(this.state.refreshToken, this.state.userId);
        
        fetch(SIGN_OUT, {
          method: "post",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.state.accessToken}`,
            userId: this.state.userId
          }
        }).then(() => {
          this.setState(state => ({
            ...state,
            ...stateReseter,
            loading: false
          }));
          this.props.navigation.pop();
        });
      } else {
        this.setState(state => ({
          ...state,
          ...stateReseter,
          loading: false
        }));
        this.props.navigation.pop();
      }
    });
  };
  
  pushToProfile = () => {
    this.props.navigation.push("ProfileScreen", { user: this.state.user })
  };
  
  changeTab = current => {
    this.setState(state => ({ ...state, activeTab: current }));
  };
  
  pushToLevel = levelId => {
    this.props.navigation.push("LevelScreen", {
      userId: this.state.userId,
      accessToken: this.state.accessToken,
      refreshToken: this.state.refreshToken,
      refreshTokenHandler: this.refreshToken,
      levelId: levelId,
    })
  };
  
  closeModal = () => {
    this.setState(state => ({ ...state, overview: false }));
  };
  
  render() {
    let {
      userId,
      accessToken,
      refreshToken,
      expires,
      lists,
      loading,
      activeTab
    } = this.state;
  
    return (
      <View style={{ flex: 1 }}>
        <View>
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.headerLogout}
              onPress={() => this.signOut()}
            >
              <Image
                style={styles.imageDimensions}
                source={require("../../../assets/logout2.png")}
              />
            </TouchableOpacity>
            <View style={styles.headerTabsWrapper}>
              <HeaderTabs
                currentTab={this.state.activeTab}
                onChange={this.changeTab}
              />
            </View>
            
            <TouchableOpacity
              style={styles.headerProfile}
              onPress={() => this.pushToProfile()}
            >
              <Image
                style={styles.imageDimensions}
                source={require("../../../assets/profile4.png")}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ flex: 0.9 }}>
          <FlatList
            style={{zIndex: 0}}
            data={
              activeTab === "active" ? lists.activeList : lists.completedList
            }
            ListEmptyComponent={() => (<EmptyList/>)}
            renderItem={({item, index}) => (
              <ListItem
                item={item}
                index={index}
                activeTab={this.state.activeTab}
                pushHandler={this.pushToLevel}
                timeToNext={this.state.lists.timeToNextLevelOpening}
              />
            )}
            keyExtractor={item => item.id}
            refreshing={loading}
            onRefresh={() =>
              this.getListsAsync(userId, accessToken, refreshToken, expires)
            }
          />
        </View>
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.footerGuide}
            onPress={() => this.props.navigation.push("Rules")}
          >
              <Image
                style={styles.imageLinkDimensions}
                source={require("../../../assets/using-guide.png")}
              />
              <Text style={styles.footerGuideText}>
                Гайд
              </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.footerPrivacy}
            onPress={() => this.props.navigation.push("PrivacyPolicy")}
          >
            <Image
              style={styles.imageLinkDimensions}
              source={require("../../../assets/privacy.png")}
            />
            <Text style={styles.footerPrivacyText}>
              Политики
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.footerSocial}
            onPress={() => this.props.navigation.push("Social")}
          >
            <Image
              style={styles.imageLinkDimensions}
              source={require("../../../assets/social.png")}
            />
            <Text style={styles.footerSocialText}>
              Сообщество
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.footerPayment}
            onPress={() => this.props.navigation.push("PaymentRules")}
          >
            <Image
              style={styles.imageLinkDimensions}
              source={require("../../../assets/payment.png")}
            />
            <Text style={styles.footerPaymentText}>
              Комиссии
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  loadContainer: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: "#f9f8fd"
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10
  },
  signUpLink: {
    fontSize: 12,
    color: "#42a4ff"
  },
  headerStyle: {},
  imageDimensions: {
    width: 30,
    height: 30
  },
  header: {
    zIndex: 9999,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    alignContent: "flex-end",
    backgroundColor: "#f9f8fd",
    borderTopColor: "transparent",
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: "#ecebf0",
    height: 90,
    borderBottom: "solid",
    paddingTop: 40,
    paddingBottom: 10,
    borderWidth: 1,
    marginBottom: 1
  },
  headerLogout: {
    width: "15%",
    height: "100%",
    flex: 1,
    flexGrow: 1,
    flexDirection: "column",
    backgroundColor: "transparent",
    justifyContent: "center",
    alignContent: "center",
    verticalAlign: "center",
    alignItems: "center"
  },
  headerProfile: {
    flexGrow: 1,
    width: "15%",
    height: "100%",
    flex: 1,
    flexDirection: "column",
    backgroundColor: "transparent",
    justifyContent: "center",
    alignContent: "center",
    verticalAlign: "center",
    alignItems: "center"
  },
  headerTabsWrapper: {
    flex: 1,
    flexGrow: 4,
    flexDirection: "column"
  },
  footer: {
    flex: 0.1,
    flexDirection: "row",
    justifyContent: "space-around",
    alignContent: "center",
    backgroundColor: "#f9f8fd",
    borderTopColor: "#ecebf0",
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: "transparent",
    borderBottom: "solid",
    borderWidth: 1,
    marginTop: -1,
    height: 60,
  },
  footerGuide: {
    paddingTop: 15,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "transparent",
    width: "25%",
    flexDirection: "column",
    fontSize: 12
  },
  footerGuideText: {
    textAlign: "center",
    fontSize: 12,
    color: "#42a4ff"
  },
  footerPrivacy: {
    paddingTop: 15,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "transparent",
    width: "25%",
    flexDirection: "column",
  },
  footerPrivacyText: {
    textAlign: "center",
    fontSize: 12,
    color: "#42a4ff"
  },
  footerSocial: {
    paddingTop: 15,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "transparent",
    width: "25%",
    flexDirection: "column",
  },
  footerSocialText: {
    textAlign: "center",
    fontSize: 12,
    color: "#42a4ff"
  },
  footerPayment: {
    paddingTop: 15,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "transparent",
    width: "25%",
    flexDirection: "column",
  },
  footerPaymentText: {
    textAlign: "center",
    fontSize: 12,
    color: "#42a4ff"
  },
  imageLinkDimensions: {
    justifyContent: "center",
    alignItems: "center",
    width: 25,
    height: 25
  },
  emptyList: {
    flex: 1,
    padding: 40,
    backgroundColor: "transparent",
    flexDirection: "column",
    justifyContent: "center"
  },
  emptyListText: {
    textAlign: "center",
    fontSize: 12,
    color: "#bdbcc1"
  }
});

export default Dashboard;
