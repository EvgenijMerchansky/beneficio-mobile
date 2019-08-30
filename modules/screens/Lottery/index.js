import React from "react";
import {
  WebView,
  Alert,
} from "react-native";

import ActivityIndicator from "../../components/ActivityIndicatorWrapper";

import { GET_LOTTERY_PAYMENT_DATA, COMPLETE_LOTTERY_SERVER_URL } from "../../constants/apis";

import { checkoutWebView } from '../../helpers/checkout';

class Payment extends React.Component {
  
  state = {
    formData: {
      data: "",
      signature: ""
    },
    webViewContent: "",
    loading: false
  };
  
  componentDidMount() {
    this.getFormData();
  }
  
  getFormData = () => {
    this.setState(state => ({ ...state, loading: true }));
  
    let { userId } = this.props.navigation.state.params;
  
    const settings = {
      method: "post",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: userId,
        serverUrl: COMPLETE_LOTTERY_SERVER_URL
      })
    };
  
    fetch(GET_LOTTERY_PAYMENT_DATA, settings)
      .then(response => {
        if (response.status > 205 && response.status < 500) {
  
          this.setState(state => ({
            ...state,
            loading: false
          }));
  
          Alert.alert(
            "Лотарейный билет не найден",
            "Пожалуйста попробуйте снова."[
              {
                text: "OK",
                onPress: () => this.props.navigation.pop()
              }
            ]
          );
          
          return false;
        }
        response.json().then(res => {
          let webView = this.createPaymentView(res.data, res.signature);
  
          this.setState(state => ({
            ...state,
            formData: {
              ...res
            },
            webViewContent: webView,
            loading: false
          }));
        })
      })
  };
  
  createPaymentView = (data, signature) => {
    
    return checkoutWebView(data, signature);
  };
  
  render() {
    
    if (this.state.loading) {
      return (
        <ActivityIndicator/>
      );
    }
    
    return(
      <WebView
        source={{html: `${this.state.webViewContent}`}}
        style={{
          backgroundColor: "#f9f8fd",
          flex: 1,
          padding: 20
        }}
        renderLoading={
          <ActivityIndicator/>
        }
      />
    )
  }
}

export default Payment;