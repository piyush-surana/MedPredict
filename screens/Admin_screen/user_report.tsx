import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  Text,
  FlatList,
} from 'react-native';
import 'react-native-gesture-handler';
import COLORS from '../../const/color';
import {makeApiRequest} from '../../auth/helpers';
import Snackbar from 'react-native-snackbar';
import {List} from 'react-native-paper';

const User_report: React.FC = ({route, navigation}: any) => {
  const [list, setlist] = useState<any[]>([]);
  const {value} = route.params;

  useEffect(() => {
    collectData();
  }, [value]);

  const collectData = async () => {
    const type = JSON.stringify(value);
    //const data = {type};
    makeApiRequest({
      method: 'post',
      urlPath: 'report1',
    })
      .then(response => {
        if (response.data['status'] == 200) {
          //console.log(response.data.data.result);
          if (response.data.data.status == 200) {
            setlist(response.data.data.result);
            //console.log(list);
            return;
          }
          console.log({resp: response.data.data.status});
          Snackbar.show({
            text: response.data.data.message,
            duration: Snackbar.LENGTH_SHORT,
            textColor: 'white',
            backgroundColor: 'red',
          });
        }
      })
      .catch(error => {
        console.log('Error in api', error);
        Snackbar.show({
          text: 'Internal error',
          duration: Snackbar.LENGTH_SHORT,
          textColor: 'white',
          backgroundColor: 'red',
        });
      });
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.white}}>
      {/* //<ScrollView showsVerticalScrollIndicator={false}> */}
      <View
        style={{
          backgroundColor: COLORS.primary,
          height: 65,
          padding: 15,
        }}>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <Text style={style.headerTitle}>Your Health, Your Way</Text>
        </View>
      </View>
      <View>
        <View style={{margin: 20}}>
          <Text style={{color: COLORS.dark, fontWeight: 'bold', fontSize: 18,marginBottom:15}}>
            Total Number of Patients  {list.length}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              padding: 10,
              backgroundColor:COLORS.lightblue,
            }}>
            <Text style={style.heading}>Name</Text>
            <Text style={style.heading}>Email</Text>
            <Text style={style.heading}>Password</Text>
          </View>
          <FlatList
            data={list}
            renderItem={({item, index}) => {
              return (
                <View style={style.row}>
                  <View>
                    <Text style={style.cell}>{item.name} </Text>
                  </View>
                  <View>
                    <Text style={style.cell}> {item.email}</Text>
                  </View>
                  <View>
                    <Text style={style.cell}> {item.password}</Text>
                  </View>
                </View>
              );
            }}
            numColumns={1}
          />
        </View>
      </View>
      {/* </ScrollView> */}
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  headerTitle: {
    color: COLORS.white,
    fontFamily: 'Outfit-Bold',
    fontSize: 23,
  },
  userInfoContainer: {
    padding: 10,
  },
  mainCardContainer: {
    alignItems: 'center',
    backgroundColor: COLORS.lightpink,
    borderRadius: 15,
    padding: 20,
    marginVertical: 15,
    marginHorizontal: 20,
    shadowColor: 'gray',
    elevation: 10,
  },
  mainFunction: {
    color: 'black',
    padding: 30,
    fontSize: 20,
    fontFamily: 'Outfit-SemiBold',
  },
  heading:{
    flex:1,
    fontFamily:'Outfit-Medium',
    fontSize:14,
    color: COLORS.dark,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 8,
    marginHorizontal: 2,
    elevation: 1,
    borderRadius: 3,
    borderColor: 'fff',
    padding: 10,
    backgroundColor: COLORS.lightpink,
  },
  cell: {
    fontSize: 14,
    fontFamily: 'Outfit-Regular',
    textAlign: 'left',
    flex: 1,
    color: COLORS.dark,
  },
});

export default User_report;
