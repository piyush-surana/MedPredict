import {View, Text} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignupScreen';
import ForgotpwdScreen from '../screens/ForgotpwdScreen';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import UserProfile from '../screens/UserProfile';
import EditProfile from '../screens/EditProfile';
import ContactScreen from '../screens/ContactScreen';
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
