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
      headerTintColor: "#000",
      headerBackTitle: "Назад"
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
      headerTintColor: "#000",
      headerBackTitle: "Назад"
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
      headerTintColor: "#000",
      headerBackTitle: "Назад"
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
      headerTintColor: "#000",
      headerBackTitle: "Назад"
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
      headerTintColor: "#000",
      headerBackTitle: "Назад"
    }
  },
  ProfileScreen: {
    screen: Profile,
    navigationOptions: {
      title: "Профиль",
      headerStyle: {
        backgroundColor: "#42a4ff",
        borderBottomWidth: 0
      },
      headerTitle: "Профиль",
      headerTitleStyle: {
        fontWeight: "light",
        color: "#fff"
      },
      headerTintColor: "#fff",
      headerBackTitle: "Назад"
    }
  },
  LevelScreen: {
    screen: Level,
    navigationOptions: {
      title: "Детали реализации",
      headerStyle: {
        backgroundColor: "#42a4ff",
        borderBottomWidth: 0
      },
      headerTitle: "Детали реализации:",
      headerTitleStyle: {
        fontWeight: "light",
        color: "#fff"
      },
      headerTintColor: "#fff",
      headerBackTitle: "Назад"
    }
  },
  Guide: {
    screen: Guide,
    navigationOptions: {
      title: "Гайд",
      headerStyle: {
        backgroundColor: "#42a4ff",
        borderBottomWidth: 0
      },
      headerTitle: "Гайд",
      headerTitleStyle: {
        fontWeight: "light",
        color: "#fff"
      },
      headerTintColor: "#fff",
      headerBackTitle: "Назад"
    }
  },
  PrivacyPolicy: {
    screen: PrivacyPolicy,
    navigationOptions: {
      title: "Конфиденциальность",
      headerStyle: {
        backgroundColor: "#f9f8fd",
        borderBottomWidth: 0,
      },
      headerTitleStyle: {
        fontWeight: "light",
        color: "#000",
      },
      headerTintColor: "#000",
      headerBackTitle: "Назад"
    }
  },
  Social: {
    screen: Social,
    navigationOptions: {
      title: "Сообщество",
      headerStyle: {
        backgroundColor: "#42a4ff",
        borderBottomWidth: 0
      },
      headerTitleStyle: {
        fontWeight: "light",
        color: "#fff"
      },
      headerTintColor: "#fff",
      headerBackTitle: "Назад"
    }
  },
  Payment: {
    screen: Payment,
    navigationOptions: {
      title: "Открыть следующий",
      headerStyle: {
        backgroundColor: "#f9f8fd",
        borderBottomWidth: 0
      },
      headerTitleStyle: {
        fontWeight: "light",
        color: "#000"
      },
      headerTintColor: "#000",
      headerBackTitle: "Назад"
    }
  },
  PaymentRules: {
    screen: PaymentRules,
    navigationOptions: {
      title: "Комиссии",
      headerStyle: {
        backgroundColor: "#42a4ff",
        borderBottomWidth: 0
      },
      headerTitleStyle: {
        fontWeight: "light",
        color: "#fff"
      },
      headerTintColor: "#fff",
      headerBackTitle: "Назад"
    }
  }
});



export default Navigator;