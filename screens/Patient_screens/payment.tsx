import React, {useEffect, useMemo, useState} from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
  Image,
  FlatList,
  Alert,
} from 'react-native';
import {Title, Text, TouchableRipple} from 'react-native-paper';
import COLORS from '../../const/color';
import Icon1 from 'react-native-vector-icons/FontAwesome';
import RadioGroup from 'react-native-radio-buttons-group';

const Payment: React.FC = ({navigation}: any) => {
  const radioButtons = useMemo(
    () => [
      {
        id: '1', // acts as primary key, should be unique and non-empty string
        value: '1',
      },
    ],
    [],
  );

  const [set1, setSelectedId1] = useState<string | undefined>();
  const [error1, seterror1] = useState(false);

  const submit = () => {
    if (set1 == null) {
      seterror1(true);
      return false;
    } else {
      seterror1(false);
    }
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
        <Text style={styles.heading}>Select payment method</Text>
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'center'}}>
        <Image
          source={require('../../assets/images/payment.png')}
          style={{width: 390, height: 290, marginBottom: 30}}
        />
      </View>
      <View style={styles.box1}>
        <TouchableRipple
          onPress={() => {
            Alert.alert(
              'This part is under working will be updated soon',
            );
            navigation.navigate('Home1');
          }}>
          <View style={styles.selection}>
            <Text style={styles.text1}>Credit Card Payment</Text>
            <Icon1 name="cc-visa" size={28} color={'navy'} />
          </View>
        </TouchableRipple>
        <TouchableRipple
          onPress={() => {
            Alert.alert(
              'This part is under working will be updated soon',
            );
            navigation.navigate('Home1');
          }}>
          <View style={styles.selection}>
            <Text style={styles.text1}>PayPal</Text>
            <Icon1 name="cc-paypal" size={28} color={'blue'} />
          </View>
        </TouchableRipple>
        <TouchableRipple
          onPress={() => {
            Alert.alert(
              'This part is under working will be updated soon',
            );
            navigation.navigate('Home1');
          }}>
          <View style={styles.selection}>
            <Text style={styles.text1}>Net Banking</Text>
          </View>
        </TouchableRipple>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  headerTitle: {
    color: COLORS.white,
    paddingLeft: 10,
    fontFamily: 'Outfit-Bold',
    fontSize: 23,
  },
  heading: {
    fontSize: 24,
    paddingVertical: 10,
    paddingHorizontal: 20,
    color: COLORS.dark,
    fontFamily: 'Outfit-SemiBold',
  },
  box1: {
    justifyContent: 'space-between',
    backgroundColor: COLORS.lightblue,
    borderRadius: 10,
    paddingVertical: 20,
    paddingHorizontal: 10,
    margin: 20,
    shadowColor: 'gray',
    elevation: 5,
  },
  selection: {
    borderColor: COLORS.grey,
    borderWidth: 1,
    borderRadius: 10,
    padding: 15,
    margin: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text1: {
    fontFamily: 'Outfit-Medium',
    fontSize: 22,
    color: COLORS.dark,
  },
});

export default Payment;
