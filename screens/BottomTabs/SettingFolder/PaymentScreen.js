import React, { Component } from 'react'
import { View ,Text,StyleSheet} from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../../components/UI/HeaderButton';

const PaymentScreen = props => {
    
        return (
            <View style={styles.container}><Text style={{color:'#616161',fontSize:25}}>No Payment methods found</Text></View>
        )
    
};
PaymentScreen.navigationOptions = navData => {
    return {
      headerRight: ()=>(
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            
            iconName={"plus"}
            onPress={() => {
                navData.navigation.navigate("PaymentMethod");
            }}
          />
        </HeaderButtons>
      )
    };
  };
const styles = StyleSheet.create({
    container: {
        flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          width:"100%",
      },
});
export default PaymentScreen;
