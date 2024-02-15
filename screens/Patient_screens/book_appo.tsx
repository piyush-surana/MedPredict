import React, {useEffect, useState} from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
  Image,
  TextInput,
  Alert,
} from 'react-native';
import {Title, Text, TouchableRipple} from 'react-native-paper';
import COLORS from '../../const/color';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Icon1 from 'react-native-vector-icons/FontAwesome';
import {format} from 'date-fns';
import {makeApiRequest} from '../../auth/helpers';
import Snackbar from 'react-native-snackbar';

const Book_Appo: React.FC = ({route, navigation}: any) => {
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [city, setAddress] = useState('');
  const [exp, setExp] = useState('');
  const [contact, setContact] = useState('');
  const [uid, setUserid] = useState('');
  const [docid, setDocid] = useState('');
  const [date1, setDate] = useState('');
  const [time, setTime] = useState('');
  const [date, setDate1] = useState('');
  const [selection, setSelection] = useState<number>();
  const [DateError, setDateError] = useState<boolean>(false);
  const [TimeError, setTimeError] = useState<boolean>(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const {details} = route.params;

  useEffect(() => {
    setName(details.name);
    setType(details.specialization);
    setAddress(details.city);
    setExp(details.experience);
    setContact(details.contact_no);
    setDocid(details.docid);
    getdata(); 

    switch (selection) {
      case 1: {
        setTime('10:00');
        break;
      }
      case 2: {
        setTime('11:00');
        break;
      }
      case 3: {
        setTime('12:00');
        break;
      }
      case 4: {
        setTime('13:00');
        break;
      }
      case 5: {
        setTime('14:00');
        break;
      }
      case 6: {
        setTime('16:00');
        break;
      }
      case 7: {
        setTime('18:00');
        break;
      }
      case 8: {
        setTime('19:00');
        break;
      }
    }
  }, [details, selection]);

  const getdata =async () =>{
    try{
      const value = await AsyncStorage.getItem('userid_global');
      if(value!== null){
        setUserid(value);
          }
    }catch(e){
      console.log({error: e});
    }
  }

  const validate = () => {
    if (date1 == '') {
      setDateError(true);
      return false;
    } else {
      setDateError(false);
    }

    if (time == '') {
      setTimeError(true);
      return false;
    } else {
      setTimeError(false);
    }

    collectData();
  };

  const collectData = async () => {
    const data = {uid, docid, date, time};
    makeApiRequest({
      method: 'post',
      urlPath: 'appointment_booking',
      body: data,
    })
      .then(response => {
        if (response.data['status'] == 200) {
          if (response.data.data.status == 200) {
            console.log(response.data.data);
            Alert.alert(
              'Appointment is booked please pay the fees for compeletion of process',
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

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: any) => {
    const date1 = new Date(date);
    const formated = format(date1, 'PPP');
    setDate(formated);
    setDate1(format(date1, 'yyyy-MM-dd'));
    hideDatePicker();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          backgroundColor: COLORS.primary,
          height: 70,
          padding: 10,
          marginBottom: 10,
        }}>
        <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
          <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
            <TouchableRipple onPress={() => navigation.goBack()}>
              <Icon1
                name="chevron-left"
                size={18}
                color={COLORS.white}
                style={{padding: 15}}></Icon1>
            </TouchableRipple>
          </View>
          <Text style={styles.headerTitle2}>Your Health, Your Way</Text>
        </View>
      </View>
      <View style={styles.profile}>
        <View style={styles.userInfoSection}>
          <View style={{alignItems: 'center'}}>
            <Image
              source={require('../../assets/images/avatar.png')}
              style={{
                width: 100,
                height: 100,
                borderRadius: 30,
                backgroundColor: 'yellow',
                padding: 20,
                marginTop: 25,
                marginBottom: 10,
              }}
            />
            <Title
              style={[
                styles.title,
                {
                  marginBottom: 5,
                  color: COLORS.dark,
                },
              ]}>
              Dr. {name.charAt(0).toUpperCase() + name.slice(1)}
            </Title>
          </View>
          <View style={{flexDirection: 'row', marginTop: 10}}>
            <View style={{marginLeft: 10}}>
              <Text
                style={{
                  color: COLORS.grey,
                  marginBottom: 5,
                  fontFamily: 'Outfit-Regular',
                  fontSize: 18,
                }}>
                Specialization : {type}
              </Text>
              <Text
                style={{
                  color: COLORS.grey,
                  marginBottom: 5,
                  fontFamily: 'Outfit-Regular',
                  fontSize: 18,
                }}>
                Address : {city}
              </Text>
              <Text
                style={{
                  color: COLORS.grey,
                  marginBottom: 5,
                  fontFamily: 'Outfit-Regular',
                  fontSize: 18,
                }}>
                Exp : {exp} Years
              </Text>
              <Text
                style={{
                  color: COLORS.grey,
                  marginBottom: 5,
                  fontFamily: 'Outfit-Regular',
                  fontSize: 18,
                }}>
                Contact No : {contact}
              </Text>
            </View>
          </View>
        </View>
      </View>
      <View>
        <Text style={styles.headerTitle}>Book Apponitment</Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <View
          style={{
            paddingHorizontal: 10,
            backgroundColor: COLORS.lightpink,
            borderRadius: 15,
            marginHorizontal: 20,
            marginVertical: 10,
          }}>
          <TextInput
            style={{color: 'black', paddingRight: 5, width: 260}}
            placeholder="Select date"
            value={date1}
            placeholderTextColor={COLORS.grey}
            editable={false}></TextInput>
        </View>
        <TouchableRipple onPress={showDatePicker}>
          <Icon1
            name={'calendar'}
            size={20}
            color="black"
            style={{padding: 10}}
          />
        </TouchableRipple>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          minimumDate={new Date()}
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
      </View>
      {DateError ? (
        <Text
          style={{
            fontFamily: 'Outfit-Regular',
            color: 'red',
            fontSize: 14,
            marginLeft: 25,
          }}>
          Please select date
        </Text>
      ) : null}
      <View style={styles.profile2}>
        <Text
          style={{
            paddingBottom: 10,
            paddingLeft: 5,
            fontSize: 20,
            fontFamily: 'Outfit-Medium',
          }}>
          Choose Time
        </Text>
        <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
          <TouchableRipple
            style={[
              styles.chip,
              selection == 1
                ? {backgroundColor: COLORS.yellow}
                : {backgroundColor: COLORS.white},
            ]}
            onPress={() => {
              setSelection(1);
            }}>
            <Text style={styles.TimeText}>10:00</Text>
          </TouchableRipple>
          <TouchableRipple
            style={[
              styles.chip,
              selection == 2
                ? {backgroundColor: COLORS.yellow}
                : {backgroundColor: COLORS.white},
            ]}
            onPress={() => {
              setSelection(2);
            }}>
            <Text style={styles.TimeText}>11:00</Text>
          </TouchableRipple>

          <TouchableRipple
            style={[
              styles.chip,
              selection == 3
                ? {backgroundColor: COLORS.yellow}
                : {backgroundColor: COLORS.white},
            ]}
            onPress={() => {
              setSelection(3);
            }}>
            <Text style={styles.TimeText}>12:00</Text>
          </TouchableRipple>
          <TouchableRipple
            style={[
              styles.chip,
              selection == 4
                ? {backgroundColor: COLORS.yellow}
                : {backgroundColor: COLORS.white},
            ]}
            onPress={() => {
              setSelection(4);
            }}>
            <Text style={styles.TimeText}>13:00</Text>
          </TouchableRipple>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
          <TouchableRipple
            style={[
              styles.chip,
              selection == 5
                ? {backgroundColor: COLORS.yellow}
                : {backgroundColor: COLORS.white},
            ]}
            onPress={() => {
              setSelection(5);
            }}>
            <Text style={styles.TimeText}>14:00</Text>
          </TouchableRipple>
          <TouchableRipple
            style={[
              styles.chip,
              selection == 6
                ? {backgroundColor: COLORS.yellow}
                : {backgroundColor: COLORS.white},
            ]}
            onPress={() => {
              setSelection(6);
            }}>
            <Text style={styles.TimeText}>16:00</Text>
          </TouchableRipple>
          <TouchableRipple
            style={[
              styles.chip,
              selection == 7
                ? {backgroundColor: COLORS.yellow}
                : {backgroundColor: COLORS.white},
            ]}
            onPress={() => {
              setSelection(7);
            }}>
            <Text style={styles.TimeText}>18:00</Text>
          </TouchableRipple>
          <TouchableRipple
            style={[
              styles.chip,
              selection == 8
                ? {backgroundColor: COLORS.yellow}
                : {backgroundColor: COLORS.white},
            ]}
            onPress={() => {
              setSelection(8);
            }}>
            <Text style={styles.TimeText}>19:00</Text>
          </TouchableRipple>
        </View>
        {TimeError ? (
          <Text
            style={{
              fontFamily: 'Outfit-Regular',
              color: 'red',
              fontSize: 14,
              marginLeft: 5,
              marginTop: 5,
            }}>
            Please Enter Valid Value
          </Text>
        ) : null}
      </View>
      <View>
        <TouchableRipple
          onPress={() => {
            validate();
          }}
          style={{
            paddingVertical: 12,
            backgroundColor: 'yellow',
            marginHorizontal: 40,
            marginVertical: 10,
            borderRadius: 20,
            shadowColor: 'gray',
            elevation: 20,
          }}>
          <Text
            style={{
              fontSize: 24,
              fontFamily: 'Outfit-Bold',
              textAlign: 'center',
              color: 'black',
            }}>
            Confirm
          </Text>
        </TouchableRipple>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  profile: {
    backgroundColor: COLORS.lightblue,
    borderRadius: 15,
    marginVertical: 10,
    marginHorizontal: 20,
    shadowColor: 'gray',
    elevation: 20,
  },
  profile2: {
    backgroundColor: COLORS.lightpink,
    borderRadius: 15,
    padding: 15,
    marginVertical: 10,
    marginHorizontal: 20,
    shadowColor: 'gray',
    elevation: 20,
  },
  chip: {
    backgroundColor: COLORS.white,
    borderRadius: 5,
    margin: 5,
    width: 70,
    padding: 5,
    alignItems: 'center',
  },
  TimeText: {
    fontSize: 18,
    fontFamily: 'Outfit-Regular',
    color: COLORS.grey,
    margin: 2,
  },
  headerTitle: {
    color: COLORS.grey,
    marginHorizontal: 25,
    marginVertical: 10,
    fontFamily: 'Outfit-Bold',
    fontSize: 23,
  },
  headerTitle2: {
    color: COLORS.white,
    marginHorizontal: 25,
    marginVertical: 10,
    fontFamily: 'Outfit-Bold',
    fontSize: 23,
  },

  userInfoSection: {
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  title: {
    fontSize: 28,
    fontFamily: 'Outfit-Bold',
  },
});

export default Book_Appo;
