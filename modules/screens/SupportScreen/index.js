import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Alert
} from "react-native";

import ActivityIndicator from "../../components/ActivityIndicatorWrapper";

import { SEND_SUPPORT_MESSAGE } from "../../constants/apis";

const stateReseter = {
  title: {
    isValid: false,
    value: undefined,
  },
  description: {
    isValid: false,
    value: undefined,
  },
  loading: false
};

class SupportScreen extends React.Component {
  
  state = {
    title: {
      isValid: false,
      value: undefined,
    },
    description: {
      isValid: false,
      value: undefined,
    },
    loading: false
  };
  
  dismissKeyboard = () => Keyboard.dismiss();
  
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
  
  sendSupportMessage = () => {
    this.setState(state => ({ ...state, loading: true }));
  
    let { title, description } = this.state;
    let { userId, levelId } = this.props.navigation.state.params;
  
    let body = {
      userId: userId,
      levelId: levelId,
      title: title.value,
      description: description.value
    };
  
    fetch(SEND_SUPPORT_MESSAGE, {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    })
    .then(response => {
      
      if (response.status > 205 && response.status < 500) {
        response.json().then(() => {
          this.setState(state => ({
            ...state,
            loading: false
          }));
          Alert.alert(
            "Что то пошло не так",
            "Пожалуйста, попробуйте еще раз.");
        });
        
        return;
      }
  
      this.setState(state => ({
        ...stateReseter
      }));
  
      Alert.alert(
        "Успешно!",
        "Ожидайте ответа support команды!",
        [
          {
            text: "OK",
            onPress: () => this.props.navigation.pop()
          }
        ]
      );
    })
  };
  
  render() {
    if (this.state.loading) {
      return (
        <ActivityIndicator/>
      );
    }
    
    let isValid = this.state.title.isValid && this.state.description.isValid;
  
    return(
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
          <ScrollView>
            <View style={styles.info}>
              <Text style={styles.infoTitle}>
                Обратится за помощью
              </Text>
              <Text style={styles.infoSubtitle}>
                В данном разделе Вы можете обратится к support команде, если текущий уровень уже не актуален или у Вас возникли какие либо трудности с его прохождением.
                Ждите сообщения от наших специалистов на свой электронный адрес после отправки формы.
              </Text>
            </View>
            <View style={styles.formWrapper}>
              <Text style={styles.titleLabel}>
                С чем связана Ваша проблема?
              </Text>
              <TextInput
                placeholder="*уровень, оплата, ошибка и тд.*"
                style={styles.titleField}
                onChangeText={text => this.validate(text, "title")}
                value={this.state.title.value}
                maxLength={50}
                label="title"
              />
              <Text style={styles.descriptionLabel}>
                Описание:
              </Text>
              <TextInput
                placeholder="Опишите проблему как можно детальнее"
                style={styles.field}
                onChangeText={text => this.validate(text, "description")}
                value={this.state.description.value}
                maxLength={1000}
                label="description"
                multiline={true}
                numberOfLines={2}
                resize={false}
              />
              <TouchableOpacity
                style={isValid ? styles.confirmButtonEnable : styles.confirmButtonDisable}
                onPress={() => this.sendSupportMessage()}
                disabled={!isValid}
              >
                <Text style={styles.confirmButtonText}>
                  Отправить
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f8fd",
    justifyContent: "flex-start",
    alignContent: "center",
    alignItems: "center",
    textAlign: "center"
  },
  info: {
    padding: 20,
  },
  infoTitle: {
    marginBottom: 10,
    fontSize: 22,
    color: "#9d9ca1",
  },
  infoSubtitle: {
    fontSize: 12,
    color: "#bdbcc1"
  },
  formWrapper: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    paddingLeft: 20,
    paddingRight: 20,
  },
  titleLabel: {
    width: 300,
    fontSize: 12,
    marginBottom: 5,
    color: "#9d9ca1"
  },
  descriptionLabel: {
    width: 300,
    fontSize: 12,
    marginBottom: 5,
    color: "#9d9ca1"
  },
  field: {
    backgroundColor: "#f4f3f8",
    fontFamily: "RobotoLight",
    borderRadius: 4,
    marginBottom: 10,
    width: 300,
    borderColor: "#e8e7ec",
    borderWidth: 1,
    padding: 10,
    height: 70,
    fontSize: 12,
    color: "#9d9ca1"
  },
  titleField: {
    backgroundColor: "#f4f3f8",
    fontFamily: "RobotoLight",
    borderRadius: 4,
    marginBottom: 10,
    width: 300,
    borderColor: "#e8e7ec",
    borderWidth: 1,
    padding: 10,
    height: 40,
    fontSize: 12,
    color: "#9d9ca1"
  },
  confirmButtonEnable: {
    width: 300,
    height: 40,
    backgroundColor: "#42a4ff",
    borderRadius: 4,
    alignItems: "center",
    paddingTop: 12
  },
  confirmButtonDisable: {
    width: 300,
    height: 40,
    backgroundColor: "#8dc5ff",
    borderRadius: 4,
    alignItems: "center",
    paddingTop: 12
  },
  confirmButtonText: {
    color: "#fff"
  }
});

export default SupportScreen;