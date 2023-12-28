import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  ToastAndroid,
  Alert,
} from 'react-native';
import {themeColors} from '../theme';
import {Snackbar} from 'react-native-paper';

const SignUpScreen = ({navigation}: any) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [nameError, setNameError] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<boolean>(false);

  const [visible, setVisible] = React.useState(true);

  const onDismissSnackBar = () => setVisible(false);

  const showToast = () => {
    ToastAndroid.show('there is some issue', ToastAndroid.TOP);
  };

  const validate = () => {
    showToast();
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
  };

  const collectData = async () => {
    const data = {name, email, password};
    const url = 'http://192.168.203.164:3000/signup';
    let result = await fetch(url, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data),
    });
    const body=result.text.toString;
    if (result.status == 200) {
      //console.info(result.json);
      handlesubmit();
    } else {
      Alert.alert(body());
      console.log(result.status);
    }
    return result.text();
  };

  const handlesubmit = () => {
    if (!setEmailError.toString) {
      // not properly working some kind of issue is there (right now jugad)
      if (!setPasswordError.toString) {
        console.log('There is some problem');
      }
    } else {
      console.log('Register successful');
      navigation.navigate('Home');
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
            borderRadius: 6,
            marginLeft: 15,
            marginTop: 15,
          }}>
          <Text>back</Text>
        </TouchableOpacity>
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'center'}}>
        <Image
          source={require('../assets/images/signup.png')}
          style={{width: 330, height: 230, margin: 20}}
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
        <View style={{marginVertical: 2}}>
          <Text style={{color: 'gray', marginLeft: 20}}>Full Name</Text>
          <TextInput
            style={{
              padding: 16,
              backgroundColor: '#f3f4f6',
              borderRadius: 20,
              margin: 10,
            }}
            placeholder="Name"
            value={name}
            onChangeText={setName}
          />
          {nameError ? (
            <Text style={{color: 'red', fontSize: 14}}>
              Please Enter Valid Value
            </Text>
          ) : null}
          <Text style={{color: 'gray', marginLeft: 20}}>Email</Text>
          <TextInput
            style={{
              padding: 16,
              backgroundColor: '#f3f4f6',
              borderRadius: 20,
              margin: 10,
            }}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
          />
          {emailError ? (
            <Text style={{color: 'red', fontSize: 14}}>
              Please Enter Valid Value
            </Text>
          ) : null}
          <Text style={{color: 'gray', marginLeft: 20}}>Password</Text>
          <TextInput
            style={{
              padding: 16,
              backgroundColor: '#f3f4f6',
              borderRadius: 20,
              margin: 10,
            }}
            secureTextEntry
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
          />
          {passwordError ? (
            <Text style={{color: 'red', fontSize: 14}}>
              Please Enter Valid Value
            </Text>
          ) : null}
          <View style={{paddingTop: 6}}>
            <TouchableOpacity
              style={{padding: 24, backgroundColor: 'yellow', borderRadius: 20}}
              onPress={validate}>
              <Text style={{fontSize: 20, fontWeight: 'bold', color: 'gray'}}>
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>
        </View>
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
            Already have an account?
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={{fontWeight: 'bold', color: 'yellow'}}> Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default SignUpScreen;
