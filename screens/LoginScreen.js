import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowLeftIcon } from "react-native-heroicons/solid";
import { themeColors } from "../theme";
import { useNavigation } from "@react-navigation/native";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const navigation = useNavigation();

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

    handlesubmit();
  };

  const handlesubmit = () => {
    if (setEmailError.toString) {     // not properly working some kind of issue is there (right now jugad)
      if (setPasswordError.toString) {
        console.log("login successful");
        navigation.navigate("Home");
      }
    } else {
      console.log("There is some problem");
    }
  };

  return (
    <View
      className="flex-1 bg-white"
      style={{ backgroundColor: themeColors.bg }}
    >
      <SafeAreaView className="flex ">
        <View className="flex-row justify-start">
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="bg-yellow-400 p-3 rounded-2xl rounded-bl-2xl ml-4 mt-2"
          >
            <ArrowLeftIcon size="20" color="black" />
          </TouchableOpacity>
        </View>
        <View className="flex-row justify-center">
          <Image
            source={require("../assets/images/login_banner.png")}
            style={{ width: 370, height: 280 }}
          />
        </View>
      </SafeAreaView>
      <View
        style={{ borderTopLeftRadius: 50, borderTopRightRadius: 50 }}
        className="flex-1 bg-white px-8 pt-8"
      >
        <KeyboardAvoidingView
          behavior="position"
          keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
        >
          <View className="form space-y-2">
            <Text className="text-gray-700 ml-4">Email</Text>
            <TextInput
              className="p-4 bg-gray-100 text-gray-700 rounded-2xl"
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
            />
            {emailError ? (
              <Text style={{ color: "red", fontSize: 14 }}>
                Please Enter Valid Value
              </Text>
            ) : null}
            <Text className="text-gray-700 ml-4">Password</Text>
            <TextInput
              className="p-4 bg-gray-100 text-gray-700 rounded-2xl"
              secureTextEntry
              placeholder="Password"
              value={password}
              onChangeText={setpassword}
            />
            {passwordError ? (
              <Text style={{ color: "red", fontSize: 14 }}>
                Please Enter Valid Value
              </Text>
            ) : null}
            <TouchableOpacity className="flex items-end" onPress={()=>{navigation.navigate("Forgot_pwd");}}>
              <Text className="text-gray-700 mb-5">Forgot Password?</Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="py-3 bg-yellow-400 rounded-xl"
              onPress={validate}
            >
              <Text className="text-xl font-bold text-center text-gray-700">
                Login
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
        <Text className="text-x text-gray-700 font-bold text-center py-3">
          Or
        </Text>
        <View className="flex-row justify-center ">
          <Text className="text-gray-500 font-semibold">
            Don't have an account?
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
            <Text className="font-semibold text-yellow-500"> Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
