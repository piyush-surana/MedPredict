import React, {useState} from 'react';
import {View, SafeAreaView, StyleSheet, Switch} from 'react-native';
import {Text, TouchableRipple} from 'react-native-paper';
import COLORS from '../const/color';
import Icon1 from 'react-native-vector-icons/FontAwesome';

const Settings_Screen: React.FC = ({navigation}: any) => {
  const [isEnabled, setIsEnabled] = useState(true);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const [isEnabled2, setIsEnabled2] = useState(false);
  const toggleSwitch2 = () => setIsEnabled2(previousState => !previousState);

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
            <TouchableRipple
              onPress={() => navigation.goBack()}
              style={{
                backgroundColor: 'yellow',
                padding: 10,
                borderRadius: 6,
                margin: 5,
              }}>
              <Icon1 name="arrow-left" size={18} color={'black'}></Icon1>
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
                thumbColor={isEnabled2 ? '#f5dd4b' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch2}
                value={isEnabled2}
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
    paddingLeft:10,
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
    fontWeight: 'bold',
    fontSize: 16,
    lineHeight: 26,
  },
});

export default Settings_Screen;
