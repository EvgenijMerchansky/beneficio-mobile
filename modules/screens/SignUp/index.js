import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from "react-native";

import ActivityIndicator from "../../components/ActivityIndicatorWrapper";

import {
  SEND_VERIFICATION_CODE,
  CHECK_USER_BY_EMAIL
} from "../../constants/apis";

class SignUp extends React.Component {
  state = {
    email: {
      value: undefined,
      isValid: false
    },
    verificationCode: undefined,
    loading: false
  };
  
  dismissKeyboard = () => Keyboard.dismiss();
  
  getCode = () => Math.floor(100000 + Math.random() * 900000);
  
  verifyEmailAsync = () => {
    this.setState(state => ({
      ...state,
      loading: true
    }));
    
    fetch(CHECK_USER_BY_EMAIL, {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: this.state.email.value
      })
    }).then(response => {
      if (response.status > 205 && response.status < 500) {
        response.json().then(() => {
          this.setState(state => ({
            ...state,
            email: {
              value: undefined,
              isValid: false
            },
            loading: false
          }));
          
          Alert.alert(
            "Неверный электроный адрес",
            "Пользователь с таким адресом уже существует.",
            [
              {
                text: "OK",
                onPress: () => {}
              }
            ]
          );
        });
      } else {
        const verificationCode = {
          email: this.state.email.value,
          verificationCode: this.getCode()
        };
        
        fetch(SEND_VERIFICATION_CODE, {
          method: "post",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify(verificationCode)
        })
          .then(response => {
            if (response.status > 205 && response.status < 500) {
              response.json().then(() => {
                this.setState(state => ({
                  ...state,
                  loading: false
                }));
                Alert.alert(
                  "Что то пошло не так.",
                  "Пожалуйста, попробуйте снова.",
                  [
                    {
                      text: "OK",
                      onPress: () => {}
                    }
                  ]
                );
              });
              
              return;
            }
            
            this.props.navigation.push("VerifyEmail", verificationCode);
            
            this.setState(state => ({
              ...state,
              loading: false
            }));
          })
          .catch(() => {
            this.setState(state => ({
              ...state,
              email: {
                value: undefined,
                isValid: false
              }
            }));
          });
      }
    });
  };
  
  onEmailRecheck = () => {
    if (this.state.email.isValid) {
      Alert.alert(
        "Подтвердить этот электронный адрес?",
        this.state.email.value,
        [
          {
            text: "Отмена",
            onPress: () => {},
            style: "cancel"
          },
          {
            text: "Подтвердить",
            onPress: () => this.verifyEmailAsync()
          }
        ],
        { cancelable: false }
      );
    }
  };
  
  validateEmail = email => {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };
  
  onChangeEmailField = value => {
    if (this.validateEmail(value)) {
      this.setState(state => ({
        ...state,
        email: {
          value,
          isValid: true
        }
      }));
    } else {
      this.setState(state => ({
        ...state,
        email: {
          value,
          isValid: false
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
      <TouchableWithoutFeedback onPress={this.dismissKeyboard}>
        <KeyboardAvoidingView
          behavior="padding"
          enabled
          style={styles.container}
          keyboardShouldPersistTaps="handled"
        >
          <View>
            <Text style={styles.headerText}>Регистрация нового аккаунта</Text>
            <TextInput
              placeholder="Электронный адрес"
              style={styles.field}
              onChangeText={text => this.onChangeEmailField(text)}
              value={this.state.email.value}
              maxLength={50}
              label="email"
              autoCapitalize="none"
            />
            <TouchableOpacity
              style={
                this.state.email.isValid
                  ? styles.nextEnable
                  : styles.nextDisable
              }
              onPress={() => this.onEmailRecheck()}
              disabled={!this.state.email.isValid}
            >
              <Text style={styles.nextColor}>Дальше</Text>
            </TouchableOpacity>
            <Text style={styles.subtitle}>
              1/5 Введите электронный адрес.
            </Text>
          </View>
          <View style={styles.signInBlock}>
            <Text style={styles.question}>Есть аккаунт?</Text>
            <TouchableOpacity onPress={() => this.props.navigation.pop()}>
              <Text style={styles.signUpLink}>{` Вход`}</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f8fd",
    justifyContent: "flex-start",
    alignContent: "center",
    alignItems: "center",
    textAlign: "center",
    paddingTop: 30
  },
  field: {
    backgroundColor: "#f4f3f8",
    borderRadius: 4,
    height: 40,
    marginBottom: 10,
    width: 300,
    borderColor: "#e8e7ec",
    borderWidth: 1,
    padding: 10,
    color: "#9d9ca1"
  },
  nextEnable: {
    width: 300,
    height: 40,
    backgroundColor: "#42a4ff",
    borderRadius: 4,
    alignItems: "center",
    paddingTop: 12
  },
  nextDisable: {
    width: 300,
    height: 40,
    backgroundColor: "#8dc5ff",
    borderRadius: 4,
    alignItems: "center",
    paddingTop: 12
  },
  nextColor: {
    color: "#fff"
  },
  headerText: {
    color: "#bdbcc1",
    fontSize: 18,
    textAlign: "center",
    paddingBottom: 10
  },
  subtitle: {
    textAlign: "center",
    paddingTop: 10,
    color: "#bdbcc1",
    fontSize: 12
  },
  question: {
    fontSize: 12,
    color: "#bdbcc1"
  },
  signUpLink: {
    fontSize: 12,
    color: "#42a4ff"
  },
  signInBlock: {
    flexDirection: "row",
    justifyContent: "center",
    paddingBottom: 30
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10
  },
  loadContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#f9f8fd"
  }
});

export default SignUp;
