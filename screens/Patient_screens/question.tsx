import React, {useMemo, useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Modal,
} from 'react-native';
import {TouchableRipple} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import RadioGroup from 'react-native-radio-buttons-group';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon1 from 'react-native-vector-icons/FontAwesome';
import COLORS from '../../const/color';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {makeApiRequest} from '../../auth/helpers';
import Snackbar from 'react-native-snackbar';

const Question = ({navigation}: any) => {
  const radioButtons = useMemo(
    () => [
      {
        id: '1', // acts as primary key, should be unique and non-empty string
        label: 'Yes',
        value: '1',
      },
      {
        id: '0',
        label: 'No',
        value: '0',
      },
    ],
    [],
  );
  const [cough, setSelectedId1] = useState<string | undefined>();
  const [headache, setSelectedId2] = useState<string | undefined>();
  const [fever, setSelectedId3] = useState<string | undefined>();
  const [sore_throat, setSelectedId4] = useState<string | undefined>();
  const [fatigue, setSelectedId5] = useState<string | undefined>();
  const [error1, seterror1] = useState(false);
  const [error2, seterror2] = useState(false);
  const [error3, seterror3] = useState(false);
  const [error4, seterror4] = useState(false);
  const [error5, seterror5] = useState(false);
  const [uid, setUid] = useState<string | undefined>();
  const [modalVisible, setModalVisible] = useState(false);
  const [disease, setDisease] = useState('');

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('userid_global');
      if (value !== null) {
        setUid(value);
      }
    } catch (e) {
      console.log(e);
    }
  };

  getData();

  const goToDetails = () => {
    navigation.navigate('SignUp');
  };

  const submit = () => {
    if (cough == null) {
      seterror1(true);
      return false;
    } else {
      seterror1(false);
    }

    if (headache == null) {
      seterror2(true);
      return false;
    } else {
      seterror2(false);
    }

    if (fever == null) {
      seterror3(true);
      return false;
    } else {
      seterror3(false);
    }

    if (sore_throat == null) {
      seterror4(true);
      return false;
    } else {
      seterror4(false);
    }

    if (fatigue == null) {
      seterror5(true);
      return false;
    } else {
      seterror5(false);
    }

    if (
      error1 == false &&
      error2 == false &&
      error3 == false &&
      error4 == false &&
      error5 == false
    ) {
      if (cough== '0' && headache== '0' && fever== '0' && sore_throat== '0' && fatigue == '0') {
        setDisease('No Diseases');
        setModalVisible(true);
      } else {
        collectData();
      }
    }
  };

  const collectData = async () => {
    const data = {uid, cough, headache, fever, sore_throat, fatigue};
    makeApiRequest({
      method: 'post',
      urlPath: 'disease',
      body: data,
    })
      .then(response => {
        if (response.data['status'] == 200) {
          // console.log(response.data.data.pdisease);
          if (response.data.data.status == 200) {
            setDisease(response.data.data.pdisease);
            console.log(response.data.data);
            setModalVisible(true);
            return;
          }
          Snackbar.show({
            text: response.data.data.message,
            duration: Snackbar.LENGTH_SHORT,
            textColor: 'white',
            backgroundColor: 'red',
          });
        } //9137342818
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

  const handleSubmit = () => {
    navigation.navigate('Appointment');
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.primary}}>
      <View>
        <Modal visible={modalVisible} transparent={true} animationType="slide">
          <View style={styles.modalView}>
            <Text style={styles.sentence2}>
              Based on the calculations we are predicting you are suffering from
              : {disease}
            </Text>
            <Text style={styles.sentence3}>
              It is just a prediction made using a machine. Please consult to doctor for further guidance and medication. 
            </Text>
            <TouchableOpacity
              onPress={() => {
                handleSubmit();
                setModalVisible(false);
              }}
              style={{
                backgroundColor: COLORS.yellow,
                padding: 10,
                borderRadius: 15,
                marginTop: 15,
                paddingHorizontal: 15,
              }}>
              <Text style={{color: COLORS.dark}}>OK</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
      <View
        style={{
          backgroundColor: COLORS.white,
          height: 60,
          padding: 15,
        }}>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
            <TouchableRipple onPress={() => navigation.goBack()}>
              <Icon1
                name="chevron-left"
                size={18}
                color={COLORS.dark}
                style={{padding: 15}}></Icon1>
            </TouchableRipple>
          </View>
          <Text style={styles.headerTitle}>Your Health, Your Way</Text>
        </View>
      </View>
      <View style={styles.view}>
        <View style={styles.mainheadingbox}>
          <Text style={styles.mainheading}>
            Choose the Symptoms that you are feeling.
          </Text>
        </View>
        <View
          style={{marginVertical: 15, justifyContent: 'space-around', flex: 1}}>
          <View style={styles.questionbox}>
            <Text style={styles.question}>1. Do you have a Cough</Text>
            <RadioGroup
              radioButtons={radioButtons}
              onPress={setSelectedId1}
              selectedId={cough}
              layout="row"
              labelStyle={{color: COLORS.dark}}
            />
            {error1 ? (
              <Text
                style={{
                  color: 'red',
                  fontSize: 14,
                  fontFamily: 'Outfit-Regular',
                }}>
                Please select any one
              </Text>
            ) : null}
          </View>
          <View style={styles.questionbox}>
            <Text style={styles.question}>2. Do you have a headache</Text>
            <RadioGroup
              radioButtons={radioButtons}
              onPress={setSelectedId2}
              selectedId={headache}
              layout="row"
              labelStyle={{color: COLORS.dark}}
            />
            {error2 ? (
              <Text
                style={{
                  color: 'red',
                  fontSize: 14,
                  fontFamily: 'Outfit-Regular',
                }}>
                Please select any one
              </Text>
            ) : null}
          </View>
          <View style={styles.questionbox}>
            <Text style={styles.question}>3. Do you have a Fever</Text>
            <RadioGroup
              radioButtons={radioButtons}
              onPress={setSelectedId3}
              selectedId={fever}
              layout="row"
              labelStyle={{color: COLORS.dark}}
            />
            {error3 ? (
              <Text
                style={{
                  color: 'red',
                  fontSize: 14,
                  fontFamily: 'Outfit-Regular',
                }}>
                Please select any one
              </Text>
            ) : null}
          </View>
          <View style={styles.questionbox}>
            <Text style={styles.question}>4. Do you have sore throat</Text>
            <RadioGroup
              radioButtons={radioButtons}
              onPress={setSelectedId4}
              selectedId={sore_throat}
              layout="row"
              labelStyle={{color: COLORS.dark}}
            />
            {error4 ? (
              <Text
                style={{
                  color: 'red',
                  fontSize: 14,
                  fontFamily: 'Outfit-Regular',
                }}>
                Please select any one
              </Text>
            ) : null}
          </View>
          <View style={styles.questionbox}>
            <Text style={styles.question}>5. Do you have a fatigue</Text>
            <RadioGroup
              radioButtons={radioButtons}
              onPress={setSelectedId5}
              selectedId={fatigue}
              layout="row"
              labelStyle={{color: COLORS.dark}}
            />
            {error5 ? (
              <Text
                style={{
                  color: 'red',
                  fontSize: 14,
                  fontFamily: 'Outfit-Regular',
                }}>
                Please select any one
              </Text>
            ) : null}
          </View>

          <TouchableOpacity
            style={{
              padding: 10,
              backgroundColor: 'yellow',
              borderRadius: 20,
            }}
            onPress={submit}>
            <Text
              style={{
                fontSize: 22,
                fontFamily: 'Outfit-Bold',
                color: 'black',
                textAlign: 'center',
              }}>
              Predict
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  view: {
    flex: 1,
    padding: 15,
    margin: 5,
  },
  headerTitle: {
    color: COLORS.primary,
    fontFamily: 'Outfit-Bold',
    fontSize: 23,
    paddingLeft: 25,
  },
  mainheadingbox: {
    alignItems: 'center',
    backgroundColor: COLORS.yellow,
    borderRadius: 10,
    padding: 10,
  },
  mainheading: {
    color: COLORS.dark,
    textAlign: 'center',
    fontFamily: 'Outfit-SemiBold',
    fontSize: 24,
  },
  questionbox: {
    backgroundColor: COLORS.white,
    borderRadius: 8,
    padding: 10,
    alignItems: 'center',
  },
  question: {
    color: COLORS.dark,
    fontFamily: 'Outfit-Medium',
    fontSize: 22,
  },
  modalView: {
    margin: 15,
    backgroundColor: COLORS.lightpink,
    borderRadius: 20,
    padding: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 350,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  sentence2: {
    fontFamily: 'Outfit-Regular',
    fontSize: 22,
    color: COLORS.dark,
    justifyContent: 'center',
    textAlign: 'justify',
  },
  sentence3: {
    fontFamily: 'Outfit-Regular',
    fontSize: 14,
    color: 'red',
    justifyContent: 'center',
    textAlign: 'justify',
    paddingTop: 10,
  },
});

export default Question;
