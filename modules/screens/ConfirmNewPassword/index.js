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

import { CONFIRM_RESET_PASSWORD } from "../../constants/apis";

const stateReseter = {
  userEmail: undefined,
  verificationCode: undefined,
  enteredCode: undefined,
  codesIsEquals: false,
  codeFormatIsValid: false,
  loading: false
};

class ConfirmNewPassword extends React.Component {
  state = {
    userEmail: undefined,
    verificationCode: undefined,
    enteredCode: undefined,
    codesIsEquals: false,
    codeFormatIsValid: false,
    loading: false
  };
  
  dismissKeyboard = () => Keyboard.dismiss();
  
  componentDidMount() {
    let { params } = this.props.navigation.state;
    
    this.setState(state => ({
      ...state,
      userEmail: params.email,
      verificationCode: params.verificationCode
    }));
  }
  
  verify = () => {
    if (+this.state.enteredCode !== this.state.verificationCode) {
      Alert.alert(
        "Не правильный код подтверждения.\nПожалуйста, проверьте и попробуйте еще раз",
        null
      );
      
      this.setState(state => ({
        ...state,
        enteredCode: undefined,
        codeFormatIsValid: false
      }));
    } else {
      
      this.setState(state => ({
        ...state,
        loading: true
      }));
      
      let { params } = this.props.navigation.state;
      
      fetch(CONFIRM_RESET_PASSWORD, {
        method: "post",
        mode: 'no-cors',
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: params.email,
          newPassword: params.newPassword
        })
      }).then(response => {
  
        if (response.status > 205 && response.status < 500) {
          response.json().then(() => {
            this.setState(state => ({
              ...state,
              loading: false
            }));
            Alert.alert(
              "Что то пошло не так",
              "Пароль не может быть изменен.",
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
  
        this.setState(state => ({
          ...state,
          ...stateReseter
        }));
        
        Alert.alert("Успех", "Вы успешно изменили пароль!", [
          {
            text: "OK",
            onPress: () => this.props.navigation.push("SplashScreen")
          }
        ]);
      });
    }
  };
  
  validateDigits = value => {
    if (value.length < 6) {
      this.setState(state => ({
        ...state,
        enteredCode: value,
        codeFormatIsValid: false
      }));
      
      return;
    }
    
    this.setState(state => ({
      ...state,
      enteredCode: value,
      codeFormatIsValid: true
    }));
  };
  
  render() {
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
            <Text style={styles.headerText}>
              Введите 6 цифр с письма:
            </Text>
            <TextInput
              placeholder="Введите 6 цифр с письма"
              style={styles.field}
              onChangeText={text => this.validateDigits(text)}
              value={this.state.enteredCode}
              maxLength={6}
              label="confirm-password"
              keyboardType="number-pad"
              autoCorrect={false}
              autoFocus={false}
            />
            <TouchableOpacity
              style={
                this.state.codeFormatIsValid
                  ? styles.verifyEnable
                  : styles.verifyDisable
              }
              onPress={() => this.verify()}
              disabled={!this.state.codeFormatIsValid}
            >
              <Text style={styles.nextColor}>Верифицировать</Text>
            </TouchableOpacity>
            <Text style={styles.subtitle}>
              2/2 Введите код подтверждения.
            </Text>
            <Text style={styles.subtitle}/>
            <View style={styles.signInBlock}>
              <Text style={styles.question}>или</Text>
              <TouchableOpacity
                onPress={() => this.props.navigation.push("SplashScreen")}
              >
                <Text style={styles.signInLink}>{` войти `}</Text>
              </TouchableOpacity>
              <Text style={styles.question}>со старыми данным</Text>
            </View>
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
  verifyEnable: {
    width: 300,
    height: 40,
    backgroundColor: "#42a4ff",
    borderRadius: 4,
    alignItems: "center",
    paddingTop: 12
  },
  verifyDisable: {
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
  signInLink: {
    fontSize: 12,
    color: "#42a4ff"
  },
  signInBlock: {
    flexDirection: "row",
    justifyContent: "center"
  },
  question: {
    fontSize: 12,
    color: "#bdbcc1"
  }
});

export default ConfirmNewPassword;
