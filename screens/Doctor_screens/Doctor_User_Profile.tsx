import React, {useState} from 'react';
import {View, SafeAreaView, StyleSheet, Image, ScrollView} from 'react-native';
import {Title, Text, TouchableRipple} from 'react-native-paper';
import COLORS from '../../const/color';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon1 from 'react-native-vector-icons/FontAwesome';

const Doctor_UserProfile: React.FC = ({navigation}: any) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [phone, setPhone] = useState('');
  const [Gender, setGender] = useState('');

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('body');
      if (value !== null) {
        const data = JSON.parse(value);
        setEmail(data['email']);
        setName(data['name']);
        setCity(data['city']);
        setPhone(data['phone_no']);
        setGender(data['gender']);
      }
    } catch (e) {
      console.log(e);
    }
  };
  getData();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View
          style={{
            backgroundColor: COLORS.primary,
            height: 65,
            padding: 15,
          }}>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <Text style={styles.headerTitle}>Your Health, Your Way</Text>
          </View>
        </View>
        <View style={styles.profile}>
          <View style={styles.userInfoSection}>
            <View style={{flexDirection: 'row', marginTop: 15}}>
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
                      marginTop: 15,
                      marginBottom: 5,
                      color: COLORS.grey,
                    },
                  ]}>
                  {name}
                </Title>
                <Text
                  style={{color: COLORS.grey, fontFamily: 'Outfit-Regular'}}>
                  {email}
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.userInfoSection}>
            <View style={styles.row}>
              <Icon name="map-marker-radius" color="#777777" size={20} />
              <Text
                style={{
                  color: COLORS.grey,
                  marginLeft: 20,
                  fontFamily: 'Outfit-Regular',
                }}>
                {city}
              </Text>
            </View>
            <View style={styles.row}>
              <Icon name="phone" color="#777777" size={20} />
              <Text
                style={{
                  color: '#777777',
                  marginLeft: 20,
                  fontFamily: 'Outfit-Regular',
                }}>
                {phone}
              </Text>
            </View>
            <View style={styles.row}>
              <Icon1
                name={Gender == 'Male' ? 'male' : 'female'}
                color="#777777"
                size={20}
                style={{paddingLeft:5}}
              />
              <Text
                style={{
                  color: '#777777',
                  marginLeft: 20,
                  fontFamily: 'Outfit-Regular',
                }}>
                {Gender}
              </Text>
            </View>
          </View>
        </View>
        <View>
          <View style={styles.box}>
            <TouchableRipple
              onPress={() => {
                navigation.navigate('Doc_Edit');
              }}>
              <View style={styles.menuItem}>
                <Icon1 name="user" color="#FF6347" size={25} />
                <Text style={styles.menuItemText}>Edit Profile</Text>
              </View>
            </TouchableRipple>
          </View>
          <View style={styles.box}>
            <TouchableRipple
              onPress={() => {
                navigation.navigate('Doc_Appointment');
              }}>
              <View style={styles.menuItem}>
                <Icon name="credit-card" color="#FF6347" size={25} />
                <Text style={styles.menuItemText}>Appointments</Text>
              </View>
            </TouchableRipple>
          </View>
          <View style={styles.box}>
            <TouchableRipple
              onPress={() => {
                navigation.navigate('Work_screen');
              }}>
              <View style={styles.menuItem}>
                <Icon2 name="payment" color="#FF6347" size={25} />
                <Text style={styles.menuItemText}>Payments</Text>
              </View>
            </TouchableRipple>
          </View>
          <View style={styles.box}>
            <TouchableRipple
              onPress={() => {
                navigation.navigate('Support');
              }}>
              <View style={styles.menuItem}>
                <Icon name="account-check-outline" color="#FF6347" size={25} />
                <Text style={styles.menuItemText}>Support</Text>
              </View>
            </TouchableRipple>
          </View>
          {/* <View style={styles.box}>
          <TouchableRipple onPress={() => {navigation.navigate('Settings')}}>
            <View style={styles.menuItem}>
              <Icon2 name="settings" color="#FF6347" size={25} />
              <Text style={styles.menuItemText}>Settings</Text>
            </View>
          </TouchableRipple>
        </View> */}
          <View style={styles.box}>
            <TouchableRipple
              onPress={() => {
                navigation.navigate('Welcome');
              }}>
              <View style={styles.menuItem}>
                <Icon2 name="logout" color="#FF6347" size={25} />
                <Text style={styles.menuItemText}>Log-Out</Text>
              </View>
            </TouchableRipple>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  box: {
    padding: 5,
    backgroundColor: '#f3f4f6',
    borderRadius: 15,
    marginHorizontal: 15,
    marginVertical: 5,
    color: 'black',
  },
  profile: {
    backgroundColor: COLORS.lightblue,
    borderRadius: 15,
    marginVertical: 10,
    marginHorizontal: 15,
    shadowColor: 'gray',
    elevation: 20,
  },
  headerTitle: {
    color: COLORS.white,
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
  row: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  menuItem: {
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  menuItemText: {
    color: '#777777',
    marginLeft: 20,
    fontFamily: 'Outfit-Regular',
    fontSize: 16,
    lineHeight: 26,
  },
});

export default Doctor_UserProfile;
