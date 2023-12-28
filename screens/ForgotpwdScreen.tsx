import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
//import { ArrowLeftIcon } from "react-native-heroicons/solid";
import { themeColors } from "../theme";
import { useNavigation } from "@react-navigation/native";


const ForgotpwdScreen= ({navigation}: any) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [Cpassword, setCPassword] = useState<string>("");
  const [emailError, setEmailError] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const [CpasswordError, setCPasswordError] = useState<boolean>(false);

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

    if (!Cpassword) {
      setCPasswordError(true);
      return false;
    } else if (Cpassword !== password) {
      setCPasswordError(true);
      return false;
    } else {
      setCPasswordError(false);
    }

    handlesubmit();
    return true;
  };

  const handlesubmit = () => {
    if (setEmailError.toString()) {
      // not properly working some kind of issue is there (right now jugad)
      if (setPasswordError.toString()) {
        console.log("Updation Complete");
        navigation.navigate("Login");
      }
    } else {
      console.log("There is some problem");
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: themeColors.bg }}>
      <SafeAreaView style={{ flex: 1 }}>
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
            source={require("../assets/images/fpwd.png")}
            style={{ width: 370, height: 280 }}
          />
        </View>
      </SafeAreaView>
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
            <Text style={{ color: "gray", marginLeft: 4 }}>New Password</Text>
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

            <Text style={{ color: "gray", marginLeft: 4 }}>
              Confirm Password
            </Text>
            <TextInput
              style={{
                padding: 16,
                backgroundColor: "gray",
                borderRadius: 20,
                marginTop: 2,
              }}
              secureTextEntry
              placeholder="Password"
              value={Cpassword}
              onChangeText={setCPassword}
            />
            {CpasswordError ? (
              <Text style={{ color: "red", fontSize: 14 }}>
                Please Enter Valid Value
              </Text>
            ) : null}

            <View style={{ paddingTop: 6 }}>
              <TouchableOpacity
                style={{ padding: 24, backgroundColor: "yellow", borderRadius: 20 }}
                onPress={validate}
              >
                <Text
                  style={{ fontSize: 20, fontWeight: "bold", color: "gray" }}
                >
                  Reset Password
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </View>
    </View>
  );
};

export default ForgotpwdScreen;
