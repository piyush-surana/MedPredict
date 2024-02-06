import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Modal,
  Button,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import COLORS from '../const/color';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Colors} from 'react-native-paper';

const FAQScreen = ({navigation}: any) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [modalVisible3, setModalVisible3] = useState(false);
  const [modalVisible4, setModalVisible4] = useState(false);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.white}}>
      <View>
        <Modal visible={modalVisible} transparent={true} animationType="slide">
          <View style={styles.modalView}>
            <Text style={styles.sentence2}>
              On login screen you will find a button named forgot password that
              will take you to the page where you can reset your password.
            </Text>
            <TouchableOpacity
              onPress={() => {
                setModalVisible(false);
              }}
              style={{
                backgroundColor: COLORS.yellow,
                padding: 10,
                borderRadius: 15,
                marginTop: 15,
                paddingHorizontal: 15,
              }}>
              <Text style={{color: COLORS.dark}}>OK</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
      <View>
        <Modal visible={modalVisible2} transparent={true} animationType="slide">
          <View style={styles.modalView}>
            <Text style={styles.sentence2}>
              Disease are predicted using the machine leanrning algorithms that
              calculates the data on basis of there traning model.
            </Text>
            <TouchableOpacity
              onPress={() => {
                setModalVisible2(false);
              }}
              style={{
                backgroundColor: COLORS.yellow,
                padding: 10,
                borderRadius: 15,
                marginTop: 15,
                paddingHorizontal: 15,
              }}>
              <Text style={{color: COLORS.dark}}>OK</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
      <View>
        <Modal visible={modalVisible3} transparent={true} animationType="slide">
          <View style={styles.modalView}>
            <Text style={styles.sentence2}>
              After the disease prediction you will get the option of booking
              Appointment for various options available.
            </Text>
            <TouchableOpacity
              onPress={() => {
                setModalVisible3(false);
              }}
              style={{
                backgroundColor: COLORS.yellow,
                padding: 10,
                borderRadius: 15,
                marginTop: 15,
                paddingHorizontal: 15,
              }}>
              <Text style={{color: COLORS.dark}}>OK</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
      <View>
        <Modal visible={modalVisible4} transparent={true} animationType="slide">
          <View style={styles.modalView}>
            <Text style={styles.sentence2}>
              We just say that prediction is made by a machine so just dont take
              it 100% serious you should consult doctor for further checkup and
              confirmation.
            </Text>
            <TouchableOpacity
              onPress={() => {
                setModalVisible4(false);
              }}
              style={{
                backgroundColor: COLORS.yellow,
                padding: 10,
                borderRadius: 15,
                marginTop: 15,
                paddingHorizontal: 15,
              }}>
              <Text style={{color: COLORS.dark}}>OK</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
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
                style={{paddingHorizontal: 15, paddingVertical: 5}}></Icon>
            </TouchableOpacity>
          </View>
          <Text style={styles.headerTitle}>Your Health, Your Way</Text>
        </View>
      </View>
      <View style={styles.view}>
        <View>
          <Text style={styles.sentences}>Frequently Asked Questions</Text>
        </View>
        <View style={styles.box}>
          <TouchableOpacity
            onPress={() => {
              setModalVisible(true);
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text
                style={{
                  color: COLORS.grey,
                  fontFamily: 'Outfit-Medium',
                  fontSize: 16,
                  padding: 25,
                }}>
                How to reset my password?
              </Text>
              <Icon
                name="chevron-right"
                size={18}
                color={COLORS.grey}
                style={{padding: 25}}></Icon>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.box}>
          <TouchableOpacity
            onPress={() => {
              setModalVisible2(true);
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text
                style={{
                  color: COLORS.grey,
                  fontFamily: 'Outfit-Medium',
                  fontSize: 16,
                  padding: 25,
                }}>
                How Disease are predicted?
              </Text>
              <Icon
                name="chevron-right"
                size={18}
                color={COLORS.grey}
                style={{padding: 25}}></Icon>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.box}>
          <TouchableOpacity
            onPress={() => {
              setModalVisible3(true);
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text
                style={{
                  color: COLORS.grey,
                  fontFamily: 'Outfit-Medium',
                  fontSize: 16,
                  padding: 25,
                }}>
                How to book Appointment?
              </Text>
              <Icon
                name="chevron-right"
                size={18}
                color={COLORS.grey}
                style={{padding: 25}}></Icon>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.box}>
          <TouchableOpacity
            onPress={() => {
              setModalVisible4(true);
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text
                style={{
                  color: COLORS.grey,
                  fontFamily: 'Outfit-Medium',
                  fontSize: 16,
                  padding: 25,
                }}>
                Is Diseases predicted correct?
              </Text>
              <Icon
                name="chevron-right"
                size={18}
                color={COLORS.grey}
                style={{paddingVertical: 25, paddingHorizontal: 24}}></Icon>
            </View>
          </TouchableOpacity>
        </View>
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
    fontFamily: 'Outfit-SemiBold',
    fontSize: 26,
    color: COLORS.dark,
    paddingHorizontal: 20,
    paddingVertical: 10,
    textAlign: 'center',
  },
  sentence: {
    fontFamily: 'Outfit-Regular',
    fontSize: 14,
    color: COLORS.grey,
  },
  sentence2: {
    fontFamily: 'Outfit-Regular',
    fontSize: 18,
    color: COLORS.grey,
    justifyContent: 'center',
    textAlign: 'justify',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 350,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  box: {
    justifyContent: 'space-between',
    backgroundColor: COLORS.white,
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginHorizontal: 20,
    marginVertical: 8,
    shadowColor: 'gray',
    elevation: 10,
  },
});

export default FAQScreen;
