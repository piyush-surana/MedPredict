import React, {useState} from 'react';
import {View, SafeAreaView, StyleSheet, Image} from 'react-native';
import {Title, Text, TouchableRipple} from 'react-native-paper';
import COLORS from '../../const/color';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon1 from 'react-native-vector-icons/FontAwesome';


const Doc_Appo_List: React.FC = ({navigation}: any) => {
  const [name, setName] = useState('');

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
          marginBottom:10,
        }}>
        <View style={{flex: 1, flexDirection: 'row',alignItems: 'center'}}>
          <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
            <TouchableRipple
              onPress={() => navigation.goBack()}
              style={{
                backgroundColor: 'yellow',
                padding: 10,
                borderRadius: 6,
                margin: 5,
              }}>
              <Icon1 name="arrow-left" size={18} color={'black'}></Icon1>
            </TouchableRipple>
          </View>
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
                    marginBottom: 5,
                    color: COLORS.grey,
                  },
                ]}>
                {name}
              </Title>
              <Text style={{color: COLORS.grey, marginBottom: 5,fontFamily: 'Outfit-Regular',}}>
                Day & Time{' '}
              </Text>
              <Text style={{color: COLORS.grey,fontFamily: 'Outfit-Regular',}}>Diseases </Text>
            </View>
          </View>
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
                    marginBottom: 5,
                    color: COLORS.grey,
                  },
                ]}>
                {name}
              </Title>
              <Text style={{color: COLORS.grey, marginBottom: 5,fontFamily: 'Outfit-Regular',}}>
                Day & Time{' '}
              </Text>
              <Text style={{color: COLORS.grey,fontFamily: 'Outfit-Regular',}}>Diseases </Text>
            </View>
          </View>
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
                    marginBottom: 5,
                    color: COLORS.grey,
                  },
                ]}>
                {name}
              </Title>
              <Text style={{color: COLORS.grey, marginBottom: 5,fontFamily: 'Outfit-Regular',}}>
                Day & Time{' '}
              </Text>
              <Text style={{color: COLORS.grey,fontFamily: 'Outfit-Regular',}}>Diseases </Text>
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
    marginHorizontal: 20,
    shadowColor: 'gray',
    elevation: 20,
  },
  headerTitle: {
    color: COLORS.white,
    paddingLeft:10,
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
});

export default Doc_Appo_List;
