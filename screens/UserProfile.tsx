import React from 'react';
import {View, SafeAreaView, StyleSheet, Image} from 'react-native';
import {
  Avatar,
  Title,
  Caption,
  Text,
  TouchableRipple,
} from 'react-native-paper';
import COLORS from '../const/color';

import Icon2 from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon1 from 'react-native-vector-icons/FontAwesome';

const UserProfile: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          backgroundColor: COLORS.primary,
          height: 65,
          padding: 15,
        }}>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <Text style={styles.headerTitle}>Your Health, Your Way</Text>
        </View>
      </View>
      <View style={styles.profile}>
        <View style={styles.userInfoSection}>
          <View style={{flexDirection: 'row', marginTop: 15}}>
            <Image
              source={require('../assets/images/avatar.png')}
              style={{
                width: 100,
                height: 100,
                borderRadius: 30,
                backgroundColor: 'yellow',
                padding: 20,
              }}
            />
            <View style={{marginLeft: 20}}>
              <Title
                style={[
                  styles.title,
                  {
                    marginTop: 15,
                    marginBottom: 5,
                  },
                ]}>
                John Doe
              </Title>
              <Caption style={styles.caption}>@j_doe</Caption>
            </View>
          </View>
        </View>
        <View style={styles.userInfoSection}>
          <View style={styles.row}>
            <Icon name="map-marker-radius" color="#777777" size={20} />
            <Text style={{color: '#777777', marginLeft: 20}}>
              Kolkata, India
            </Text>
          </View>
          <View style={styles.row}>
            <Icon name="phone" color="#777777" size={20} />
            <Text style={{color: '#777777', marginLeft: 20}}>
              +91-900000009
            </Text>
          </View>
          <View style={styles.row}>
            <Icon name="email" color="#777777" size={20} />
            <Text style={{color: '#777777', marginLeft: 20}}>
              john_doe@email.com
            </Text>
          </View>
        </View>
      </View>
      <View>
        <View style={styles.box}>
          <TouchableRipple onPress={() => {}}>
            <View style={styles.menuItem}>
              <Icon1 name="user" color="#FF6347" size={25} />
              <Text style={styles.menuItemText}>Edit Profile</Text>
            </View>
          </TouchableRipple>
        </View>
        <View style={styles.box}>
          <TouchableRipple onPress={() => {}}>
            <View style={styles.menuItem}>
              <Icon name="credit-card" color="#FF6347" size={25} />
              <Text style={styles.menuItemText}>Payment</Text>
            </View>
          </TouchableRipple>
        </View>
        <View style={styles.box}>
          <TouchableRipple onPress={() => {}}>
            <View style={styles.menuItem}>
              <Icon name="account-check-outline" color="#FF6347" size={25} />
              <Text style={styles.menuItemText}>Support</Text>
            </View>
          </TouchableRipple>
        </View>
        <View style={styles.box}>
          <TouchableRipple onPress={() => {}}>
            <View style={styles.menuItem}>
              <Icon2 name="settings" color="#FF6347" size={25} />
              <Text style={styles.menuItemText}>Settings</Text>
            </View>
          </TouchableRipple>
        </View>
        <View style={styles.box}>
          <TouchableRipple onPress={() => {}}>
            <View style={styles.menuItem}>
              <Icon2 name="logout" color="#FF6347" size={25} />
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
    padding: 5,
    backgroundColor: '#f3f4f6',
    borderRadius: 15,
    marginHorizontal: 15,
    marginVertical: 5,
    color: 'black',
  },
  profile: {
    backgroundColor: COLORS.lightblue,
    borderRadius: 15,
    marginVertical: 10,
    marginHorizontal: 15,
    shadowColor: 'gray',
    elevation: 20,
  },
  headerTitle: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: 23,
  },
  userInfoSection: {
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: '500',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  infoBoxWrapper: {
    borderBottomColor: '#dddddd',
    borderBottomWidth: 1,
    borderTopColor: '#dddddd',
    borderTopWidth: 1,
    flexDirection: 'row',
    height: 100,
  },
  infoBox: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuItem: {
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  menuItemText: {
    color: '#777777',
    marginLeft: 20,
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 26,
  },
});

export default UserProfile;
