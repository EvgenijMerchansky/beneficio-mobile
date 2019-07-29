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

class VerifyEmail extends React.Component {
  state = {
    userEmail: undefined,
    verificationCode: undefined,
    enteredCode: undefined,
    codesIsEquals: false,
    codeFormatIsValid: false
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
        "Invalid verification code.\nPlease recheck and try again",
        null
      );
      
      this.setState(state => ({
        ...state,
        enteredCode: undefined,
        codeFormatIsValid: false
      }));
    } else {
      Alert.alert(
        "Success",
        "You have successfully verified your email address.",
        [
          {
            text: "OK",
            onPress: () =>
              this.props.navigation.push("NameScreen", {
                email: this.state.userEmail
              })
          }
        ]
      );
      
      this.setState(state => ({
        ...state,
        verificationCode: undefined,
        enteredCode: undefined,
        codesIsEquals: false,
        codeFormatIsValid: false
      }));
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
    return (
      <TouchableWithoutFeedback onPress={this.dismissKeyboard}>
        <KeyboardAvoidingView
          behavior="padding"
          enabled
          style={styles.container}
          keyboardShouldPersistTaps={"handled"}
        >
          <View>
            <Text style={styles.headerText}>
              Enter 6 digits from email letter:
            </Text>
            <TextInput
              placeholder="Enter 6 digits from latter"
              style={styles.field}
              onChangeText={text => this.validateDigits(text)}
              value={this.state.enteredCode}
              maxLength={6}
              label="email-verification"
              keyboardType="number-pad"
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
              <Text style={styles.nextColor}>Verify</Text>
            </TouchableOpacity>
            <Text style={styles.subtitle}>
              2/5 Verify your email for confirm identity.
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
    fontSize: 18,
    textAlign: "center",
    paddingBottom: 10
  },
  subtitle: {
    textAlign: "center",
    paddingTop: 10,
    color: "#bdbcc1",
    fontSize: 12
  }
});

export default VerifyEmail;
