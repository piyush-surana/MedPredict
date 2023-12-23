import { View, Text, TouchableOpacity, Image, TextInput } from "react-native";
import React, { useEffect, useState } from "react";
import { themeColors } from "../theme";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowLeftIcon } from "react-native-heroicons/solid";
import { useNavigation } from "@react-navigation/native";

// subscribe for more videos like this :)
export default function SignUpScreen() {
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const navigation = useNavigation();

  const validate = () => {
    if (!name) {
      setNameError(true);
      return false;
    } else {
      setNameError(false);
    }

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
    collectData();
    handlesubmit();  
  };
    const collectData = async()=>{
      const data={name,email,password};
      const url="https://localhost:3000/signup";
      let result=await fetch(url,{
        method:"post",
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify(data)
      })
      result=result.json();
      console.warn(result);
    }

  const handlesubmit = () => {
    if (setEmailError.toString) {
      // not properly working some kind of issue is there (right now jugad)
      if (setPasswordError.toString) {
        console.log("login successful");
        navigation.navigate("Login");
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
      <SafeAreaView className="flex">
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
            source={require("../assets/images/signup.png")}
            style={{ width: 330, height: 230 }}
          />
        </View>
      </SafeAreaView>
      <View
        className="flex-1 bg-white px-8 pt-8"
        style={{ borderTopLeftRadius: 50, borderTopRightRadius: 50 }}
      >
        <View className="form space-y-2">
          <Text className="text-gray-700 ml-4">Full Name</Text>
          <TextInput
            className="p-4 bg-gray-100 text-gray-700 rounded-2xl"
            placeholder="Name"
            value={name}
            onChangeText={setName}
          />
          {nameError ? (
            <Text style={{ color: "red", fontSize: 14 }}>
              Please Enter Valid Value
            </Text>
          ) : null}
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
          <View className="pt-6">
            <TouchableOpacity
              className="py-3 bg-yellow-400 rounded-xl"
              onPress={validate}
            >
              <Text className="font-xl font-bold text-center text-gray-700 ">
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <Text className="text-x text-gray-700 font-bold text-center py-3">
          Or
        </Text>

        <View className="flex-row justify-center ">
          <Text className="text-gray-500 font-semibold">
            Already have an account?
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text className="font-semibold text-yellow-500"> Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
