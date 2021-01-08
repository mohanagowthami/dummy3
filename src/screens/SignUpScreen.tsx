import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
Dimensions,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import SignUpForm from "../forms/SignUpForm";
import { colors } from "../lib/colors";

interface ISignUpScreen {
  navigation: any;
}

interface State {
  windowDimensions: any;
}
const window = Dimensions.get("window");

class SignUpScreen extends Component<ISignUpScreen, State> {
  constructor(props: ISignUpScreen) {
    super(props);
    this.state = {
      windowDimensions: window,
    };
  }
  onChange = ({ window }: any) => {
    this.setState({ windowDimensions: window });
  };

  componentDidMount() {
    Dimensions.addEventListener("change", this.onChange);
  }

  componentWillUnmount() {
    Dimensions.removeEventListener("change", this.onChange);
  }

  callBack = (value: string) => {
    console.log(value, "on call back value");
  };

  onPressOTPButton = () => {};
  render() {
    const { navigation } = this.props;
    const { windowDimensions } = this.state;
    return (
      <ScrollView>
        <View style={[{ width: windowDimensions.width }, styles.container]}>
          <Image
            style={{
              width: windowDimensions.width * 0.8,
              height: windowDimensions.height * 0.3,
            }}
            source={require("../../assets/welcome.png")}
            resizeMode={"contain"}
          />
          <Text style={styles.loginText}>SignUp</Text>
          <SignUpForm />

          <View
            style={[
              styles.loginBottom,
              {
                width: windowDimensions.width,
                height: windowDimensions.height * 0.25,
              },
            ]}
          >
            <Text style={styles.loginWith}>Or Login with...</Text>
            <Text>
              <Text style={styles.haveAnAccount}>Already have an account?</Text>
              <Text
                style={styles.signIn}
                onPress={() => this.props.navigation.navigate("login")}
              >
                Sign In
              </Text>
            </Text>
          </View>
        </View>
      </ScrollView>
    );
  }
}
export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    backgroundColor: "#fff",
    alignItems: "center",
    padding: "10%",
    paddingBottom: 0,
  },

  loginText: {
    color: colors.darkBlack,
    margin: "1%",

    fontSize: 36,
    fontFamily: "AirbnbCerealBold",
  },

  loginBottom: {
    display: "flex",

    backgroundColor: "#fff",
    marginBottom: "7%",

    alignItems: "center",
    justifyContent: "space-between",
  },
  loginButtonBox: {
    marginTop: "7%",
    marginBottom: "7%",
  },
  loginWith: {
    fontSize: 18,
    fontFamily: "AirbnbCerealBook",
    color: colors.lightBlack,
  },
  haveAnAccount: {
    fontSize: 14,
    fontFamily: "AirbnbCerealBook",
    color: colors.lightBlack,
  },
  signIn: {
    fontSize: 14,
    fontFamily: "AirbnbCerealBook",
    color: colors.orange,
  },
});
