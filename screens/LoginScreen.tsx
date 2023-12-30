import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';
// import { SafeAreaView } from "react-native-safe-area-context";
// import { ArrowLeftIcon } from "react-native-heroicons/solid";
import {themeColors} from '../theme';

const LoginScreen = ({navigation}: any) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [emailError, setEmailError] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const [passwordVisibility, setPasswordVisibility] = useState(false);


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
      console.log('login successful');
      navigation.navigate('Home');
    } else {
      console.log('There is some problem');
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: themeColors.bg}}>
      <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            backgroundColor: 'yellow',
            padding: 12,
            borderRadius: 20,
            marginLeft: 8,
            marginTop: 4,
          }}></TouchableOpacity>
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'center'}}>
        <Image
          source={require('../assets/images/login_banner.png')}
          style={{width: 370, height: 280, margin: 30}}
        />
      </View>

      <View
        style={{
          borderTopLeftRadius: 50,
          borderTopRightRadius: 50,
          flex: 1,
          backgroundColor: 'white',
          paddingHorizontal: 20,
          paddingTop: 20,
        }}>
        <KeyboardAvoidingView
          behavior="position"
          keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}>
          <View style={{marginVertical: 2}}>
            <Text style={{color: 'gray', marginLeft: 20}}>Email</Text>
            <TextInput
              style={{
                padding: 16,
                backgroundColor: '#f3f4f6',
                borderRadius: 20,
                margin: 10,
              }}
              placeholder="Email"
              placeholderTextColor={'gray'}
              value={email}
              onChangeText={setEmail}
            />
            {emailError ? (
              <Text style={{color: 'red', fontSize: 14}}>
                Please Enter Valid Value
              </Text>
            ) : null}

            <Text style={{color: 'gray', marginLeft: 20}}>Password</Text>
            <View style={styles.container}>
            <TextInput
              style={styles.input}
              secureTextEntry
              placeholderTextColor={'gray'}
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity
              style={styles.iconContainer}
              onPress={() => setPasswordVisibility(!passwordVisibility)}>
              <Icon
                name='eye'
                size={20}
                color="black"></Icon>
            </TouchableOpacity>
            </View>
            {passwordError ? (
              <Text style={{color: 'red', fontSize: 14}}>
                Please Enter Valid Value
              </Text>
            ) : null}

            <View style={{paddingTop: 16}}>
              <TouchableOpacity
                style={{flex: 1, alignItems: 'flex-end', marginBottom: 5}}
                onPress={() => {
                  navigation.navigate('Forgot_pwd');
                }}>
                <Text style={{color: 'gray'}}>Forgot Password?</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={{padding: 14, backgroundColor: 'yellow', borderRadius: 20}}
              onPress={validate}>
              <Text
                style={{
                  fontSize: 22,
                  fontWeight: 'bold',
                  color: 'black',
                  textAlign: 'center',
                }}>
                Login
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
        <Text
          style={{
            fontSize: 18,
            fontWeight: 'bold',
            color: 'gray',
            textAlign: 'center',
            paddingVertical: 3,
          }}>
          Or
        </Text>
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <Text style={{color: 'gray', fontWeight: 'bold'}}>
            Don't have an account?
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text style={{fontWeight: 'bold', color: 'yellow'}}> Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    color: 'black',
    padding: 16,
    backgroundColor: '#f3f4f6',
    borderRadius: 20,
    margin: 10,
  },
  iconContainer: {
    padding: 10,
  },
});

export default LoginScreen;
