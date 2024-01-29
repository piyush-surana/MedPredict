import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Image,
} from 'react-native';
import {TouchableRipple} from 'react-native-paper';
import 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Swiper from 'react-native-swiper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../../const/color';

const {width} = Dimensions.get('screen');

const HomeScreen: React.FC<{navigation: any}> = ({navigation}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('body');
      if (value !== null) {
        const data = JSON.parse(value);
        setEmail(data['email']);
        setName(data['name']);
      }
    } catch (e) {
      console.log(e);
    }
  };

  getData();

  const UserProfileCard: React.FC = () => {
    return (
      <View>
        <TouchableRipple
          onPress={() => {
            navigation.navigate('User');
          }}>
          <View style={style.userProfileCardContainer}>
            <View style={style.userProfileImageContainer}>
              <Image
                source={require('../../assets/images/avatar.png')}
                style={{height: 90, width: 60}}
              />
            </View>
            <View style={style.userInfoContainer}>
              <Text style={style.userName}>{name}</Text>
              <Text style={style.userRole}>{email}</Text>
            </View>
          </View>
        </TouchableRipple>
      </View>
    );
  };

  const ImageSlider: React.FC = () => {
    return (
      <View style={style.container}>
        <Swiper showsButtons={false} autoplay={true}>
          <Image
            source={require('../../assets/images/item1.jpg')}
            style={style.slideImage}
          />
          <Image
            source={require('../../assets/images/item2.jpg')}
            style={style.slideImage}
          />
          <Image
            source={require('../../assets/images/item3.jpg')}
            style={style.slideImage}
          />
        </Swiper>
      </View>
    );
  };

  const SymptomsCard: React.FC = () => {
    return (
      <View style={style.mainCardContainer}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Work_screen');
          }}>
          <View style={style.userInfoContainer}>
            <Text style={style.mainFunction}>Symptoms Questionnaire</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.white}}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            backgroundColor: COLORS.primary,
            height: 65,
            padding: 15,
          }}>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <Text style={style.headerTitle}>Your Health, Your Way</Text>
            <Icon
              name="notifications-none"
              size={28}
              color={COLORS.white}
              style={{paddingLeft: 100}}
            />
          </View>
        </View>
        <View>
          <UserProfileCard />
          <SymptomsCard />
          <Text style={style.sectionTitle}>Suggestion</Text>
          <ImageSlider />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  headerTitle: {
    color: COLORS.white,
    fontFamily: 'Outfit-Bold',
    fontSize: 23,
  },
  sectionTitle: {
    marginHorizontal: 20,
    marginVertical: 10,
    fontFamily: 'Outfit-SemiBold',
    fontSize: 20,
    color: 'gray',
  },
  userProfileCardContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.lightblue,
    borderRadius: 10,
    margin: 20,
    shadowColor: 'gray',
    elevation: 20,
  },
  userProfileImageContainer: {
    width: 100,
    height: 100,
    borderRadius: 30,
    padding: 20,
    margin: 15, // Make it circular
    overflow: 'hidden',
    backgroundColor: 'yellow',
  },
  userInfoContainer: {
    padding: 10,
  },
  userName: {
    color: 'black',
    fontSize: 24,
    fontFamily: 'Outfit-Bold',
  },
  userRole: {
    color: 'gray',
    fontSize: 16,
    fontFamily: 'Outfit-Regular',
  },
  mainCardContainer: {
    alignItems: 'center',
    backgroundColor: COLORS.lightpink,
    borderRadius: 15,
    padding: 20,
    marginVertical: 10,
    marginHorizontal: 20,
    shadowColor: 'gray',
    elevation: 20,
  },
  mainFunction: {
    color: 'black',
    padding: 30,
    fontSize: 20,
    fontFamily: 'Outfit-SemiBold',
  },
  container: {
    height: 200,
    margin: 15,
  },
  slideImage: {
    width: width - 30,
    height: 200,
    borderRadius: 30,
    resizeMode: 'cover',
  },
});

export default HomeScreen;
