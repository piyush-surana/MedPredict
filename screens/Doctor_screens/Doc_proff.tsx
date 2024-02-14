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
import Icon from 'react-native-vector-icons/FontAwesome';
import DocumentPicker, {
  DocumentPickerResponse,
  types,
} from 'react-native-document-picker';

const Doc_proff_Screen: React.FC = ({navigation}: any) => {
  const [email, setEmail] = useState('');
  const [city, setcity] = useState('');
  const [contact_no, setPhone] = useState('');
  const [hospital, setHospital] = useState('');
  const [specialization, setSpecial] = useState('');
  const [exp, setExp] = useState('');
  const [CityError, setCityError] = useState<boolean>(false);
  const [hospitalError, sethosiptalError] = useState<boolean>(false);
  const [specialError, setspecialError] = useState<boolean>(false);
  const [PhoneError, setPhoneError] = useState<boolean>(false);
  const [ExpError, setExpError] = useState<boolean>(false);
  const [FileError, setFileError] = useState<boolean>(false);
  const [flag, setFlag] = useState(true);
  const [fileResponse, setFileResponse] = useState<string>('');
  const [file, setfile] = useState<DocumentPickerResponse>();

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('body');
      const emailValue = await AsyncStorage.getItem('email_global');
      setEmail(emailValue!);
      // if (value !== null) {
      //   const data = JSON.parse(value);
      //   if (data.is_empty == 1) {
      //     setFlag(false);
      //   } else {
      //     //setcity(data['address']);
      //     //setPhone(data['phone_no']);
      //   }
      // }
    } catch (e) {
      console.log(e);
    }
  };

  getData();

  const handleUplaod = async () => {
    try {
      const reponse = await DocumentPicker.pickSingle({
        presentationStyle: 'fullScreen',
        type: [types.pdf],
      });
      setfile(reponse);
      setFileResponse(reponse.name!);
      //console.log(file);
    } catch (err) {
      console.log(err);
    }
  };

  const validate = () => {
    if (!hospital) {
      sethosiptalError(true);
      return false;
    } else if (!/^[A-Za-z]+$/.test(hospital)) {
      sethosiptalError(true);
      return false;
    } else {
      sethosiptalError(false);
    }

    if (!specialization) {
      setspecialError(true);
      return false;
    } else if (!/^[A-Za-z]+$/.test(specialization)) {
      setspecialError(true);
      return false;
    } else {
      setspecialError(false);
    }

    if (!city) {
      setCityError(true);
      return false;
    } else if (!/^[A-Za-z]+$/.test(city)) {
      setCityError(true);
      return false;
    } else {
      setCityError(false);
    }

    if (!contact_no) {
      setPhoneError(true);
      return false;
    } else if (!/^[0-9]+$/.test(contact_no)) {
      setPhoneError(true);
      return false;
    } else if (contact_no.length !== 10) {
      setPhoneError(true);
      return false;
    } else {
      setPhoneError(false);
    }

    if (!exp) {
      setExpError(true);
      return false;
    } else if (!/^[0-9]+$/.test(exp)) {
      setExpError(true);
      return false;
    } else {
      setExpError(false);
    }

    if (fileResponse == '') {
      setFileError(true);
      return false;
    } else {
      setFileError(false);
    }
    //console.log('enter');
    collectData();
  };

  const collectData = async () => {
    //console.log('entered1');
    const is_empty = 0;
    const data = new FormData();
    const body1 = {
      email,
      city,
      contact_no,
      exp,
      specialization,
      hospital,
      fileResponse,
    };
    // data.append('data', body1);
    // data.append('file',file);
    // console.log(data); //
    makeApiRequest({
      method: 'post',
      urlPath: 'docfill',
      body: body1,
    })
      .then(response => {
        if (response.data['status'] == 200) {
          console.log(response.data.data);
          if (response.data.data.status == 200) {
            Alert.alert(
              'data successfully Updated please login again to see changes'
            );
            //navigation.navigate('Doctor_Home');
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
          value={hospital}
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
          value={specialization}
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
          value={city}
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
          value={contact_no}
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
          Experience
        </Text>
        <TextInput
          value={exp}
          placeholder="Enter Experience"
          placeholderTextColor={COLORS.grey}
          onChangeText={value => setExp(value)}
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
      {ExpError ? (
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
      <Text
        style={{color: 'black', marginLeft: 20, fontFamily: 'Outfit-Regular'}}>
        Certificate
      </Text>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="File name"
          placeholderTextColor={'gray'}
          value={fileResponse}
          onChangeText={setFileResponse}
          editable={false}
        />
        <TouchableOpacity style={styles.iconContainer} onPress={handleUplaod}>
          <Icon name="file-o" size={20} color="black" />
        </TouchableOpacity>
      </View>
      {FileError ? (
        <Text
          style={{
            color: 'red',
            fontSize: 14,
            marginLeft: 20,
            fontFamily: 'Outfit-Regular',
          }}>
          Please add any file
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
    fontFamily: 'Outfit-Regular',
    margin: 10,
  },
  iconContainer: {
    padding: 10,
  },
});

export default Doc_proff_Screen;
