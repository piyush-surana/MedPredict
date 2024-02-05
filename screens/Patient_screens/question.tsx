import React, {useMemo, useState} from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import {TouchableRipple} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import RadioGroup from 'react-native-radio-buttons-group';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon1 from 'react-native-vector-icons/FontAwesome';
import COLORS from '../../const/color';

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
  const [selectedId1, setSelectedId1] = useState<string | undefined>();
  const [selectedId2, setSelectedId2] = useState<string | undefined>();
  const [selectedId3, setSelectedId3] = useState<string | undefined>();
  const [selectedId4, setSelectedId4] = useState<string | undefined>();
  const [selectedId5, setSelectedId5] = useState<string | undefined>();
  const [error1, seterror1] = useState(false);
  const [error2, seterror2] = useState(false);
  const [error3, seterror3] = useState(false);
  const [error4, seterror4] = useState(false);
  const [error5, seterror5] = useState(false);

  const goToDetails = () => {
    navigation.navigate('SignUp');
  };

  const submit = () => {
    if (selectedId1 == null) {
      seterror1(true);
      return false;
    } else {
      seterror1(false);
    }

    if (selectedId2 == null) {
      seterror2(true);
      return false;
    } else {
      seterror2(false);
    }

    if (selectedId3 == null) {
      seterror3(true);
      return false;
    } else {
      seterror3(false);
    }

    if (selectedId4 == null) {
      seterror4(true);
      return false;
    } else {
      seterror4(false);
    }

    if (selectedId5 == null) {
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
      navigation.navigate('Appointment');
      console.log(
        selectedId1,
        selectedId2,
        selectedId3,
        selectedId4,
        selectedId5,
      );
      
    }
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.primary}}>
      <View
        style={{
          backgroundColor: COLORS.white,
          height: 60,
          padding: 15,
        }}>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
            <TouchableRipple
              onPress={() => navigation.goBack()}
              >
              <Icon1 name="chevron-left" size={18} color={COLORS.dark} style={{padding:5}}></Icon1>
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
              selectedId={selectedId1}
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
              selectedId={selectedId2}
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
              selectedId={selectedId3}
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
              selectedId={selectedId4}
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
              selectedId={selectedId5}
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
    textAlign: 'justify',
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
});

export default Question;
