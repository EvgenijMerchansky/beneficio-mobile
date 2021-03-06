import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  AsyncStorage,
  Alert,
  FlatList,
  Image,
  StatusBar
} from "react-native";

import {
  GET_LEVELS_LIST,
  SIGN_OUT,
  GET_USER,
  REFRESH_TOKEN,
  GET_LOTTERY_TICKET
} from "../../constants/apis";

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
  activeTab: "active",
  lists: {
    activeLevelsList: [],
    completedLevelsList: [],
    activeDropsList: [],
    completedDropsList: [],
    activeLevelsCount: 0,
    completedLevelsCount: 0,
    activeDropsCount: 0,
    completedDropsCount: 0,
    timeToNextLongOpening: 0,
    timeToNextShortOpening: 0
  },
  lotteryTicketIsExists: undefined,
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
      activeLevelsList: [],
      completedLevelsList: [],
      activeDropsList: [],
      completedDropsList: [],
      activeLevelsCount: 0,
      completedLevelsCount: 0,
      activeDropsCount: 0,
      completedDropsCount: 0,
      timeToNextLongOpening: 0,
      timeToNextShortOpening: 0
    },
    user: {},
    lotteryTicketIsExists: undefined,
    lotteryBought: undefined,
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
    
    this.getUserProfile(userId, accessToken);
    this.getListsAsync(userId, accessToken, refreshToken, expires);
    this.showOverview(overview);
    this.getLotteryTicket();
  }
  
  componentWillUnmount() {
    this.getLotteryTicket();
  }
  
  showOverview = (overview) => {
  
    if (overview) {
      Alert.alert(
        "Добро пожаловать в beneficio!",
        `Советую тебе прочитать раздел «Гайд» для того, чтобы понять как правильно пользоваться приложением.`,
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
  
  getLotteryTicket = () => {
    this.setState(state => ({ ...state, loading: true }));
    
    fetch(GET_LOTTERY_TICKET, {
      method: "get",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      }
    }).then(response => {
      if (response.status > 205 && response.status < 500) {
        this.setState(state => ({
          ...state,
          lotteryTicketIsExists: false,
          loading: false
        }));
        
        return false;
      }
      
      response.json().then(() => {
        this.setState(state => ({
          ...state,
          lotteryTicketIsExists: true,
          loading: false
        }));
      });
    })
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
                onPress: () => {
                  this.props.navigation.push("SplashScreen");
                  this.clearStorage();
                }
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
  
    this.getLotteryTicket();
  
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
  
        if (response.status === 400) {
  
          this.refreshToken(this.state.refreshToken, this.state.userId);
          
          fetch(GET_USER, settings)
            .then(response => {
              
              response.json().then(data => {
                this.setState(state => ({
                  ...state,
                  user: {
                    ...data
                  },
                  lotteryBought: data.lotteryIsBought,
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
              lotteryBought: data.lotteryIsBought,
              loading: false
            }));
          });
        }
      })
  };
  
  signOut = () => {
    Alert.alert("Вы действительно хотите выйти?", "", [
      {
        text: "Выход",
        onPress: () => this.signOutRequest()
      },
      {
        text: "Отмена",
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
          this.clearStorage();
          this.props.navigation.pop();
        });
      } else {
        this.setState(state => ({
          ...state,
          ...stateReseter,
          loading: false
        }));
        this.clearStorage();
        this.props.navigation.pop();
      }
    });
  };
  
  clearStorage = () => {
    (async () => {
      await AsyncStorage.clear();
    })()
  };
  
  pushToProfile = () => {
  
    this.props.navigation.push("ProfileScreen", {
      user: this.state.user,
      getUpdatedUseProfile: () => this.getUserProfile(this.state.userId, this.state.accessToken) })
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
      type: this.state.activeTab === "active" ? 1 : 2
    })
  };
  
  render() {
    let {
      userId,
      accessToken,
      refreshToken,
      expires,
      lists,
      loading,
      activeTab,
      lotteryTicketIsExists,
      lotteryBought
    } = this.state;
  
    return (
      <View style={{ flex: 1 }}>
        <View>
          <StatusBar
            backgroundColor="blue"
            barStyle="dark-content"
          />
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
                source={
                  lotteryTicketIsExists && !lotteryBought ?
                    require("../../../assets/profile-lottery-exists.png") :
                      lotteryTicketIsExists && lotteryBought ?
                        require("../../../assets/profile-lottery-bought.png") :
                        require("../../../assets/profile.png")}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ flex: 0.9 }}>
          <FlatList
            style={{zIndex: 0}}
            data={
              activeTab === "active" ? lists.activeLevelsList : activeTab === "drops" ? lists.activeDropsList : [...lists.completedLevelsList]
            }
            ListEmptyComponent={() => (<EmptyList/>)}
            renderItem={({item, index}) => (
              <ListItem
                item={item}
                index={index}
                activeTab={this.state.activeTab}
                pushHandler={this.pushToLevel}
                timeToNext={
                  this.state.activeTab === "active" ?
                    this.state.lists.timeToNextLongOpening :
                    this.state.lists.timeToNextShortOpening}
              />
            )}
            keyExtractor={item => item.id}
            refreshing={loading}
            onRefresh={() => this.getListsAsync(userId, accessToken, refreshToken, expires)}
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
              Политика
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
