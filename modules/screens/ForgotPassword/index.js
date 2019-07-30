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
  Alert
} from "react-native";

import ActivityIndicator from "../../components/ActivityIndicatorWrapper";

import { RESET_PASSWORD } from "../../constants/apis";

const stateReseter = {
  email: {
    value: undefined,
    isValid: false
  },
  password: {
    value: undefined,
    isValid: false
  },
  loading: false
};

class ForgotPassword extends React.Component {
  state = {
    email: {
      value: undefined,
      isValid: false
    },
    password: {
      value: undefined,
      isValid: false
    },
    loading: false
  };
  
  dismissKeyboard = () => Keyboard.dismiss();
  
  getCode = () => Math.floor(100000 + Math.random() * 900000);
  
  verifyEmailAsync = () => {
    this.setState(state => ({
      ...state,
      loading: true
    }));
    
    let verificationCode = this.getCode();
    
    fetch(RESET_PASSWORD, {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: this.state.email.value,
        verificationCode: verificationCode
      })
    }).then(response => {
      if (response.status > 205 && response.status < 500) {
        response.json().then(() => {
          this.setState(state => ({
            ...state,
            loading: false
          }));
          Alert.alert(
            "Неправильный электронный адрес",
            "Пользователь с таким электронным адресом не найден.",
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
      
      this.props.navigation.push("ConfirmNewPassword", {
        email: this.state.email.value,
        newPassword: this.state.password.value,
        verificationCode: verificationCode
      });
      
      this.setState(state => ({
        ...state,
        ...stateReseter
      }));
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
            text: "OK",
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
  
  onChangePasswordField = value => {
    if (value === "" || value === null || value.length < 8) {
      this.setState(state => ({
        ...state,
        password: {
          value,
          isValid: false
        }
      }));
    } else {
      this.setState(state => ({
        ...state,
        password: {
          value,
          isValid: true
        }
      }));
    }
  };
  
  render() {
    let formIsValid = this.state.email.isValid && this.state.password.isValid;
    
    if (this.state.loading) {
      return <ActivityIndicator />;
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
            <Text style={styles.headerText}>Изменить пароль:</Text>
            <TextInput
              placeholder="Электронный адрес"
              style={styles.field}
              onChangeText={text => this.onChangeEmailField(text)}
              value={this.state.email.value}
              maxLength={50}
              label="email"
            />
            <TextInput
              placeholder="Новый пароль"
              style={styles.field}
              onChangeText={text => this.onChangePasswordField(text)}
              value={this.state.password.value}
              maxLength={50}
              label="password"
              secureTextEntry={true}
            />
            <TouchableOpacity
              style={formIsValid ? styles.nextEnable : styles.nextDisable}
              onPress={() => this.onEmailRecheck()}
              disabled={!formIsValid}
            >
              <Text style={styles.nextColor}>Дальше</Text>
            </TouchableOpacity>
            <Text style={styles.subtitle}>
              1/2 Введите электронный адрес.
            </Text>
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
    padding: 10
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

export default ForgotPassword;
