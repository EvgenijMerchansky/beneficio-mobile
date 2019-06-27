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
  Keyboard
} from 'react-native';

class SplashScreen extends React.Component{
  
  state = {
    lang: 'en',
  };
  
  componentDidMount() { }
  
  dismissKeyboard = () => Keyboard.dismiss();
  
  static navigationOptions = {
    headerMode: null,
    headerStyle: {
      backgroundColor: '#f9f8fd',
      borderBottomWidth: 0,
    },
  };
  
  render() {
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
            onChangeText={(text) => this.setState({text})}
            value={this.state.text}
          />
          <TextInput
            placeholder="Enter your password"
            style={styles.field}
            onChangeText={(text) => this.setState({text})}
            value={this.state.text}
          />
          <TouchableOpacity
            style={styles.signIn}
            onPress={() => this.props.navigation.push("SignUp")}
          >
            <Text style={styles.signInColor}>
              Sign in
            </Text>
          </TouchableOpacity>
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
    width: 200,
    height: 200
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
  signIn: {
    width: 300,
    height: 40,
    backgroundColor: '#42a4ff',
    borderRadius: 4,
    alignItems: 'center',
    paddingTop: 12,
  },
  signInColor: {
    color: '#fff'
  },
  signUpBlock: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  question: {
    color: '#bdbcc1'
  },
  signUpLink: {
    color: '#42a4ff'
  }
});

export default SplashScreen;