import React, {useState} from 'react';
import {View, SafeAreaView, StyleSheet, Switch} from 'react-native';
import { Text, TouchableRipple} from 'react-native-paper';
import COLORS from '../const/color';
import  Icon  from 'react-native-vector-icons/FontAwesome5';
import  Icon1  from 'react-native-vector-icons/MaterialIcons';

const Support_Screen: React.FC = ({navigation}: any) => {

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          backgroundColor: COLORS.primary,
          height: 65,
          padding: 15,
        }}>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <Text style={styles.headerTitle}>Support</Text>
        </View>
      </View>
      <View style={{padding: 20}}>
        <View style={styles.box}>
          <TouchableRipple>
            <View style={styles.menuItem}>
               <Icon1 name='support-agent' color='orange' size={25} style={{paddingRight:10}}/> 
              <Text style={styles.menuItemText}>Contact Live chat</Text>
              <Icon name="angle-right" color="black" size={25} style={{paddingLeft:90}} />
            </View>
          </TouchableRipple>
        </View>
        <View style={styles.box}>
          <TouchableRipple>
            <View style={styles.menuItem}>
            <Icon1 name='mail' color='orange' size={25} style={{paddingRight:10}}/>
              <Text style={styles.menuItemText}>Sent us an E-mail</Text>
              <Icon name="angle-right" color="black" size={25} style={{paddingLeft:90}} />
            </View>
          </TouchableRipple>
        </View>
        <View style={styles.box}>
          <TouchableRipple>
            <View style={styles.menuItem}>
            <Icon1 name='question-mark' color='orange' size={25} style={{paddingRight:10}}/>
              <Text style={styles.menuItemText}>FAQs</Text>
              <Icon name="angle-right" color="black" size={25} style={{paddingLeft:180}} />
            </View>
          </TouchableRipple>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  box: {
    padding: 10,
    backgroundColor: '#f3f4f6',
    borderRadius: 15,
    marginHorizontal: 15,
    marginVertical: 10,
    color: 'black',
  },
  headerTitle: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: 23,
  },
  menuItem: {
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 15,
    alignContent:'space-between',
  },
  menuItemText: {
    color: 'black',
    marginLeft: 5,
    fontWeight: 'bold',
    fontSize: 16,
    lineHeight: 26,
  },
});

export default Support_Screen;
