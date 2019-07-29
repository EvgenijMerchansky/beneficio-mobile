import React from "react";
import { createStackNavigator } from "react-navigation";

import SplashScreen from "./screens/SplashScreen";
import SignUp from "./screens/SignUp";
import Dashboard from "./screens/Dashboard";
import ForgotPassword from "./screens/ForgotPassword";
import VerifyEmail from "./screens/VerifyEmail";
import NameScreen from "./screens/NameScreen";
import PhoneScreen from "./screens/PhoneScreen";
import PasswordScreen from "./screens/PasswordScreen";
import ConfirmNewPassword from "./screens/ConfirmNewPassword";
import Profile from "./screens/Profile";
import Level from "./screens/Level";
import Guide from "./screens/Guide/index";
import PrivacyPolicy from "./screens/PrivacyPolicy/index";
import Social from "./screens/Social/index";
import Payment from "./screens/Payment/index";
import PaymentRules from "./screens/PaymentRules/index";

const Navigator = createStackNavigator({
  SplashScreen: {
    screen: SplashScreen,
    navigationOptions: {
      title: "",
      header: null,
      gesturesEnabled: false,
    }
  },
  SignUp: {
    screen: SignUp,
    navigationOptions: {
      title: "",
      headerStyle: {
        backgroundColor: "#f9f8fd",
        borderBottomWidth: 0
      },
      headerTitleStyle: {
        fontWeight: "bold"
      },
      headerTintColor: "#000"
    }
  },
  Dashboard: {
    screen: Dashboard,
    navigationOptions: {
      title: "",
      header: null,
      gesturesEnabled: false
    }
  },
  ForgotPassword: {
    screen: ForgotPassword,
    navigationOptions: {
      title: "",
      headerStyle: {
        backgroundColor: "#f9f8fd",
        borderBottomWidth: 0
      },
      headerTitleStyle: {
        fontWeight: "bold"
      },
      headerTintColor: "#000"
    }
  },
  ConfirmNewPassword: {
    screen: ConfirmNewPassword,
    navigationOptions: {
      title: "",
      headerLeft: null,
      headerStyle: {
        backgroundColor: "#f9f8fd",
        borderBottomWidth: 0
      },
      gesturesEnabled: false,
      headerTitleStyle: {
        fontWeight: "bold"
      },
      headerTintColor: "#000"
    }
  },
  VerifyEmail: {
    screen: VerifyEmail,
    navigationOptions: {
      title: "",
      headerStyle: {
        backgroundColor: "#f9f8fd",
        borderBottomWidth: 0
      },
      headerTitleStyle: {
        fontWeight: "bold"
      },
      headerTintColor: "#000"
    }
  },
  NameScreen: {
    screen: NameScreen,
    navigationOptions: {
      title: "",
      headerLeft: null,
      headerStyle: {
        backgroundColor: "#f9f8fd",
        borderBottomWidth: 0
      },
      gesturesEnabled: false,
      headerTitleStyle: {
        fontWeight: "bold"
      },
      headerTintColor: "#000"
    }
  },
  PhoneScreen: {
    screen: PhoneScreen,
    navigationOptions: {
      title: "",
      headerStyle: {
        backgroundColor: "#f9f8fd",
        borderBottomWidth: 0
      },
      gesturesEnabled: false,
      headerTitleStyle: {
        fontWeight: "bold"
      },
      headerTintColor: "#000"
    }
  },
  PasswordScreen: {
    screen: PasswordScreen,
    navigationOptions: {
      title: "",
      headerStyle: {
        backgroundColor: "#f9f8fd",
        borderBottomWidth: 0
      },
      gesturesEnabled: false,
      headerTitleStyle: {
        fontWeight: "bold"
      },
      headerTintColor: "#000"
    }
  },
  ProfileScreen: {
    screen: Profile,
    navigationOptions: {
      title: "",
      headerStyle: {
        backgroundColor: "#42a4ff",
        borderBottomWidth: 0
      },
      headerTitle: "Profile",
      headerTitleStyle: {
        fontWeight: "light",
        color: "#fff"
      },
      headerTintColor: "#fff"
    }
  },
  LevelScreen: {
    screen: Level,
    navigationOptions: {
      title: "Info",
      headerStyle: {
        backgroundColor: "#42a4ff",
        borderBottomWidth: 0
      },
      headerTitle: "Detail information",
      headerTitleStyle: {
        fontWeight: "light",
        color: "#fff"
      },
      headerTintColor: "#fff"
    }
  },
  Guide: {
    screen: Guide,
    navigationOptions: {
      title: "Guide",
      headerStyle: {
        backgroundColor: "#42a4ff",
        borderBottomWidth: 0
      },
      headerTitle: "Guide",
      headerTitleStyle: {
        fontWeight: "light",
        color: "#fff"
      },
      headerTintColor: "#fff"
    }
  },
  PrivacyPolicy: {
    screen: PrivacyPolicy,
    navigationOptions: {
      title: "Privacy policy",
      headerStyle: {
        backgroundColor: "#f9f8fd",
        borderBottomWidth: 0,
      },
      headerTitleStyle: {
        fontWeight: "light",
        color: "#000",
      },
      headerTintColor: "#000"
    }
  },
  Social: {
    screen: Social,
    navigationOptions: {
      title: "Community",
      headerStyle: {
        backgroundColor: "#42a4ff",
        borderBottomWidth: 0
      },
      headerTitleStyle: {
        fontWeight: "light",
        color: "#fff"
      },
      headerTintColor: "#fff"
    }
  },
  Payment: {
    screen: Payment,
    navigationOptions: {
      title: "Unlock next level",
      headerStyle: {
        backgroundColor: "#f9f8fd",
        borderBottomWidth: 0
      },
      headerTitleStyle: {
        fontWeight: "light",
        color: "#000"
      },
      headerTintColor: "#000"
    }
  },
  PaymentRules: {
    screen: PaymentRules,
    navigationOptions: {
      title: "Payment rules",
      headerStyle: {
        backgroundColor: "#42a4ff",
        borderBottomWidth: 0
      },
      headerTitleStyle: {
        fontWeight: "light",
        color: "#fff"
      },
      headerTintColor: "#fff"
    }
  }
});



export default Navigator;