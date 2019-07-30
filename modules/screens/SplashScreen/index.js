import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Alert
} from "react-native";

import ActivityIndicator from "../../components/ActivityIndicatorWrapper";

import { SIGN_IN } from "../../constants/apis";

const messages = {
  email: "Поле email - не может быть пустым",
  password: "Поле password - не может быть пустым",
  badRequest:
  "Вы ввели некоректные логин или пароль.\n" +
  "Попробуйте еще раз.\nЕсли у Вас еще нет аккаунта - зарегестрируйтесь"
};

class SplashScreen extends React.Component {
  state = {
    lang: "en",
    userId: undefined,
    tokens: undefined,
    email: {
      value: undefined,
      isValid: false
    },
    password: {
      value: undefined,
      isValid: false
    },
    loading: false,
    showCheckout: false,
    modalIsOpen: true
  };
  
  componentWillMount() {
    this.globalFiledCleaner();
  }
  
  globalFiledCleaner = () => {
    this.setState(state => ({
      ...state,
      password: {
        value: undefined,
        isValid: false
      }
    }));
  };
  
  dismissKeyboard = () => Keyboard.dismiss();
  
  static navigationOptions = {
    headerMode: null,
    headerStyle: {
      backgroundColor: "#f9f8fd",
      borderBottomWidth: 0
    }
  };
  
  getUserId = token => {
    
    window.atob = require('Base64').atob;
    
    let base64Url = token.split('.')[1];
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    let jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
  
    return JSON.parse(jsonPayload).user_id;
  };
  
  signInAsync = credentials => {
    this.setState(state => ({ ...state, loading: true }));
    
    fetch(SIGN_IN, {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(credentials)
    })
      .then(response => {
        if (response.status > 205 && response.status < 500) {
          response.json().then(() => {
            this.setState(state => ({
              ...state,
              loading: false
            }));
            Alert.alert("Неверные данные", messages.badRequest);
          });
        } else {
          response.json().then(data => {
            this.setState(state => ({
              ...state,
              userId: this.getUserId(data.accessToken),
              tokens: data,
              loading: false,
              password: {
                value: undefined,
                isValid: false
              }
            }));
            
            this.props.navigation.push("Dashboard", {
              accessToken: this.state.tokens.accessToken,
              refreshToken: this.state.tokens.refreshToken,
              expires: this.state.tokens.expires,
              overview: this.state.tokens.overview,
              userId: this.getUserId(data.accessToken)
            });
          });
        }
      })
      .catch(() => {
        this.setState(state => ({
          ...state,
          tokens: undefined,
          loading: false
        }));
      });
  };
  
  pushToDashboard = () => {
    if (this.state.email.isValid && this.state.password.isValid) {
      const credentials = {
        email: this.state.email.value.replace(/\s/g, ""),
        password: this.state.password.value
      };
      
      this.signInAsync(credentials);
      
      if (this.state.tokens !== undefined) {
        this.globalFiledCleaner();
      }
    }
    
    if (!this.state.email.isValid) {
      this.setState(state => ({
        ...state,
        email: { ...this.state.email }
      }));
    }
    
    if (!this.state.password.isValid) {
      this.setState(state => ({
        ...state,
        password: { ...this.state.password }
      }));
    }
  };
  
  validate = (value, label) => {
    if (value === null || value === "") {
      this.setState(state => ({
        ...state,
        [label]: {
          value: undefined,
          isValid: false
        }
      }));
    } else {
      this.setState(state => ({
        ...state,
        [label]: {
          value,
          isValid: true
        }
      }));
    }
  };
  
  render() {
    if (this.state.loading) {
      return (
        <ActivityIndicator/>
      );
    }
    
    return (
      <TouchableWithoutFeedback
        onPress={this.dismissKeyboard}
        style={{ fontFamily: "OpenSans" }}
      >
        <KeyboardAvoidingView
          behavior="padding"
          enabled
          style={styles.container}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.logo}>
            <Image
              style={imageDimensions.stretch}
              source={require("../../../assets/app-logo-transparent.png")}
            />
          </View>
          <View>
            <TextInput
              placeholder="Введите електронный адрес"
              style={styles.field}
              onChangeText={text => this.validate(text, "email")}
              value={this.state.email.value}
              maxLength={50}
              label="email"
            />
            <TextInput
              placeholder="Введите пароль"
              style={styles.field}
              onChangeText={text => this.validate(text, "password")}
              value={this.state.password.value}
              maxLength={50}
              label="password"
              secureTextEntry={true}
            />
            <TouchableOpacity
              onPress={() => this.props.navigation.push("ForgotPassword")}
            >
              <Text style={styles.forgotPasswordButton}>Забыли пароль?</Text>
            </TouchableOpacity>
            {this.state.email.isValid && this.state.password.isValid ? (
                <TouchableOpacity
                  style={styles.signInEnable}
                  onPress={() => this.pushToDashboard()}
                  disabled={false}
                >
                  <Text style={styles.signInColor}>Вход</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={styles.signInDisable}
                  onPress={() => this.pushToDashboard()}
                  disabled={true}
                >
                  <Text style={styles.signInColor}>Вход</Text>
                </TouchableOpacity>
              )}
          </View>
          <View style={styles.signUpBlock}>
            <Text style={styles.question}>Еще нет аккаунта?</Text>
            <TouchableOpacity
              onPress={() => this.props.navigation.push("SignUp")}
            >
              <Text style={styles.signUpLink}>{` Регистрация`}</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    );
  }
}

const imageDimensions = StyleSheet.create({
  stretch: {
    width: 300,
    height: 150
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f8fd",
    justifyContent: "space-around",
    alignContent: "center",
    alignItems: "center",
    textAlign: "center"
  },
  loadContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#f9f8fd"
  },
  logo: {
    backgroundColor: "transparent",
    textAlign: "center"
  },
  field: {
    backgroundColor: "#f4f3f8",
    fontFamily: "RobotoLight",
    borderRadius: 4,
    height: 40,
    marginBottom: 10,
    width: 300,
    borderColor: "#e8e7ec",
    borderWidth: 1,
    padding: 10
  },
  signInEnable: {
    width: 300,
    height: 40,
    backgroundColor: "#42a4ff",
    borderRadius: 4,
    alignItems: "center",
    paddingTop: 12
  },
  signInDisable: {
    width: 300,
    height: 40,
    backgroundColor: "#8dc5ff",
    borderRadius: 4,
    alignItems: "center",
    paddingTop: 12
  },
  signInColor: {
    color: "#fff"
  },
  signUpBlock: {
    flexDirection: "row",
    justifyContent: "center"
  },
  question: {
    fontSize: 12,
    color: "#bdbcc1"
  },
  signUpLink: {
    fontSize: 12,
    color: "#42a4ff"
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10
  },
  forgotPasswordButton: {
    color: "#42a4ff",
    paddingBottom: 10,
    textAlign: "right",
    fontSize: 12
  }
});

export default SplashScreen;
