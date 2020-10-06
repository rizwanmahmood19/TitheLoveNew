import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity,TextInput,AsyncStorage } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';

export default class AddPaymentMethod extends Component {

  constructor(props) 
  {
    super(props);
    this.state = { 
      
      card_no: null,
      card_holder_name: null,
      expiry_month: null,
      expiry_year: null,
      
    }
  }

  render() {

    const saveCardData = async (id,card_no,card_holder_name,expiry_month,expiry_year) =>{
      console.log("i am in save Card Data ");
      AsyncStorage.setItem(
        'cardData',
        JSON.stringify({
         id:id,
         card_no:card_no,
         card_holder_name:card_holder_name,
         expiry_month:expiry_month,
         expiry_year:expiry_year
        })
      );
      console.log(id + " .... " + card_holder_name);
   };

   const submitCard = async () => {

     const jsonToken = await AsyncStorage.getItem('userData');
     const transformedData = JSON.parse(jsonToken);
     
     const response = await fetch('https://lovechurh.graystork.co/api/credit-card-detail',
       {
         method: 'POST',
         headers: {
           'Accept': 'application/json',
           'Content-Type': 'application/json',
           Authorization: 'Bearer ' + transformedData.token
         },
         body: JSON.stringify({
           'card_holder_name': this.state.card_holder_name,
           'card_no': this.state.card_no,
           'expiry_month':this.state.expiry_month,
           'expiry_year':this.state.expiry_year,
           returnSecureToken: true,
         })
       }
       )
       if (!response.ok) {
        console.log("Something went wrong");
      }
      const resData = await response.json();
      alert(resData.message);
      console.log(resData.message);
      console.log(resData);
      saveCardData(resData.id,resData.card_no,resData.card_holder_name,resData.expiry_month,resData.expiry_year);
      
 };


    return (

    <View style={styles.container}>
      
      <View style={{ flex: 1 ,top:80,alignSelf:'center'}}>

        <View style={styles.holderName}>
        <TextInput
        style={styles.input}
        placeholder="Holder name" 
        keyboardType="default" 
        autoCapitalize="none"
        required 
        errorText="Please enter a valid name!"
        value={this.state.card_holder_name} 
        onChangeText={(value)=>{this.setState({card_holder_name:value})}}
        placeholderTextColor="white"
        returnKeyType="next"
      />

        </View>
        <View style={styles.CardNo}>
        <TextInput
        style={styles.input}
        placeholder="Card number" 
        keyboardType="default" 
        autoCapitalize="none"
        required 
        errorText="Please enter a Card number!" 
        value={this.state.card_no} 
        onChangeText={(value)=>{this.setState({card_no:value})}}
        placeholderTextColor="white"
        returnKeyType="next"
      />
        </View>


        <View style={styles.screen}>
          
          <View style={{ marginHorizontal: 5, width: 180 }}>
            <TextInput
        style={styles.input}
        placeholder="Month (expire. 07)" 
        keyboardType="default" 
        autoCapitalize="none"
        required 
        errorText="Please enter a valid Month !" 
        value={this.state.expiry_month} 
        onChangeText={(value)=>{this.setState({expiry_month:value})}}
        placeholderTextColor="white"
      />
          </View>

          <View style={{ width: 180 }}>
          <TextInput
        style={styles.input}
        placeholder="Year (expire. 2020)" 
        keyboardType="default" 
        autoCapitalize="none"
        required 
        errorText="Please enter a valid Year!" 
        value={this.state.expiry_year} 
        onChangeText={(value)=>{this.setState({expiry_year:value})}}
        placeholderTextColor="white"
      />
          </View>
        
        </View>
        
        <TouchableOpacity style={{alignSelf:'center'}} onPress={submitCard}>
        <LinearGradient colors={["#307AB1", "#307AB1", "#307AB1"]} style={{ padding: 15, marginTop: 10, alignItems: "center", borderRadius: 5, width: 350,}}>
          <Text style={styles.text}>SAVE</Text>
        </LinearGradient>
      </TouchableOpacity>
      
      </View>

    </View>
    
    );
  }
}

AddPaymentMethod.navigationOptions = (navData) => {
  return {
    headerTitle: "Add Card",
  //   headerRight: () => (
  //     <HeaderButtons HeaderButtonComponent={HeaderButton}>
  //       <Item
  //         title="Save"
  //         onPress={() => {
  //           navData.navigation.navigate("PaymentMethod");
  //         }}
  //       />
  //     </HeaderButtons>
  //   ),
   };
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          width:"100%",
          backgroundColor: '#307AB1',
      },
      text:{
        backgroundColor: 'transparent',
        fontSize: 15,
        color: '#FFF',
        fontWeight: "bold",
        alignSelf:'center'
      },
  summary: {
    padding: 100,
    paddingHorizontal:150
  },
  screen: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignSelf: "center",
    borderColor: "#69A0C9",paddingBottom:15
  },
  
  holderName: {
    justifyContent: "space-around",
    width: 365,
    alignSelf: "center",
    borderColor: "#69A0C9",
    bottom: 15,paddingBottom:15
  },
  CardNo: {
    justifyContent: "space-around",
    width: 365,
    alignSelf: "center",
    marginHorizontal: 5,
    borderColor: "#69A0C9",
    bottom: 30,paddingBottom:15,paddingTop:30
  },
  
  input: {
    paddingHorizontal: 5,
    paddingVertical: 5,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  errorContainer: {
    marginVertical: 5
  },
  errorText: {
    fontFamily: 'open-sans',
    color: '#FC5B57',
    fontSize: 13
  }
});
//....................
