import React, { Component } from "react";
import { View, Text, StyleSheet ,TouchableOpacity,Platform,AsyncStorage} from "react-native";
import Card from "../../components/UI/Card";
import {MaterialIcons,MaterialCommunityIcons} from '@expo/vector-icons';
import Colors from '../../constant/Colors';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../components/UI/HeaderButton';

const Setting = props =>{

  

    return (
      <View style={styles.screen}>
        <View style={{paddingBottom:40}}>
            <TouchableOpacity onPress={()=>{props.navigation.navigate("Account")}}>
          <Card style={styles.summary}>
          <MaterialCommunityIcons name="account" size={50} color={Colors.accent} style={{marginRight:20}} />
          <Text style={styles.text}>Account Setting</Text>
          </Card>
          </TouchableOpacity>
        </View>
        <View>
        <TouchableOpacity onPress={()=>{props.navigation.navigate("Payment")}} >
          <Card style={styles.summary}>
              <MaterialIcons name="payment" size={50} color={Colors.accent} style={{marginRight:20}}  />
              <Text style={styles.text}>Payment Method</Text>
          </Card>
          </TouchableOpacity>
        </View>
      </View>
    );
}

Setting.navigationOptions = navData => {
  const isLogout= async ()=>{
    await AsyncStorage.clear();
    navData.navigation.navigate('Find');
 };
  return {
    headerRight: ()=>(
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Sign out"
          onPress={isLogout}
        />
      </HeaderButtons>
    )
  };
};

const styles = StyleSheet.create({
  screen: {
    margin: 20,
  },
  summary: {
    padding: 20,
    flexDirection:'row',
    
  },
  text:{
    fontSize:23,color:'#616161',top:10
  }
});
export default Setting;