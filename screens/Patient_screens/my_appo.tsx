import React, {useEffect, useState} from 'react';
import {View, SafeAreaView, StyleSheet, Image, FlatList} from 'react-native';
import {Title, Text, TouchableRipple} from 'react-native-paper';
import COLORS from '../../const/color';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon1 from 'react-native-vector-icons/FontAwesome';
import {makeApiRequest} from '../../auth/helpers';
import Snackbar from 'react-native-snackbar';
import {format} from 'date-fns';

const My_Appo: React.FC = ({navigation}: any) => {
  const [uid, setuserid] = useState('');
  const [confirm, setConfirm] = useState(true);

  const [list, setlist] = useState<any[]>([]);

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('body');
      if (value !== null) {
        const data = JSON.parse(value);
        //console.log(data['userid']);
        setuserid(data['userid']);
      }
    } catch (e) {
      console.log(e);
    }
  };
  getData();

  useEffect(() => {
    collectData();
  }, [uid]);

  const collectData = async () => {
    const data = {uid};
    makeApiRequest({
      method: 'post',
      urlPath: 'user_appointment',
      body: data,
    })
      .then(response => {
        if (response.data['status'] == 200) {
          //console.log(response.data.data.result);
          if (response.data.data.status == 200) {
            setlist(response.data.data.result);
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
      <FlatList
        data={list}
        renderItem={({item, index}) => {
          const date = new Date(item.appointment_date);
          const formated = format(date, 'PPP');
          return (
            <View style={styles.profile}>
              <View style={styles.userInfoSection}>
                <View
                  style={{
                    flexDirection: 'row',
                    marginTop: 15,
                    alignItems: 'center',
                  }}>
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
                      Dr. {item.doctor_name}
                    </Title>
                    <Text
                      style={{
                        color: COLORS.grey,
                        fontFamily: 'Outfit-Regular',
                      }}>
                      {formated}
                    </Text>
                    <Text
                      style={{
                        color: COLORS.grey,
                        fontFamily: 'Outfit-Regular',
                      }}>
                      {item.appointment_time}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          );
        }}
      />
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
    fontSize: 22,
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
