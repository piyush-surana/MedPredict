import React from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import COLORS from '../const/color';

const WelcomeScreen = ({navigation}: any) => {
  const goToDetails = () => {
    navigation.navigate('SignUp');
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.primary}}>
      <View style={styles.view}>
        <Text
          style={{
            color: 'white',
            fontSize: 32,
            textAlign: 'center',
            fontFamily: 'Outfit-Bold',
          }}>
          Let's Get Started!
        </Text>
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <Image
            source={require('../assets/images/welcome_banner.png')}
            style={{width: 350, height: 250}}
          />
        </View>
        <View style={{marginVertical: 16}}>
          <TouchableOpacity
            onPress={goToDetails}
            style={{
              paddingVertical: 12,
              backgroundColor: 'yellow',
              marginHorizontal: 28,
              borderRadius: 20,
            }}>
            <Text
              style={{
                fontSize: 24,
                fontFamily: 'Outfit-Bold',
                textAlign: 'center',
                color: 'black',
              }}>
              Start
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: 'space-around',
    marginVertical: 4,
  },
});

export default WelcomeScreen;
