import React from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import COLORS from '../../const/color';
import Icon from 'react-native-vector-icons/FontAwesome';

const ContactScreen2 = ({navigation}: any) => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.white}}>
      <View
        style={{
          backgroundColor: COLORS.primary,
          height: 60,
          padding: 15,
        }}>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon
                name="chevron-left"
                size={18}
                color={COLORS.white}
                style={{paddingHorizontal: 15,paddingVertical:5}}></Icon>
            </TouchableOpacity>
          </View>
          <Text style={styles.headerTitle}>Contact Us</Text>
        </View>
      </View>
      <View style={styles.view}>
        <View>
          <Text style={styles.sentences}>
            You can get in touch with us through below platforms.Our team will
            reach out to you as soon as it would be possible
          </Text>
        </View>
        <View style={styles.box}>
          <Text style={{color: COLORS.grey, paddingBottom: 10,fontFamily:'Outfit-Regular'}}>
            Customer Support
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-start',
              paddingBottom: 10,
            }}>
            <Icon
              name="phone"
              size={18}
              color={COLORS.grey}
              style={{padding: 5}}></Icon>
            <View style={{paddingLeft: 10}}>
              <Text style={styles.sentence}>Contact Number</Text>
              <Text
                style={{
                  color: COLORS.dark,
                  fontFamily: 'Outfit-Medium',
                  fontSize: 14,
                }}>
                (+91) 99999 99999
              </Text>
            </View>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
            <Icon
              name="envelope-o"
              size={18}
              color={COLORS.grey}
              style={{padding: 5}}></Icon>
            <View style={{paddingLeft: 10}}>
              <Text style={styles.sentence}>Email Address</Text>
              <Text
                style={{
                  color: COLORS.dark,
                  fontFamily: 'Outfit-Medium',
                  fontSize: 14,
                }}>
                help@medpredict.com
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.box2}>
          <Text style={{color: COLORS.grey, paddingBottom: 10,fontFamily:'Outfit-Regular'}}>
            Social Media
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-start',
              paddingBottom: 10,
            }}>
            <Icon
              name="instagram"
              size={24}
              color={'red'}
              style={{padding: 5}}></Icon>
            <View style={{paddingLeft: 10}}>
              <Text style={styles.sentence}>Instagram</Text>
              <Text
                style={{
                  color: COLORS.dark,
                  fontFamily: 'Outfit-Medium',
                  fontSize: 14,
                }}>
                @Medpredict
              </Text>
            </View>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'flex-start',paddingBottom: 10,}}>
            <Icon
              name="twitter"
              size={24}
              color={'skyblue'}
              style={{padding: 5}}></Icon>
            <View style={{paddingLeft: 10}}>
              <Text style={styles.sentence}>Twitter</Text>
              <Text
                style={{
                  color: COLORS.dark,
                  fontFamily: 'Outfit-Medium',
                  fontSize: 14,
                }}>
                @Medpredict
              </Text>
            </View>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'flex-start',paddingBottom: 10,}}>
            <Icon
              name="facebook-square"
              size={24}
              color={'blue'}
              style={{padding: 5}}></Icon>
            <View style={{paddingLeft: 10}}>
              <Text style={styles.sentence}>Facebook</Text>
              <Text
                style={{
                  color: COLORS.dark,
                  fontFamily: 'Outfit-Medium',
                  fontSize: 14,
                }}>
                @Medpredict
              </Text>
            </View>
          </View>
        </View>
        {/* <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <Image
            source={require('../assets/images/work_in_progress.png')}
            style={{width: 350, height: 250}}
          />
        </View> */}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: 'flex-start',
    marginVertical: 4,
  },
  headerTitle: {
    color: COLORS.white,
    fontFamily: 'Outfit-Bold',
    fontSize: 23,
    paddingLeft: 25,
  },

  sentences: {
    fontFamily: 'Outfit-Regular',
    fontSize: 14,
    color: COLORS.grey,
    padding: 15,
    justifyContent: 'center',
  },
  sentence: {
    fontFamily: 'Outfit-Regular',
    fontSize: 14,
    color: COLORS.grey,
  },
  box: {
    justifyContent: 'space-between',
    backgroundColor: COLORS.lightblue,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
    margin: 20,
    shadowColor: 'gray',
    elevation: 10,
  },
  box2: {
    justifyContent: 'space-between',
    backgroundColor: COLORS.lightpink,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
    margin: 20,
    shadowColor: 'gray',
    elevation: 10,
  },
});

export default ContactScreen2;
