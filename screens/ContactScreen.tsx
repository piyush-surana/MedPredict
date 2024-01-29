import React from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import COLORS from '../const/color';
import Icon from 'react-native-vector-icons/FontAwesome';


const ContactScreen= ({navigation}: any) => {

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.white}}>
      <View>
      <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            backgroundColor: 'yellow',
            padding: 12,
            borderRadius: 6,
            marginLeft: 15,
            marginTop: 15,
          }}>
          <Icon name="arrow-left" size={18} color={'black'}></Icon>
        </TouchableOpacity>
      </View>
    </View>  
      <View style={styles.view}>
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <Image
            source={require('../assets/images/work_in_progress.png')}
            style={{width: 350, height: 250}}
          />
        </View>
        
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  view: {
    flex: 1, 
    justifyContent: 'space-around',
    marginVertical: 4},
});

export default ContactScreen;
