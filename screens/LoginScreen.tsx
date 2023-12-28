import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

import { useNavigation } from "@react-navigation/native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { ArrowLeftIcon } from "react-native-heroicons/solid";
import { themeColors } from "../theme";


const LoginScreen= ({navigation}: any) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [emailError, setEmailError] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<boolean>(false);

  const validate = () => {
    if (!email) {
      setEmailError(true);
      return false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError(true);
      return false;
    } else {
      setEmailError(false);
    }

    if (!password) {
      setPasswordError(true);
      return false;
    } else if (password.length < 6) {
      setPasswordError(true);
      return false;
    } else {
      setPasswordError(false);
    }

    handleSubmit();
  };

  const handleSubmit = () => {
    if (!emailError && !passwordError) {
      console.log("login successful");
      navigation.navigate("Home");
    } else {
      console.log("There is some problem");
    }
  };

  return (
    <View
      style={{ flex: 1, backgroundColor: themeColors.bg }}
    >
             <View style={{ flexDirection: "row", justifyContent: "flex-start" }}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{
              backgroundColor: "yellow",
              padding: 12,
              borderRadius: 20,
              marginLeft: 8,
              marginTop: 4,
            }}
          >

          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <Image
            source={require("../assets/images/login_banner.png")}
            style={{ width: 370, height: 280 }}
          />
        </View>

      <View
        style={{
          borderTopLeftRadius: 50,
          borderTopRightRadius: 50,
          flex: 1,
          backgroundColor: "white",
          paddingHorizontal: 8,
          paddingTop: 8,
        }}
      >
        <KeyboardAvoidingView
          behavior="position"
          keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
        >
          <View style={{ marginVertical: 2 }}>
            <Text style={{ color: "gray", marginLeft: 4 }}>Email</Text>
            <TextInput
              style={{
                padding: 16,
                backgroundColor: "gray",
                borderRadius: 20,
                marginTop: 2,
              }}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
            />
            {emailError ? (
              <Text style={{ color: "red", fontSize: 14 }}>
                Please Enter Valid Value
              </Text>
            ) : null}
            <Text style={{ color: "gray", marginLeft: 4 }}>Password</Text>
            <TextInput
              style={{
                padding: 16,
                backgroundColor: "gray",
                borderRadius: 20,
                marginTop: 2,
              }}
              secureTextEntry
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
            />
            {passwordError ? (
              <Text style={{ color: "red", fontSize: 14 }}>
                Please Enter Valid Value
              </Text>
            ) : null}
            <TouchableOpacity
              style={{ flex: 1, alignItems: "flex-end", marginBottom: 5 }}
              onPress={() => {
                navigation.navigate("Forgot_pwd");
              }}
            >
              <Text style={{ color: "gray" }}>Forgot Password?</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{ padding: 24, backgroundColor: "yellow", borderRadius: 20 }}
              onPress={validate}
            >
              <Text style={{ fontSize: 20, fontWeight: "bold", color: "gray" }}>
                Login
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
        <Text style={{ fontSize: 18, fontWeight: "bold", color: "gray", textAlign: "center", paddingVertical: 3 }}>
          Or
        </Text>
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <Text style={{ color: "gray", fontWeight: "bold" }}>
            Don't have an account?
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
            <Text style={{ fontWeight: "bold", color: "yellow" }}> Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default LoginScreen;
