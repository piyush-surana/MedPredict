import { View, Text } from "react-native";
import React, { useState } from "react";
import { themeColors } from "../theme";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

export default function HomeScreen() {
  const navigation = useNavigation();
  return (
    <SafeAreaView
      className="flex-1"
      style={{ backgroundColor: themeColors.bg }}
    >
      <View>
        <Text>Home Screen</Text>
      </View>
    </SafeAreaView>
  );
}
