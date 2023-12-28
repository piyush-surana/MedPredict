import React from "react";
import { View, Text } from "react-native";
import { themeColors } from "../theme";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";


const HomeScreen= ({navigation}: any) => {

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: themeColors.bg }}>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Drawer Items</Text>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
