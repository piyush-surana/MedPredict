import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  StyleSheet,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import COLORS from '../../const/color';
import Personal from './Doc_personal';
import Proff from './Doc_proff';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Switch} from 'react-native-switch';

const Doctor_EditProfile: React.FC = ({navigation}: any) => {
  const [isDark, setDark] = useState(true);
  const toggleSwitch2 = () => setDark(previousState => !previousState);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
      }}>
      <View
        style={{
          backgroundColor: COLORS.primary,
          height: 70,
          padding: 10,
        }}>
        <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
          <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon
                name="chevron-left"
                size={18}
                color={COLORS.white}
                style={{padding: 15}}></Icon>
            </TouchableOpacity>
          </View>
          <Text style={style.headerTitle}>Your Health, Your Way</Text>
        </View>
      </View>

      <ScrollView>
        <View
          style={{
            alignItems: 'center',
            marginVertical: 10,
          }}>
          <TouchableOpacity
            onPress={() => {}}
            style={{
              backgroundColor: COLORS.yellow,
              borderRadius: 85,
            }}>
            <Image
              source={require('../../assets/images/avatar.png')}
              style={{
                height: 120,
                width: 120,
                borderRadius: 85,
                borderWidth: 2,
                borderColor: COLORS.primary,
              }}
            />
          </TouchableOpacity>
        </View>
        <View style={{paddingVertical: 10, alignItems: 'center'}}>
          <Switch
            activeTextStyle={{
              fontFamily: 'OutFit-Bold',
              fontSize: 22,
              color: COLORS.dark,
            }}
            inactiveTextStyle={{
              fontFamily: 'OutFit-Bold',
              fontSize: 22,
              color: COLORS.dark,
            }}
            value={isDark}
            onValueChange={toggleSwitch2}
            activeText={'Personal'}
            inActiveText={'Proffessional'}
            circleSize={35}
            barHeight={45}
            backgroundActive={COLORS.yellow}
            backgroundInactive={COLORS.yellow}
            circleActiveColor={COLORS.primary}
            circleInActiveColor={COLORS.primary} // custom component to render inside the Switch circle (Text, Image, etc.)
            changeValueImmediately={true} // if rendering inside circle, change state immediately or wait for animation to complete
            renderActiveText={true}
            renderInActiveText={true}
            switchLeftPx={30} // denominator for logic when sliding to TRUE position. Higher number = more space from RIGHT of the circle to END of the slider
            switchRightPx={60} // denominator for logic when sliding to FALSE position. Higher number = more space from LEFT of the circle to BEGINNING of the slider
            switchWidthMultiplier={5.5} // multiplied by the `circleSize` prop to calculate total width of the Switch
          />
        </View>
        {isDark ? <Personal /> : <Proff />}
      </ScrollView>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  headerTitle: {
    color: COLORS.white,
    fontFamily: 'Outfit-Bold',
    fontSize: 23,
    paddingLeft: 10,
  },
});

export default Doctor_EditProfile;
