import React, {useEffect, useState} from 'react';
import {View, SafeAreaView, StyleSheet, Image, FlatList, Alert} from 'react-native';
import {Title, Text, TouchableRipple} from 'react-native-paper';
import COLORS from '../../const/color';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon1 from 'react-native-vector-icons/FontAwesome';
import {makeApiRequest} from '../../auth/helpers';
import Snackbar from 'react-native-snackbar';
import {format} from 'date-fns';

const Doc_Appo_List: React.FC = ({route,navigation}: any) => {
  //const [docid, setuid] = useState('');
  const [list, setlist] = useState<any[]>([]);
  const {docid}=route.params;

  // const getData = async () => {
  //   try {
  //     const value = await AsyncStorage.getItem('body');
  //     if (value !== null) {
  //       const data = JSON.parse(value);
  //       setuid(data['userid']);
  //     }
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  //getData();

  useEffect(() => {
    collectData();
  }, [docid]);

  const collectData = async () => {
    const data = {docid};
    makeApiRequest({
      method: 'post',
      urlPath: 'doc_appointment',
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

  const collectData2 = async (aid: any) => {
    const data={aid};
    //console.log(aid);
    makeApiRequest({
      method: 'post',
      urlPath: 'r_appointment',
      body:data,
    })
      .then(response => {
        if (response.data['status'] == 200) {
          //console.log(response.data.data.result);
          if (response.data.data.status == 200) {
            setlist(response.data.data.result);
            Alert.alert('this id will be removed in next render');
            collectData();
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
        <Text style={styles.heading}>Appointment's</Text>
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
                      {item.name}
                    </Title>
                    <Text
                      style={{
                        color: COLORS.grey,
                        fontFamily: 'Outfit-Regular',
                      }}>
                      {formated} {item.appointment_time}
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
                        style={{backgroundColor: 'red', borderRadius: 10}}
                        onPress={()=>{
                          //console.log(item.a_id);
                          collectData2(item.a_id);
                        }}>
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
