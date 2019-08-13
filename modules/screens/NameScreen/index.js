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
} from "react-native";

class NameScreen extends React.Component {
  state = {
    name: {
      value: undefined,
      isValid: false
    },
    surname: {
      value: undefined,
      isValid: false
    }
  };
  
  goNext = () => {
    let { email } = this.props.navigation.state.params;
    
    this.props.navigation.push("PhoneScreen", {
      email,
      firstName: this.state.name.value.replace(/\s/g, ""),
      lastName: this.state.surname.value.replace(/\s/g, "")
    });
  };
  
  validate = (value, label) => {
    if (value === null || value === "" || value.length > 50) {
      this.setState(state => ({
        ...state,
        [label]: {
          value,
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
  
  dismissKeyboard = () => Keyboard.dismiss();
  
  render() {
    let stateIsValid = this.state.name.isValid && this.state.surname.isValid;
    
    return (
      <TouchableWithoutFeedback onPress={this.dismissKeyboard}>
        <KeyboardAvoidingView
          behavior="padding"
          enabled
          style={styles.container}
          keyboardShouldPersistTaps="handled"
        >
          <View>
            <Text style={styles.headerText}>Введите имя и фамилию:</Text>
            <TextInput
              placeholder="Введите имя"
              style={styles.field}
              onChangeText={text => this.validate(text, "name")}
              value={this.state.name.value}
              maxLength={50}
              label="name"
            />
            <TextInput
              placeholder="Введите фамилию"
              style={styles.field}
              onChangeText={text => this.validate(text, "surname")}
              value={this.state.surname.value}
              maxLength={50}
              label="surname"
            />
            <TouchableOpacity
              style={stateIsValid ? styles.nextEnable : styles.nextDisable}
              onPress={() => this.goNext()}
              disabled={!stateIsValid}
            >
              <Text style={styles.nextColor}>Дальше</Text>
            </TouchableOpacity>
            <Text style={styles.subtitle}>
              3/5 Добавьте имя и фамилию.
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
  }
});

export default NameScreen;
