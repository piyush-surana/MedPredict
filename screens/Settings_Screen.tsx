import React, {useEffect, useState} from 'react';
import {View, SafeAreaView, StyleSheet, Switch} from 'react-native';
import {Text, TouchableRipple} from 'react-native-paper';
import COLORS from '../const/color';
import Icon1 from 'react-native-vector-icons/FontAwesome';

const Settings_Screen: React.FC = ({navigation}: any) => {
  const [isEnabled, setIsEnabled] = useState(true);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const [isDark, setDark] = useState(false);
  const toggleSwitch2 = () => setDark(previousState => !previousState);

  useEffect(() => {
    if (isDark == true) {
    }
  }, [isDark]);

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          backgroundColor: COLORS.primary,
          height: 70,
          padding: 10,
        }}>
        <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
          <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
            <TouchableRipple onPress={() => navigation.goBack()}>
              <Icon1 name="chevron-left" size={18} color={COLORS.white} style={{padding:15}}></Icon1>
            </TouchableRipple>
          </View>
          <Text style={styles.headerTitle}>Settings</Text>
        </View>
      </View>
      <View style={{padding: 20}}>
        <View style={styles.box}>
          <TouchableRipple>
            <View style={styles.menuItem}>
              <Text style={styles.menuItemText}>ON Notification</Text>
              <Switch
                trackColor={{false: '#767577', true: '#81b0ff'}}
                thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={isEnabled}
                style={{paddingLeft: 105}}
              />
            </View>
          </TouchableRipple>
        </View>
        <View style={styles.box}>
          <TouchableRipple>
            <View style={styles.menuItem}>
              <Text style={styles.menuItemText}>Dark Mode</Text>
              <Switch
                trackColor={{false: '#767577', true: '#81b0ff'}}
                thumbColor={isDark ? '#f5dd4b' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch2}
                value={isDark}
                style={{paddingLeft: 145}}
              />
            </View>
          </TouchableRipple>
        </View>
        <View style={styles.box}>
          <TouchableRipple
            onPress={() => {
              navigation.navigate('Welcome');
            }}>
            <View style={styles.menuItem}>
              <Text style={styles.menuItemText}>Log-Out</Text>
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
    backgroundColor: COLORS.white,
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
    fontSize: 23,
    paddingLeft: 10,
    fontFamily: 'Outfit-Bold',
  },
  menuItem: {
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 15,
    alignContent: 'space-between',
  },
  menuItemText: {
    color: 'black',
    marginLeft: 5,
    fontFamily: 'Outfit-SemiBold',
    fontSize: 16,
    lineHeight: 26,
  },
});

export default Settings_Screen;
