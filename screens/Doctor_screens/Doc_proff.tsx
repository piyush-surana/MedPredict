import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Alert,
} from 'react-native';
import COLORS from '../../const/color';
import {makeApiRequest} from '../../auth/helpers';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Snackbar from 'react-native-snackbar';

const Settings_Screen: React.FC = ({navigation}: any) => {
  const [address, setcity] = useState('');
  const [phone_no, setPhone] = useState('');
  const [hospitalname, setHospital] = useState('');
  const [special, setSpecial] = useState('');
  const [CityError, setCityError] = useState<boolean>(false);
  const [hospitalError, sethosiptalError] = useState<boolean>(false);
  const [specialError, setspecialError] = useState<boolean>(false);
  const [PhoneError, setPhoneError] = useState<boolean>(false);
  const [flag, setFlag] = useState(false);

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('body');
      if (value !== null) {
        const data = JSON.parse(value);
        if (data.is_empty == 1) {
          setFlag(true);
        } else {
          setcity(data['address']);
          setPhone(data['phone_no']);
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  getData();

  const validate = () => {
    if (!address) {
      setCityError(true);
      return false;
    } else if (!/^[A-Za-z]+$/.test(address)) {
      setCityError(true);
      return false;
    } else {
      setCityError(false);
    }

    if (!hospitalname) {
      sethosiptalError(true);
      return false;
    } else if (!/^[A-Za-z]+$/.test(hospitalname)) {
      sethosiptalError(true);
      return false;
    } else {
      sethosiptalError(false);
    }

    if (!special) {
      setspecialError(true);
      return false;
    } else if (!/^[A-Za-z]+$/.test(special)) {
      setspecialError(true);
      return false;
    } else {
      setspecialError(false);
    }

    if (!phone_no) {
      setPhoneError(true);
      return false;
    } else if (!/^[0-9]+$/.test(phone_no)) {
      setPhoneError(true);
      return false;
    } else if (phone_no.length !== 10) {
      setPhoneError(true);
      return false;
    } else {
      setPhoneError(false);
    }
    collectData();
  };

  const collectData = async () => {
    const is_empty = 0;
    const data = {address, phone_no, is_empty};
    makeApiRequest({
      method: 'post',
      urlPath: 'fill',
      body: data,
    })
      .then(response => {
        if (response.data['status'] == 200) {
          console.log(response.data.data);
          if (response.data.data.status == 200) {
            Alert.alert(
              'data successfully Updated please login again to see changes',
            );
            navigation.navigate('Home1');
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

  return (
    <View style={{padding: 10}}>
      <View
        style={{
          flexDirection: 'column',
        }}>
        <Text
          style={{
            color: 'black',
            marginLeft: 20,
            fontFamily: 'Outfit-Regular',
          }}>
          Hospital / Clinic Name
        </Text>
        <TextInput
          value={hospitalname}
          placeholder="Enter Name"
          placeholderTextColor={COLORS.grey}
          onChangeText={value => setHospital(value)}
          editable={flag}
          style={{
            padding: 10,
            backgroundColor: '#f3f4f6',
            borderRadius: 15,
            margin: 10,
            color: 'black',
            fontFamily: 'Outfit-Regular',
          }}
        />
      </View>
      {hospitalError ? (
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

      <View
        style={{
          flexDirection: 'column',
        }}>
        <Text
          style={{
            color: 'black',
            marginLeft: 20,
            fontFamily: 'Outfit-Regular',
          }}>
          Specialization
        </Text>
        <TextInput
          value={special}
          placeholder="Enter Name"
          placeholderTextColor={COLORS.grey}
          onChangeText={value => setSpecial(value)}
          editable={flag}
          style={{
            padding: 10,
            backgroundColor: '#f3f4f6',
            borderRadius: 15,
            margin: 10,
            color: 'black',
            fontFamily: 'Outfit-Regular',
          }}
        />
      </View>
      {specialError ? (
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

      <View
        style={{
          flexDirection: 'column',
        }}>
        <Text
          style={{
            color: 'black',
            marginLeft: 20,
            fontFamily: 'Outfit-Regular',
          }}>
          City
        </Text>
        <TextInput
          value={address}
          placeholder="Enter city"
          placeholderTextColor={COLORS.grey}
          onChangeText={value => setcity(value)}
          editable={flag}
          style={{
            padding: 10,
            backgroundColor: '#f3f4f6',
            borderRadius: 15,
            margin: 10,
            color: 'black',
            fontFamily: 'Outfit-Regular',
          }}
        />
      </View>
      {CityError ? (
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

      <View
        style={{
          flexDirection: 'column',
        }}>
        <Text
          style={{
            color: 'black',
            marginLeft: 20,
            fontFamily: 'Outfit-Regular',
          }}>
          Phone
        </Text>
        <TextInput
          value={phone_no}
          placeholder="Enter Phone Number"
          placeholderTextColor={COLORS.grey}
          onChangeText={value => setPhone(value)}
          editable={flag}
          style={{
            padding: 10,
            backgroundColor: '#f3f4f6',
            borderRadius: 15,
            margin: 10,
            color: 'black',
            fontFamily: 'Outfit-Regular',
          }}
        />
      </View>
      {PhoneError ? (
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

      <TouchableOpacity
        style={{
          backgroundColor: COLORS.yellow,
          height: 44,
          borderRadius: 15,
          alignItems: 'center',
          justifyContent: 'center',
          padding: 10,
          margin: 10,
        }}
        disabled={!flag}
        onPress={validate}>
        <Text
          style={{
            color: COLORS.dark,
            fontFamily: 'Outfit-Bold',
            fontSize: 18,
          }}>
          Save Changes
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  headerTitle: {
    color: COLORS.white,
    fontFamily: 'Outfit-Bold',
    fontSize: 23,
    paddingLeft: 10,
  },
});

export default Settings_Screen;
