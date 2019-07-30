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

import { SIGN_UP } from "../../constants/apis";

class PasswordScreen extends React.Component {
  state = {
    password: {
      value: undefined,
      isValid: false
    },
    loading: false
  };
  
  dismissKeyboard = () => Keyboard.dismiss();
  
  signUpAsync = () => {
    let { params } = this.props.navigation.state;
    
    this.setState(state => ({
      ...state,
      loading: true
    }));
    
    let signInModel = {
      ...params,
      password: this.state.password.value
    };
    
    fetch(SIGN_UP, {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(signInModel)
    })
      .then(response => {
        if (response.status > 205 && response.status < 500) {
          response.json().then(() => {
            this.setState(state => ({
              ...state,
              loading: false
            }));
            Alert.alert("Что то пошло не так.", "Пожалуйста попробуйте еще раз.", [
              {
                text: "OK",
                onPress: () => this.props.navigation.push("SplashScreen")
              }
            ]);
          });
          
          return;
        }
        
        this.setState(state => ({
          ...state,
          password: {
            value: undefined,
            isValid: false
          },
          loading: false
        }));
        
        Alert.alert("Поздравляем!", "Аккаунт был успешно создан.", [
          {
            text: "Отлично",
            onPress: () => this.props.navigation.push("SplashScreen")
          }
        ]);
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
  };
  
  validate = value => {
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
            <Text style={styles.headerText}>Введите пароль:</Text>
            <TextInput
              placeholder="Введите пароль"
              style={styles.field}
              onChangeText={text => this.validate(text)}
              value={this.state.password.value}
              maxLength={50}
              label="password"
              secureTextEntry={true}
            />
            <TouchableOpacity
              style={
                this.state.password.isValid
                  ? styles.nextEnable
                  : styles.nextDisable
              }
              onPress={() => this.signUpAsync()}
              disabled={!this.state.password.isValid}
            >
              <Text style={styles.nextColor}>Завершить</Text>
            </TouchableOpacity>
            <Text style={styles.subtitle}>
              5/5 Введите Ваш пароль.
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

export default PasswordScreen;
