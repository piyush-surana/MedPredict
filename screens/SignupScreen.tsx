import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  StyleSheet,
  Button,
} from 'react-native';
import {themeColors} from '../theme';
import Icon from 'react-native-vector-icons/FontAwesome';
import {ScrollView} from 'react-native-gesture-handler';

const SignUpScreen = ({navigation}: any) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [nameError, setNameError] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const [passwordVisibility, setPasswordVisibility] = useState(false);

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
    }
    if (password.length < 6) {
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
    const data = {name, email, password};
    const url = 'http://192.168.203.164:3000/signup';
    let result = await fetch(url, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data),
    });
    const body = result.text.toString;
    if (result.status == 200) {
      handlesubmit();
    } else {
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
      navigation.navigate('Login');
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
          <Icon name="arrow-left" size={18} color={'black'}></Icon>
        </TouchableOpacity>
      </View>

      <View style={{flexDirection: 'row', justifyContent: 'center'}}>
        <Image
          source={require('../assets/images/signup.png')}
          style={{width: 330, height: 230, margin: 20}}
        />
      </View>
      <ScrollView>
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
            <Text style={{color: 'black', marginLeft: 20}}>Full Name</Text>
            <TextInput
              style={{
                padding: 16,
                backgroundColor: '#f3f4f6',
                borderRadius: 20,
                margin: 10,
                color: 'black',
              }}
              placeholder="Name"
              placeholderTextColor={'gray'}
              value={name}
              onChangeText={setName}
            />
            {nameError ? (
              <Text style={{color: 'red', fontSize: 14}}>
                Please Enter Valid Value
              </Text>
            ) : null}
            <Text style={{color: 'black', marginLeft: 20}}>Email</Text>
            <TextInput
              style={{
                padding: 16,
                backgroundColor: '#f3f4f6',
                borderRadius: 20,
                margin: 10,
                color: 'black',
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
            <Text style={{color: 'black', marginLeft: 20}}>Password</Text>
            <View style={styles.container}>
              <TextInput
                style={styles.input}
                secureTextEntry={!passwordVisibility}
                placeholder="Password"
                placeholderTextColor={'gray'}
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
              <Text style={{color: 'red', fontSize: 14}}>
                Please Enter Valid Value
              </Text>
            ) : null}
            <View style={{paddingTop: 16}}>
              <TouchableOpacity
                style={{
                  padding: 14,
                  backgroundColor: 'yellow',
                  borderRadius: 20,
                }}
                onPress={validate}>
                <Text
                  style={{
                    fontSize: 22,
                    fontWeight: 'bold',
                    color: 'black',
                    textAlign: 'center',
                  }}>
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
              paddingVertical: 10,
            }}>
            Or
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              paddingBottom: 55,
            }}>
            <Text style={{color: 'gray', fontWeight: 'bold'}}>
              Already have an account?
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={{fontWeight: 'bold', color: 'black'}}> Login</Text>
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
    backgroundColor: '#f3f4f6',
    borderRadius: 20,
    margin: 10,
  },
  iconContainer: {
    padding: 10,
  },
});

export default SignUpScreen;
