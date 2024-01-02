import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
  Text,
  TextInput,
  ImageBackground,
  FlatList,
  Dimensions,
  TouchableOpacity,
  ImageBase,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../const/color';
import places from '../const/places';
import App from '../App';
import {Image} from 'react-native-svg';

interface Place {
  name: string;
  image: any; // Update the type based on your image data type
  location: string;
  details: string;
}

const {width} = Dimensions.get('screen');

const HomeScreen: React.FC<{navigation: any}> = ({navigation}) => {
  const categoryIcons = [
    <Icon name="person" size={25} color={COLORS.dark} />,
    <Icon name="calendar-month" size={25} color={COLORS.dark} />,
    <Icon name="payment" size={25} color={COLORS.dark} />,
    <Icon name="place" size={25} color={COLORS.dark} />,
  ];

  const ListCategories: React.FC = () => {
    return (
      <View style={style.categoryContainer}>
        {categoryIcons.map((icon, index) => (
          <View key={index} style={style.iconContainer}>
            {icon}
          </View>
        ))}
      </View>
    );
  };

  const Card: React.FC<{place: Place}> = ({place}) => {
    return (
      <TouchableOpacity activeOpacity={0.8} onPress={() => {}}>
        <ImageBackground style={style.cardImage} source={place.image}>
          <Text
            style={{
              color: COLORS.dark,
              fontSize: 20,
              fontWeight: 'bold',
              marginTop: 10,
            }}>
            {place.name}
          </Text>
        </ImageBackground>
      </TouchableOpacity>
    );
  };

  const UserProfileCard: React.FC = () => {
    return (
      <View style={style.userProfileCardContainer}>
        <View style={style.userProfileImageContainer}>
        <Icon name="person" size={25} color={COLORS.dark} />
        </View>
        <View style={style.userInfoContainer}>
          <Text style={style.userName}>John Doe</Text>
          <Text style={style.userRole}>Software Developer</Text>
        </View>
      </View>
    );
  };

  const RecommendedCard: React.FC = () => {
    return (
      <ImageBackground
        style={style.rmCardImage}
        source={require('../assets/images/login_banner.png')}>
        <Text
          style={{
            color: COLORS.dark,
            fontSize: 22,
            fontWeight: 'bold',
            marginTop: 10,
          }}>
          Symptom Questionnaire
        </Text>
      </ImageBackground>
    );
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.white}}>
      <StatusBar translucent={false} backgroundColor={COLORS.primary} />
      <View style={style.header}>
        <Icon name="menu" size={28} color={COLORS.white} />
        <Icon name="notifications-none" size={28} color={COLORS.white} />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            backgroundColor: COLORS.primary,
            height: 50,
            paddingHorizontal: 20,
          }}>
          <View style={{flex: 1}}>
            <Text style={style.headerTitle}>Your Health, Your Way</Text>
          </View>
        </View>
        <ListCategories />
        <View>
          <UserProfileCard />
          <RecommendedCard />
          <Text style={style.sectionTitle}>Suggestion</Text>
          <FlatList
            contentContainerStyle={{paddingLeft: 20}}
            horizontal
            showsHorizontalScrollIndicator={false}
            data={places} // Make sure to import and provide the actual data
            renderItem={({item}) => <Card place={item} />}
          />
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
  categoryContainer: {
    marginTop: 25,
    marginHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 25,
  },
  iconContainer: {
    height: 60,
    width: 60,
    backgroundColor: COLORS.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  sectionTitle: {
    marginHorizontal: 20,
    marginVertical: 10,
    fontWeight: 'bold',
    fontSize: 20,
    color: COLORS.grey,
  },
  cardImage: {
    height: 180,
    width: width / 2,
    marginRight: 20,
    padding: 10,
    overflow: 'hidden',
    borderRadius: 10,
    shadowColor: COLORS.grey,
    elevation: 5,
  },
  rmCardImage: {
    width: width - 70,
    height: 200,
    marginTop: 10,
    marginLeft: 45,
    borderRadius: 20,
    padding: 10,
    shadowColor: 'gray',
    elevation: 8,
  },
  userProfileCardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    margin: 20,
    shadowColor: 'gray',
    elevation: 8,
  },
  userProfileImageContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    padding:20, // Make it circular
    overflow: 'hidden',
  },
  userProfileImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  userInfoContainer: {
    padding: 20,
  },
  userName: {
    color: '#333',
    fontSize: 24,
    fontWeight: 'bold',
  },
  userRole: {
    color: '#555',
    fontSize: 16,
    marginTop: 5,
  },
});

export default HomeScreen;
