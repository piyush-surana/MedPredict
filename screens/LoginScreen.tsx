import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  StyleSheet,
} from 'react-native';
import Snackbar from 'react-native-snackbar';
import Icon from 'react-native-vector-icons/FontAwesome';
import {ScrollView} from 'react-native-gesture-handler';
import {makeApiRequest} from '../auth/helpers';
import COLORS from '../const/color';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({navigation}: any) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [emailError, setEmailError] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const [passwordVisibility, setPasswordVisibility] = useState(false);

  const validate = () => {
    AsyncStorage.removeItem('body');
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
    }
    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]+$/.test(password)) {
      setPasswordError(true);
      return false;
    } else {
      setPasswordError(false);
    }
    collectData();
  };
  const collectData = async () => {
    const data = {email, password};
    makeApiRequest({
      method: 'post',
      urlPath: 'login',
      body: data,
    })
      .then(response => {
        if (response.data['status'] == 200) {
          console.log(response.data.data);
          if (response.data.data.status == 200) {
            storeData(response.data['data']);
            setEmail('');
            setPassword('');
            handleSubmit(response);
            return;
          }
          console.log({resp: response.data.data.status});
          Snackbar.show({
            text: response.data.data.message,
            duration: Snackbar.LENGTH_SHORT,
            textColor: 'white',
            backgroundColor: 'red',
          });
        }
      })
      .catch(error => {
        console.log('Error in api', error);
        Snackbar.show({
          text: 'Internal error',
          duration: Snackbar.LENGTH_SHORT,
          textColor: 'white',
          backgroundColor: 'red',
        });
      });
  };

  const storeData = async (value: any) => {
    try {
      await AsyncStorage.setItem('body', JSON.stringify(value));
    } catch (e) {
      console.log(e);
    }
  };

  const handleSubmit = (response: any) => {
    if (!emailError && !passwordError) {
      if (response.data.data['user_type'] == 'Patient') {
        console.log('Patient_Entered');
        navigation.navigate('Home1');
        // setUser('');
      } else if (response.data.data['user_type'] == 'Doctor') {
        console.log('Doctor_Entered');
        navigation.navigate('Doctor_Home');
        // setUser('');
      }
    } else {
      // console.log('There is some problem');
      Snackbar.show({
        text: 'Unauthorised user',
        duration: Snackbar.LENGTH_SHORT,
        textColor: 'white',
        backgroundColor: 'red',
      });
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: COLORS.primary}}>
      <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            backgroundColor: 'yellow',
            padding: 12,
            borderRadius: 6,
            marginLeft: 15,
            marginTop: 15,
          }}>
          <Icon name="arrow-left" size={18} color={'black'}></Icon>
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          marginBottom: 15,
          marginTop: 15,
        }}>
        <Image
          source={require('../assets/images/login_banner.png')}
          style={{width: 370, height: 280}}
        />
      </View>
      <ScrollView>
        <View
          style={{
            borderRadius: 50,
            margin: 15,
            flex: 1,
            backgroundColor: 'white',
            paddingHorizontal: 20,
            paddingTop: 20,
          }}>
          <View style={{marginVertical: 2}}>
            <Text style={{color: 'black', marginLeft: 20,fontFamily: 'Outfit-Regular',}}>Email</Text>
            <TextInput
              style={{
                padding: 16,
                backgroundColor: '#f3f4f6',
                borderRadius: 20,
                fontFamily: 'Outfit-Regular',
                margin: 10,
                color: 'black',
              }}
              placeholder="Email"
              placeholderTextColor={'gray'}
              value={email}
              onChangeText={setEmail}
            />
            {emailError ? (
              <Text style={{color: 'red', fontSize: 14,fontFamily: 'Outfit-Regular',}}>
                Please Enter Valid Value
              </Text>
            ) : null}

            <Text style={{color: 'black', marginLeft: 20,fontFamily: 'Outfit-Regular',}}>Password</Text>
            <View style={styles.container}>
              <TextInput
                style={styles.input}
                secureTextEntry={!passwordVisibility}
                placeholderTextColor={'gray'}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
              />
              <TouchableOpacity
                style={styles.iconContainer}
                onPress={() => setPasswordVisibility(!passwordVisibility)}>
                <Icon
                  name={passwordVisibility ? 'eye-slash' : 'eye'}
                  size={20}
                  color="black"
                />
              </TouchableOpacity>
            </View>
            {passwordError ? (
              <Text
                style={{
                  color: 'red',
                  fontSize: 14,
                  marginLeft: 20,
                  fontFamily: 'Outfit-Regular',
                }}>
                Please Enter Valid Value
              </Text>
            ) : null}

            <View>
              <TouchableOpacity
                style={{flex: 1, alignItems: 'flex-end', marginBottom: 5}}
                onPress={() => {
                  navigation.navigate('Forgot_pwd');
                }}>
                <Text style={{color: 'gray', fontFamily: 'Outfit-SemiBold'}}>
                  Forgot Password?
                </Text>
              </TouchableOpacity>
            </View>
            <Text
              style={{
                fontSize: 10,
                textAlign: 'center',
                fontFamily: 'Outfit-Regular',
                color: 'gray',
                paddingBottom: 10,
              }}>
              *Password should be of minimum of 6 character and should have
              atleast 1 Captial letter,1 Small letter,1 digit
            </Text>
            <TouchableOpacity
              style={{
                padding: 10,
                backgroundColor: 'yellow',
                borderRadius: 20,
              }}
              onPress={validate}>
              <Text
                style={{
                  fontSize: 22,
                  fontFamily: 'Outfit-Bold',
                  color: 'black',
                  textAlign: 'center',
                }}>
                Login
              </Text>
            </TouchableOpacity>
          </View>
          <Text
            style={{
              fontSize: 18,
              fontFamily: 'Outfit-Bold',
              color: 'gray',
              textAlign: 'center',
              paddingVertical: 8,
            }}>
            Or
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              paddingBottom: 30,
            }}>
            <Text
              style={{
                color: 'gray',
                fontFamily: 'Outfit-Medium',
                fontSize: 14,
              }}>
              Don't have an account?
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
              <Text style={{fontFamily: 'Outfit-Bold', color: 'black'}}>
                {' '}
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
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
    fontFamily: 'Outfit-Regular',
    backgroundColor: '#f3f4f6',
    borderRadius: 20,
    margin: 10,
  },
  iconContainer: {
    padding: 10,
  },
});

export default LoginScreen;
