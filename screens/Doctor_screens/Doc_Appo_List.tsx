import React, {useState} from 'react';
import {View, SafeAreaView, StyleSheet, Image} from 'react-native';
import {Title, Text, TouchableRipple} from 'react-native-paper';
import COLORS from '../../const/color';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon1 from 'react-native-vector-icons/FontAwesome';

const Doc_Appo_List: React.FC = ({navigation}: any) => {
  const [name, setName] = useState('');
  const [confirm, setConfirm] = useState(true);

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('body');
      if (value !== null) {
        const data = JSON.parse(value);
        setName(data['name']);
      }
    } catch (e) {
      console.log(e);
    }
  };
  getData();

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
                style={{padding: 5}}></Icon1>
            </TouchableRipple>
          </View>
          <Text style={styles.headerTitle}>Your Health, Your Way</Text>
        </View>
      </View>
      <View>
        <Text style={styles.heading}>Appointment's</Text>
      </View>
      <View style={styles.profile}>
        <View style={styles.userInfoSection}>
          <View
            style={{flexDirection: 'row', marginTop: 15, alignItems: 'center'}}>
            <Image
              source={require('../../assets/images/avatar.png')}
              style={{
                width: 100,
                height: 100,
                borderRadius: 30,
                backgroundColor: 'yellow',
                padding: 20,
              }}
            />
            <View style={{marginLeft: 20}}>
              <Title
                style={[
                  styles.title,
                  {
                    marginBottom: 5,
                    color: COLORS.dark,
                  },
                ]}>
                Patient Name
              </Title>
              <Text
                style={{
                  color: COLORS.grey,
                  fontFamily: 'Outfit-Regular',
                }}>
                Date & Time
              </Text>
              <Text style={{color: COLORS.grey, fontFamily: 'Outfit-Regular'}}>
                Disease Predicted
              </Text>
              <View
                style={[
                  {
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingVertical: 10,
                  },
                ]}>
                <TouchableRipple
                  style={{
                    backgroundColor: 'green',
                    borderRadius: 10,
                    marginRight: 10,
                  }}>
                  <Text
                    style={{
                      fontFamily: 'Outfit-Regular',
                      fontSize: 20,
                      color: COLORS.white,
                      padding: 10,
                    }}>
                    Confirm
                  </Text>
                </TouchableRipple>
                <TouchableRipple
                  style={{backgroundColor: 'red', borderRadius: 10}}>
                  <Text
                    style={{
                      fontFamily: 'Outfit-Regular',
                      fontSize: 20,
                      color: COLORS.white,
                      padding: 10,
                    }}>
                    Cancel
                  </Text>
                </TouchableRipple>
              </View>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.profile}>
        <View style={styles.userInfoSection}>
          <View
            style={{flexDirection: 'row', marginTop: 15, alignItems: 'center'}}>
            <Image
              source={require('../../assets/images/avatar.png')}
              style={{
                width: 100,
                height: 100,
                borderRadius: 30,
                backgroundColor: 'yellow',
                padding: 20,
              }}
            />
            <View style={{marginLeft: 20}}>
              <Title
                style={[
                  styles.title,
                  {
                    marginBottom: 5,
                    color: COLORS.dark,
                  },
                ]}>
                Patient Name
              </Title>
              <Text
                style={{
                  color: COLORS.grey,
                  fontFamily: 'Outfit-Regular',
                }}>
                Date & Time
              </Text>
              <Text style={{color: COLORS.grey, fontFamily: 'Outfit-Regular'}}>
                Disease Predicted
              </Text>
              <View
                style={[
                  {
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingVertical: 10,
                  },
                ]}>
                <TouchableRipple
                  style={{
                    backgroundColor: 'green',
                    borderRadius: 10,
                    marginRight: 10,
                  }}>
                  <Text
                    style={{
                      fontFamily: 'Outfit-Regular',
                      fontSize: 20,
                      color: COLORS.white,
                      padding: 10,
                    }}>
                    Confirm
                  </Text>
                </TouchableRipple>
                <TouchableRipple
                  style={{backgroundColor: 'red', borderRadius: 10}}>
                  <Text
                    style={{
                      fontFamily: 'Outfit-Regular',
                      fontSize: 20,
                      color: COLORS.white,
                      padding: 10,
                    }}>
                    Cancel
                  </Text>
                </TouchableRipple>
              </View>
            </View>
          </View>
        </View>
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
  headerTitle: {
    color: COLORS.white,
    paddingLeft: 10,
    fontFamily: 'Outfit-Bold',
    fontSize: 23,
  },
  userInfoSection: {
    paddingHorizontal: 20,
    marginBottom: 5,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Outfit-Bold',
  },
  heading: {
    fontSize: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    color: COLORS.dark,
    fontFamily: 'Outfit-SemiBold',
  },
  heading1: {
    fontSize: 18,
    paddingVertical: 5,
    paddingHorizontal: 20,
    color: COLORS.grey,
    fontFamily: 'Outfit-SemiBold',
  },
});

export default Doc_Appo_List;
