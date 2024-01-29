import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput,
  StyleSheet,
  Alert,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Dropdown} from 'react-native-element-dropdown';
import Snackbar from 'react-native-snackbar';
import COLORS from '../../const/color';
import Icon from 'react-native-vector-icons/FontAwesome';
import {makeApiRequest} from '../../auth/helpers';
import DatePicker from '../../utils/datepicker';

const Doctor_EditProfile: React.FC = ({navigation}: any) => {
  const [name, setName] = useState('');
  const [Lname, setLName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setcity] = useState('');
  const [phone_no, setPhone] = useState('');
  const [hospitalname, setHospital] = useState('');
  const [special, setSpecial] = useState('');
  const [LnameError, setLnameError] = useState<boolean>(false);
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
          setEmail(data['email']);
          setName(data['name']);
          setFlag(true);
        } else {
          setEmail(data['email']);
          setName(data['name']);
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
    if (!Lname) {
      setLnameError(true);
      return false;
    } else if (!/^[A-Za-z]+$/.test(address)) {
      setLnameError(true);
      return false;
    } else {
      setLnameError(false);
    }

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
    const data = {email, address, phone_no, is_empty};
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
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
      }}>
      <View
        style={{
          backgroundColor: COLORS.primary,
          height: 70,
          padding: 10,
        }}>
        <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
          <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{
                backgroundColor: 'yellow',
                padding: 10,
                borderRadius: 6,
                margin: 5,
              }}>
              <Icon name="arrow-left" size={18} color={'black'}></Icon>
            </TouchableOpacity>
          </View>
          <Text style={style.headerTitle}>Your Health, Your Way</Text>
        </View>
      </View>

      <ScrollView>
        <View
          style={{
            alignItems: 'center',
            marginVertical: 10,
          }}>
          <TouchableOpacity
            onPress={() => {}}
            style={{
              backgroundColor: COLORS.yellow,
              borderRadius: 85,
            }}>
            <Image
              source={require('../../assets/images/avatar.png')}
              style={{
                height: 120,
                width: 120,
                borderRadius: 85,
                borderWidth: 2,
                borderColor: COLORS.primary,
              }}
            />
          </TouchableOpacity>
        </View>

        <View style={{padding: 10}}>
          <View
            style={{
              flexDirection: 'column',
            }}>
            <Text style={{color: 'black', marginLeft: 20,fontFamily: 'Outfit-Regular',}}>First Name</Text>
            <TextInput
              value={name}
              onChangeText={value => setName(value)}
              editable={false}
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
          <View
            style={{
              flexDirection: 'column',
            }}>
            <Text style={{color: 'black', marginLeft: 20,fontFamily: 'Outfit-Regular',}}>Last Name</Text>
            <TextInput
              value={Lname}
              placeholder="Enter Last Name"
              placeholderTextColor={COLORS.grey}
              onChangeText={value => setLName(value)}
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
          {LnameError ? (
            <Text style={{color: 'red', fontSize: 14, marginLeft: 20,fontFamily: 'Outfit-Regular',}}>
              Please Enter Valid Value
            </Text>
          ) : null}
          <View
            style={{
              flexDirection: 'column',
            }}>
            <Text style={{color: 'black', marginLeft: 20,fontFamily: 'Outfit-Regular',}}>Email</Text>
            <TextInput
              value={email}
              onChangeText={value => setEmail(value)}
              editable={false}
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

          <View
            style={{
              flexDirection: 'column',
            }}>
            <Text style={{color: 'black', marginLeft: 20,fontFamily: 'Outfit-Regular',}}>City</Text>
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
            <Text style={{color: 'red', fontSize: 14, marginLeft: 20,fontFamily: 'Outfit-Regular',}}>
              Please Enter Valid Value
            </Text>
          ) : null}
          <View
            style={{
              flexDirection: 'column',
            }}>
            <Text style={{color: 'black', marginLeft: 20,fontFamily: 'Outfit-Regular',}}>
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
            <Text style={{color: 'red', fontSize: 14, marginLeft: 20,fontFamily: 'Outfit-Regular',}}>
              Please Enter Valid Value
            </Text>
          ) : null}

          <View
            style={{
              flexDirection: 'column',
            }}>
            <Text style={{color: 'black', marginLeft: 20,fontFamily: 'Outfit-Regular',}}>Specialization</Text>
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
            <Text style={{color: 'red', fontSize: 14, marginLeft: 20,fontFamily: 'Outfit-Regular',}}>
              Please Enter Valid Value
            </Text>
          ) : null}

          <View
            style={{
              flexDirection: 'column',
            }}>
            <Text style={{color: 'black', marginLeft: 20,fontFamily: 'Outfit-Regular',}}>Phone</Text>
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
            <Text style={{color: 'red', fontSize: 14, marginLeft: 20,fontFamily: 'Outfit-Regular',}}>
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
                fontSize:18
              }}>
              Save Changes
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  headerTitle: {
    color: COLORS.white,
    fontFamily: 'Outfit-Bold',
    fontSize: 23,
    paddingLeft: 10,
  },
});

export default Doctor_EditProfile;
