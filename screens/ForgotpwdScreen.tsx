import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {ScrollView} from 'react-native-gesture-handler';
import Snackbar from 'react-native-snackbar';
import {makeApiRequest} from '../auth/helpers';
import COLORS from '../const/color';

const ForgotpwdScreen = ({navigation}: any) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [Cpassword, setCPassword] = useState<string>('');
  const [emailError, setEmailError] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const [CpasswordError, setCPasswordError] = useState<boolean>(false);
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
    }
    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]+$/.test(password)) {
      setPasswordError(true);
      return false;
    } else {
      setPasswordError(false);
    }

    if (!Cpassword) {
      setCPasswordError(true);
      return false;
    } else if (Cpassword !== password) {
      setCPasswordError(true);
      return false;
    } else {
      setCPasswordError(false);
    }
    collectData();
    return true;
  };

  const collectData = async () => {
    const data = {email, password};
    makeApiRequest({
      method: 'post',
      urlPath: 'forgot',
      body: data,
    })
      .then(response => {
        if (response.data['status'] == 200) {
          console.log(response.data.data);
          if (response.data.data.status == 200) {
            handlesubmit();
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

  const handlesubmit = () => {
    if (setEmailError.toString()) {
      // not properly working some kind of issue is there (right now jugad)
      if (setPasswordError.toString()) {
        console.log('Updation Complete');
        navigation.navigate('Login');
      }
    } else {
      console.log('There is some problem');
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: COLORS.primary}}>
      <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="chevron-left" size={18} color={COLORS.white} style={{padding:5}}></Icon>
        </TouchableOpacity>
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'center'}}>
        <Image
          source={require('../assets/images/fpwd.png')}
          style={{width: 370, height: 280}}
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
            <Text
              style={{
                color: 'black',
                marginLeft: 20,
                fontFamily: 'Outfit-Regular',
              }}>
              Email
            </Text>
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
              <Text
                style={{
                  color: 'red',
                  fontSize: 14,
                  fontFamily: 'Outfit-Regular',
                }}>
                Please Enter Valid Value
              </Text>
            ) : null}
            <Text
              style={{
                color: 'black',
                marginLeft: 20,
                fontFamily: 'Outfit-Regular',
              }}>
              New Password
            </Text>
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
                  fontFamily: 'Outfit-Regular',
                }}>
                Please Enter Valid Value
              </Text>
            ) : null}

            <Text
              style={{
                color: 'black',
                marginLeft: 20,
                fontFamily: 'Outfit-Regular',
              }}>
              Confirm Password
            </Text>

            <TextInput
              style={{
                padding: 16,
                backgroundColor: '#f3f4f6',
                borderRadius: 20,
                fontFamily: 'Outfit-Regular',
                margin: 10,
              }}
              secureTextEntry
              placeholder="Password"
              placeholderTextColor={COLORS.grey}
              value={Cpassword}
              onChangeText={setCPassword}
            />

            {CpasswordError ? (
              <Text
                style={{
                  color: 'red',
                  fontSize: 14,
                  fontFamily: 'Outfit-Regular',
                }}>
                Please Enter Valid Value
              </Text>
            ) : null}

            <View
              style={{paddingTop: 16, alignItems: 'center', paddingBottom: 90}}>
              <TouchableOpacity
                style={{
                  padding: 24,
                  backgroundColor: 'yellow',
                  borderRadius: 20,
                }}
                onPress={validate}>
                <Text
                  style={{
                    fontSize: 20,
                    color: 'black',
                    fontFamily: 'Outfit-Bold',
                  }}>
                  Reset Password
                </Text>
              </TouchableOpacity>
            </View>
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

export default ForgotpwdScreen;
