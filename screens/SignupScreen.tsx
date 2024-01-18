import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  StyleSheet,
} from 'react-native';
import {makeApiRequest} from '../auth/helpers';
import {themeColors} from '../theme';
import {Dropdown} from 'react-native-element-dropdown';
import Icon from 'react-native-vector-icons/FontAwesome';
import {ScrollView} from 'react-native-gesture-handler';
import Snackbar from 'react-native-snackbar';

const data = [
  {label: 'Patient', value: 'Patient'},
  {label: 'Doctor', value: 'Doctor'},
];

const SignUpScreen = ({navigation}: any) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [nameError, setNameError] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [user_Type, setValue] = useState('Patient');
  const [isFocus, setIsFocus] = useState(false);

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
    const data = {name, email, password, user_Type};
    makeApiRequest({
      method: 'post',
      urlPath: 'signup',
      body: data,
    }).then(response => {
      if (response.data['status']== 200) {
        console.log(response.data.data);
        if(response.data.data.status == 200)
        {
          handlesubmit();
          return;
        }
          console.log({resp : response.data.data.status})
          Snackbar.show({
            text: response.data.data.message,
            duration: Snackbar.LENGTH_SHORT,
            textColor: 'white',
            backgroundColor: 'red',
          });
        
      }
    }
    ).catch(error => {
      console.log('Error in api', error);
      Snackbar.show({
        text: 'Internal error',
        duration: Snackbar.LENGTH_SHORT,
        textColor: 'white',  
        backgroundColor: 'red',
      });
    });

    // if ((await result).data['status'] == 200) {
    //   handlesubmit();
    // } else {
    //   Snackbar.show({
    //     text: 'Enter Valid Details',
    //     duration: Snackbar.LENGTH_SHORT,
    //     textColor: 'white',
    //     backgroundColor: 'red',
    //   });
    // }
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
      

      <View style={{flexDirection: 'row', justifyContent: 'center'}}>
        <Image
          source={require('../assets/images/signup.png')}
          style={{width: 220, height: 140, margin: 15}}
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
            paddingTop: 10,
          }}>
          <View style={{marginVertical: 2}}>
            <Text style={{color: 'black', marginLeft: 20}}>Name</Text>
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
            <Text style={{color: 'black', marginLeft: 20}}>User Type</Text>
            <Dropdown
              style={{
                padding: 16,
                backgroundColor: '#f3f4f6',
                borderRadius: 20,
                margin: 10,
              }}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              data={data}
              itemTextStyle={{color: 'gray'}}
              maxHeight={300}
              labelField="label"
              valueField="value"
              value={user_Type}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={item => {
                setValue(item.value);
                setIsFocus(false);
              }}
            />

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

            <Text style={{fontSize: 10, textAlign: 'center', color: 'gray'}}>
              *Password should be of minimum of 6 character and should have
              atleast 1 Captial letter,1 Small letter,1 digit
            </Text>
            <View style={{paddingTop: 12}}>
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
              paddingVertical: 5,
            }}>
            Or
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              paddingBottom: 15,
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
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    color: 'black',
  },
  placeholderStyle: {
    fontSize: 16,
    color: 'black',
  },
  selectedTextStyle: {
    fontSize: 16,
    color: 'black',
  },
});

export default SignUpScreen;
