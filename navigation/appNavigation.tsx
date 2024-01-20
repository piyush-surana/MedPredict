import {View, Text} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../screens/Patient_screens/HomeScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignupScreen';
import ForgotpwdScreen from '../screens/ForgotpwdScreen';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import UserProfile from '../screens/Patient_screens/UserProfile';
import EditProfile from '../screens/Patient_screens/EditProfile';
import ContactScreen from '../screens/ContactScreen';
import WorkScreen from '../screens/work_in_progress';
import Doctor_UserProfile from '../screens/Doctor_screens/Doctor_User_Profile';
import Doctor_EditProfile from '../screens/Doctor_screens/Doctor_Edit_Profile';
import Doctor_HomeScreen from '../screens/Doctor_screens/Doctor_Home_Screen';
import Settings_Screen from '../screens/Settings_Screen';
import Support_Screen from '../screens/Support_Screen';
import Icon from 'react-native-vector-icons/FontAwesome';
import COLORS from '../const/color';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {height: 65, paddingBottom: 15, paddingTop: 10},
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({color, size}) => (
            <Icon name="home" size={20} color={COLORS.primary} />
          ),
        }}
      />
      <Tab.Screen
        name="User"
        component={UserProfile}
        options={{
          headerShown: false,
          tabBarIcon: ({color, size}) => (
            <Icon name="user" size={20} color={COLORS.primary} />
          ),
        }}
      />
      <Tab.Screen
        name="Contact"
        component={ContactScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({color, size}) => (
            <Icon name="info" size={20} color={COLORS.primary} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function DoctorTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {height: 65, paddingBottom: 15, paddingTop: 10},
      }}>
      <Tab.Screen
        name="Doc_Home"
        component={Doctor_HomeScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({color, size}) => (
            <Icon name="home" size={20} color={COLORS.primary} />
          ),
        }}
      />
      <Tab.Screen
        name="Doc_User"
        component={Doctor_UserProfile}
        options={{
          headerShown: false,
          tabBarIcon: ({color, size}) => (
            <Icon name="user" size={20} color={COLORS.primary} />
          ),
        }}
      />
      <Tab.Screen
        name="Contact"
        component={ContactScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({color, size}) => (
            <Icon name="info" size={20} color={COLORS.primary} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function StackNavigator() {
  return (
    <Stack.Navigator initialRouteName="Welcome">
      <Stack.Screen
        name="Home1"
        options={{headerShown: false}}
        component={TabNavigator}
      />
      <Stack.Screen
        name="Welcome"
        options={{headerShown: false}}
        component={WelcomeScreen}
      />
      <Stack.Screen
        name="Login"
        options={{headerShown: false}}
        component={LoginScreen}
      />
      <Stack.Screen
        name="SignUp"
        options={{headerShown: false}}
        component={SignUpScreen}
      />
      <Stack.Screen
        name="Forgot_pwd"
        options={{headerShown: false}}
        component={ForgotpwdScreen}
      />
      <Stack.Screen
        name="Edit_profile"
        options={{headerShown: false}}
        component={EditProfile}
      />
      <Stack.Screen
        name="Work_screen"
        options={{headerShown: false}}
        component={WorkScreen}
      />
      <Stack.Screen
        name="Doctor_Home"
        options={{headerShown: false}}
        component={DoctorTabNavigator}
      />
      <Stack.Screen
        name="Doc_Edit"
        options={{headerShown: false}}
        component={Doctor_EditProfile}
      />
      <Stack.Screen
        name="Settings"
        options={{headerShown: false}}
        component={Settings_Screen}
      />
      <Stack.Screen
        name="Support"
        options={{headerShown: false}}
        component={Support_Screen}
      />
    </Stack.Navigator>
  );
}

const AppNavigation: React.FC = () => {
  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
};

export default AppNavigation;
