import React from 'react';
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
import COLORS from '../const/color';

const {width} = Dimensions.get('screen');

const HomeScreen: React.FC<{navigation: any}> = ({navigation}) => {
  // const categoryIcons = [
  //   <Icon name="person" size={25} color={COLORS.dark} />,
  //   <Icon name="calendar-month" size={25} color={COLORS.dark} />,
  //   <Icon name="payment" size={25} color={COLORS.dark} />,
  //   <Icon name="place" size={25} color={COLORS.dark} />,
  // ];

  // const ListCategories: React.FC = () => {
  //   return (
  //     <View style={style.categoryContainer}>
  //       {categoryIcons.map((icon, index) => (
  //         <View key={index} style={style.iconContainer}>
  //           {icon}
  //         </View>
  //       ))}
  //     </View>
  //   );
  // };

  const UserProfileCard: React.FC = () => {
    return (
      <View style={style.userProfileCardContainer}>
        <View style={style.userProfileImageContainer}>
          <Image
            source={require('../assets/images/avatar.png')}
            style={{height: 90, width: 60}}
          />
        </View>
        <View style={style.userInfoContainer}>
          <Text style={style.userName}>John Doe</Text>
          <Text style={style.userRole}>John_deo@gmail.com</Text>
        </View>
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
          <UserProfileCard />
          <Text style={style.sectionTitle}>Suggestion</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  // The existing styles remain the same
  header: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: COLORS.primary,
  },
  headerTitle: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: 23,
  },
  sectionTitle: {
    marginHorizontal: 20,
    marginVertical: 10,
    fontWeight: 'bold',
    fontSize: 20,
    color: 'gray',
  },
  userProfileCardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#BBE7FE',
    borderRadius: 10,
    overflow: 'hidden',
    margin: 20,
    shadowColor: 'gray',
    elevation: 40,
  },
  userProfileImageContainer: {
    width: 100,
    height: 100,
    borderRadius: 30,
    padding: 20,
    margin: 15, // Make it circular
    overflow: 'hidden',
    backgroundColor: 'yellow',
  },
  userInfoContainer: {
    padding: 10,
  },
  userName: {
    color: 'black',
    fontSize: 24,
    fontWeight: 'bold',
  },
  userRole: {
    color: 'gray',
    fontSize: 16,
  },
});

export default HomeScreen;
