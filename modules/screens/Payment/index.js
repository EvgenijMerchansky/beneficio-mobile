import React from "react";
import {
  WebView,
  Alert,
} from "react-native";

import ActivityIndicator from "../../components/ActivityIndicatorWrapper";

import { GET_PAYMENTS_DATA } from '../../constants/apis';

import { checkoutWebView } from '../../helpers/checkout';

class Payment extends React.Component {
  
  state = {
    formData: {
      data: "",
      signature: ""
    },
    webViewContent: ""
  };
  
  componentDidMount() {
    this.getFormData();
  }
  
  getFormData = () => {
    this.setState(state => ({ ...state, loading: true }));
  
    let { userId, levelId, type } = this.props.navigation.state.params;
    
    const settings = {
      method: "post",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        serverUrl: "https://lodiumwebapi20190725104425.azurewebsites.net/api/levels/complete"
      })
    };
    
    fetch(`${GET_PAYMENTS_DATA}?userId=${userId}&levelId=${levelId}&type=${type}`, settings)
      .then(response => {
      
        if (response.status > 205 && response.status < 500) {
          
          this.setState(state => ({
            ...state,
            loading: false
          }));
          
          Alert.alert(
            "Уровень не найден",
            "Пожалуйста попробуйте снова."[
              {
                text: "OK",
                onPress: () => this.props.navigation.pop()
              }
            ]
          );
        } else {
          response.json().then(data => {
  
            let webView = this.createPaymentView(data.data, data.signature);
  
            this.setState(state => ({
              ...state,
              formData: {
                ...data
              },
              webViewContent: webView,
              loading: false
            }));
          });
        }
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
          flex: 1
        }}
        renderLoading={
          <ActivityIndicator/>
        }
      />
    )
  }
}

export default Payment;