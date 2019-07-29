import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard
} from "react-native";

class PhoneScreen extends React.Component {
  state = {
    phone: {
      value: undefined,
      isValid: false
    }
  };
  
  dismissKeyboard = () => Keyboard.dismiss();
  
  goNext = () => {
    let { params } = this.props.navigation.state;
    
    this.props.navigation.push("PasswordScreen", {
      ...params,
      phone: this.state.phone.value
    });
  };
  
  isValidNumber = phone => {
    const phoneRegEx = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
    
    return phone.match(phoneRegEx);
  };
  
  validate = value => {
    if (value === "" || value === null || !this.isValidNumber(value)) {
      this.setState(state => ({
        ...state,
        phone: {
          value,
          isValid: false
        }
      }));
    } else {
      this.setState(state => ({
        ...state,
        phone: {
          value,
          isValid: true
        }
      }));
    }
  };
  
  render() {
    const { params } = this.props.navigation.state;
    return (
      <TouchableWithoutFeedback onPress={this.dismissKeyboard}>
        <KeyboardAvoidingView
          behavior="padding"
          enabled
          style={styles.container}
          keyboardShouldPersistTaps={"handled"}
        >
          <View>
            <Text style={styles.headerText}>Enter your phone:</Text>
            <TextInput
              placeholder="Enter your phone"
              style={styles.field}
              onChangeText={text => this.validate(text)}
              value={this.state.phone.value}
              maxLength={50}
              label="phone"
              keyboardType={"phone-pad"}
            />
            <TouchableOpacity
              style={
                this.state.phone.isValid
                  ? styles.nextEnable
                  : styles.nextDisable
              }
              onPress={() => this.goNext()}
              disabled={!this.state.phone.isValid}
            >
              <Text style={styles.nextColor}>Next</Text>
            </TouchableOpacity>
            <Text style={styles.subtitle}>
              {`4/5 Hello, ${params.firstName} ${params.lastName}!\nPlease, add your phone in this format:\n (CCCXXXXXXXXX) - CCC - country code`}
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

export default PhoneScreen;
