import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  ActivityIndicator,
  Keyboard,
  AlertIOS
} from 'react-native';

import { SIGN_IN } from '../../constants/apis';

const messages = {
  email: 'Email field cannot be empty',
  password: 'Password field cannot be empty',
  badRequest: 'You have entered an incorrect email or password.\n' +
  'Try logging in again.\nIf you do not have an account in our system - register it'
};

class SplashScreen extends React.Component{
  
  state = {
    lang: 'en',
    userId: undefined,
    tokens: undefined,
    email: {
      value: undefined,
      isValid: false,
    },
    password: {
      value: undefined,
      isValid: false,
    },
    loading: false
  };
  
  componentWillMount() {
    this.globalFiledCleaner();
  }
  
  globalFiledCleaner = () => {
    this.setState(state => ({
      ...state,
      password: {
        value: undefined,
        isValid: false,
      },
    }));
  };
  
  dismissKeyboard = () => Keyboard.dismiss();
  
  static navigationOptions = {
    headerMode: null,
    headerStyle: {
      backgroundColor: '#f9f8fd',
      borderBottomWidth: 0,
    },
  };
  
  signInAsync = (credentials) => {
    this.setState(state => ({ ...state, loading: true }));
    
    fetch(SIGN_IN, {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
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
            AlertIOS.alert('Incorrect credentials', messages.badRequest);
          });
        } else {
          response.json().then(data => {
            this.setState(state => ({
              ...state,
              tokens: data,
              loading: false
            }))
          });
          this.props.navigation.push("Dashboard");
        }
      }
    )
    .catch(() => {
      this.setState(state => ({
        ...state,
        tokens: undefined,
        loading: false
      }))
    })
  };
  
  setFieldToDefault = (label) => {
    this.setState(state => ({
      ...state,
      [label]: {
        ...this.state[label],
      }
    }))
  };
  
  pushToDashboard = () => {
    if (this.state.email.isValid && this.state.password.isValid) {
      
      const credentials = {
        email: this.state.email.value.replace(/\s/g, ''),
        password: this.state.password.value
      };
      
      this.signInAsync(credentials);
      
      if (this.state.tokens !== undefined) {
        this.globalFiledCleaner()
      }
    }
  
    if (!this.state.email.isValid) {
      this.setState(state => ({
        ...state,
        email: { ...this.state.email }
      }))
    }
  
    if (!this.state.password.isValid) {
      this.setState(state => ({
        ...state,
        password: { ...this.state.password }
      }))
    }
  };
  
  validate = (value, label) => {
    if (value === null || value === "") {
      this.setState(state => ({
        ...state,
        [label]: {
          value: undefined,
          isValid: false,
        }
      }))
    } else {
      this.setState(state => ({
        ...state,
        [label]: {
          value,
          isValid: true,
        }
      }))
    }
  };
  
  render() {
    if (this.state.loading) {
      return (
        <View style={[styles.loadContainer, styles.horizontal]}>
          <ActivityIndicator size="small" color="#000" />
        </View>
      )
    }
    
    return (
      <TouchableWithoutFeedback
        onPress={this.dismissKeyboard}
      >
        <KeyboardAvoidingView
          behavior="padding"
          enabled
          style={styles.container}
          keyboardShouldPersistTaps={'handled'}
        >
          <View style={styles.logo}>
            <Image
              style={imageDimensions.stretch}
              source={require('../../../assets/Beneficio-second.png')}
            />
          </View>
          <View>
            <TextInput
              placeholder="Enter your email address"
              style={styles.field}
              onChangeText={(text) => this.validate(text, 'email')}
              value={this.state.email.value}
              maxLength={50}
              label="email"
              onFocus={() => this.setFieldToDefault("email")}
              onSelectionChange={() => this.setFieldToDefault("email")}
            />
            <TextInput
              placeholder="Enter your password"
              style={styles.field}
              onChangeText={(text) => this.validate(text, 'password')}
              value={this.state.password.value}
              maxLength={50}
              label="password"
              onFocus={() => this.setFieldToDefault("password")}
              onSelectionChange={() => this.setFieldToDefault("password")}
              secureTextEntry={true}
            />
            <TouchableOpacity onPress={() => this.props.navigation.push("ForgotPassword")}>
              <Text style={styles.forgotPasswordButton}>
                Forgot password?
              </Text>
            </TouchableOpacity>
            {
              this.state.email.isValid && this.state.password.isValid ?
                <TouchableOpacity
                  style={styles.signInEnable}
                  onPress={() => this.pushToDashboard()}
                  disabled={false}
                >
                  <Text style={styles.signInColor}>
                    Sign in
                  </Text>
                </TouchableOpacity> :
                <TouchableOpacity
                  style={styles.signInDisable}
                  onPress={() => this.pushToDashboard()}
                  disabled={true}
                >
                  <Text style={styles.signInColor}>
                    Sign in
                  </Text>
                </TouchableOpacity>
            }
          </View>
          <View style={styles.signUpBlock}>
            <Text style={styles.question}>
              Don't have an account?
            </Text>
            <TouchableOpacity onPress={() => this.props.navigation.push("SignUp")}>
              <Text style={styles.signUpLink}>
                {` Sign up`}
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    )
  }
}

const imageDimensions = StyleSheet.create({
  stretch: {
    width: 300,
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f8fd',
    justifyContent: 'space-around',
    alignContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  loadContainer: {
    flex: 1,
    justifyContent: 'center'
  },
  logo: {
    backgroundColor: 'transparent',
    textAlign: 'center'
  },
  field: {
    backgroundColor: '#f4f3f8',
    borderRadius: 4,
    height: 40,
    marginBottom: 10,
    width: 300,
    borderColor: '#e8e7ec',
    borderWidth: 1,
    padding: 10,
  },
  signInEnable: {
    width: 300,
    height: 40,
    backgroundColor: '#42a4ff',
    borderRadius: 4,
    alignItems: 'center',
    paddingTop: 12
  },
  signInDisable: {
    width: 300,
    height: 40,
    backgroundColor: '#8dc5ff',
    borderRadius: 4,
    alignItems: 'center',
    paddingTop: 12
  },
  signInColor: {
    color: '#fff'
  },
  signUpBlock: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  question: {
    fontSize: 12,
    color: '#bdbcc1'
  },
  signUpLink: {
    fontSize: 12,
    color: '#42a4ff'
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10
  },
  forgotPasswordButton: {
    color: '#42a4ff',
    paddingBottom: 10,
    textAlign: 'right',
    fontSize: 12
  }
});

export default SplashScreen;