import React from "react";
import {
  StyleSheet,
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
  
    let { userId, levelId } = this.props.navigation.state.params;
  
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
    
    fetch(`${GET_PAYMENTS_DATA}?userId=${userId}&levelId=${levelId}`, settings)
      .then(response => {
      
        if (response.status > 205 && response.status < 500) {
        
          this.setState(state => ({
            ...state,
            loading: false
          }));
          
          Alert.alert(
            "Level was not found",
            "Please, try again."[
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

const styles = StyleSheet.create({
  loadContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#f9f8fd"
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10
  }
});

export default Payment;