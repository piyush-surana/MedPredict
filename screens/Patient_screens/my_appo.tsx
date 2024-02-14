import React, {useState} from 'react';
import {View, SafeAreaView, StyleSheet, Image} from 'react-native';
import {Title, Text, TouchableRipple} from 'react-native-paper';
import COLORS from '../../const/color';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon1 from 'react-native-vector-icons/FontAwesome';

const My_Appo: React.FC = ({navigation}: any) => {
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
                style={{padding: 15}}></Icon1>
            </TouchableRipple>
          </View>
          <Text style={styles.headerTitle}>Your Health, Your Way</Text>
        </View>
      </View>
      <View>
        <Text style={styles.heading}>Your Appointment's</Text>
      </View>
      <View>
        <Text style={styles.heading1}>Upcoming</Text>
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
                Dr.{name}
              </Title>
              <View style={{flexDirection: 'row',paddingBottom:5 }}>
                <Icon1 name="star" size={18} color={COLORS.yellow}></Icon1>
                <Icon1 name="star" size={18} color={COLORS.yellow}></Icon1>
                <Icon1 name="star" size={18} color={COLORS.yellow}></Icon1>
                <Icon1 name="star" size={18} color={COLORS.yellow}></Icon1>
                <Icon1 name="star" size={18}></Icon1>
              </View>
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
            </View>
            <View style={{padding: 20, alignItems: 'center'}}>
              <Icon1
                name="check-square"
                color={confirm == true ? 'green' : COLORS.grey}
                size={36}></Icon1>
              <Text style={{fontFamily: 'Outfit-Regular',color:COLORS.grey}}>
                {confirm == true ? 'Confirm' : 'Pending'}
              </Text>
            </View>
          </View>
        </View>
      </View>
      <View>
        <Text style={styles.heading1}>Previous</Text>
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
                Dr.{name}
              </Title>
              <View style={{flexDirection: 'row',paddingBottom:5 }}>
                <Icon1 name="star" size={18} color={COLORS.yellow}></Icon1>
                <Icon1 name="star" size={18} color={COLORS.yellow}></Icon1>
                <Icon1 name="star" size={18} color={COLORS.yellow}></Icon1>
                <Icon1 name="star" size={18} color={COLORS.yellow}></Icon1>
                <Icon1 name="star" size={18}></Icon1>
              </View>
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
            </View>
            {/* <View style={{padding: 20, alignItems: 'center'}}>
              <Icon1
                name="check-square"
                color={confirm == true ? 'green' : COLORS.grey}
                size={36}></Icon1>
              <Text style={{fontFamily: 'Outfit-Light'}}>
                {confirm == true ? 'Confirm' : 'Pending'}
              </Text>
            </View> */}
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
    marginBottom: 15,
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

export default My_Appo;
