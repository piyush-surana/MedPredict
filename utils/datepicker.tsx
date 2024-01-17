import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import COLORS from '../const/color';

const DatePicker = () => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [date, setDate] = useState('');

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: any) => {
    const date1=new Date(date);
    setDate(date1.toDateString());
    storeData(date1.toString);
    hideDatePicker();
  };

  const storeData=async(value: any)=>{
    try{
      // await AsyncStorage.removeItem('body')
      await AsyncStorage.setItem('dob',value);
    }catch(e){
      console.log(e);
    }
  }

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
      }}>
      <View
        style={{
          paddingHorizontal: 10,
          backgroundColor: '#f3f4f6',
          borderRadius: 15,
          margin: 10,
        }}>
        <TextInput
          style={{color: 'black',paddingRight:10,width:270}}
          placeholder="Select date"
          value={date}
          placeholderTextColor={COLORS.grey}
          editable={false}></TextInput>
      </View>
      <TouchableOpacity onPress={showDatePicker}>
        <Icon name={'calendar'} size={20} color="black" style={{padding: 20}} />
      </TouchableOpacity>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </View>
  );
};

export default DatePicker;
