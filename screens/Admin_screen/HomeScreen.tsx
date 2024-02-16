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
import 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../../const/color';

const {width} = Dimensions.get('screen');
const type='Patient';
const Admin_Home: React.FC<{navigation: any}> = ({navigation}) => {
  const SymptomsCard: React.FC = () => {
    return (
      <View style={style.mainCardContainer}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('user_report', {value: 'Patient'});
          }}>
          <View style={style.userInfoContainer}>
            <Text style={style.mainFunction}>User Reports</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  const SymptomsCard2: React.FC = () => {
    return (
      <View style={style.mainCardContainer}>
        <TouchableOpacity onPress={() => {
          navigation.navigate('doctor_report', {value: 'Doctor'});
        }}>
          <View style={style.userInfoContainer}>
            <Text style={style.mainFunction}>Doctor Reports</Text>
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
          <SymptomsCard />
          <SymptomsCard2 />
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
  userInfoContainer: {
    padding: 10,
  },
  mainCardContainer: {
    alignItems: 'center',
    backgroundColor: COLORS.lightpink,
    borderRadius: 15,
    padding: 20,
    marginVertical: 15,
    marginHorizontal: 20,
    shadowColor: 'gray',
    elevation: 10,
  },
  mainFunction: {
    color: 'black',
    padding: 30,
    fontSize: 20,
    fontFamily: 'Outfit-SemiBold',
  },
});

export default Admin_Home;
