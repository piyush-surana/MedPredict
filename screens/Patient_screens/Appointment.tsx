import React, {useState, useEffect} from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
  Image,
  FlatList,
} from 'react-native';
import {Title, Text, TouchableRipple} from 'react-native-paper';
import COLORS from '../../const/color';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon1 from 'react-native-vector-icons/FontAwesome';
import {makeApiRequest} from '../../auth/helpers';
import Snackbar from 'react-native-snackbar';

const Appo_List: React.FC = ({navigation}: any) => {
  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [list, setlist] = useState<any[]>([]);

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('body');
      if (value !== null) {
        const data = JSON.parse(value);
        setName(data['name']);
      }
      const value2 = await AsyncStorage.getItem('city_global');
      if (value2 !== null) {
        setCity(value2);
      }
    } catch (e) {
      console.log(e);
    }
  };
  getData();

  useEffect(() => {
    collectData();
  }, [city]);

  const collectData = async () => {
    const data = {city};
    makeApiRequest({
      method: 'post',
      urlPath: 'appointment',
      body: data,
    })
      .then(response => {
        if (response.data['status'] == 200) {
          //console.log(response.data.data.result);
          if (response.data.data.status == 200) {
            setlist(response.data.data.result);
            //console.log(list);
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
        <Text style={styles.heading}>Nearby Doctor</Text>
      </View>
      <FlatList
        data={list}
        renderItem={({item, index}) => {
          return (
            <View style={styles.profile}>
              <TouchableRipple
                onPress={() => {
                  // console.log(item);
                  navigation.navigate('Book_appo',{details: item});
                }}>
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
                    <View style={{marginLeft: 15}}>
                      <Title
                        style={[
                          styles.title,
                          {
                            marginBottom: 5,
                            color: COLORS.grey,
                          },
                        ]}>
                        Dr.{item.name}
                      </Title>
                      <Text
                        style={{
                          color: COLORS.grey,
                          marginBottom: 2,
                          fontFamily: 'Outfit-Regular',
                        }}>
                        Type : {item.specialization}
                      </Text>
                      <Text
                        style={{
                          color: COLORS.grey,
                          fontFamily: 'Outfit-Regular',
                        }}>
                        Experience : {item.experience} Years
                      </Text>
                      <Text
                        style={{
                          color: COLORS.grey,
                          fontFamily: 'Outfit-Regular',
                        }}>
                        Hospital : {item.hospital}
                      </Text>
                    </View>
                  </View>
                </View>
              </TouchableRipple>
            </View>
          );
        }}></FlatList>
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
    marginVertical: 15,
    marginHorizontal: 20,
    shadowColor: 'gray',
    elevation: 10,
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
    paddingVertical: 5,
    paddingHorizontal: 20,
    color: COLORS.dark,
    fontFamily: 'Outfit-SemiBold',
  },
});

export default Appo_List;
