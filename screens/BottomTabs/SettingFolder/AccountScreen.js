import React,{Component,useState, useReducer, useEffect,useCallback} from "react";
import { View, Text, StyleSheet, TouchableOpacity,TextInput ,AsyncStorage,Alert} from "react-native";
import Input from "../../../components/UI/input";
import { LinearGradient } from "expo-linear-gradient";
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../../components/UI/HeaderButton';
const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid
    };
    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }
    return {
      formIsValid: updatedFormIsValid,
      inputValidities: updatedValidities,
      inputValues: updatedValues
    };
  }
  return state;
};


const AccountScreen = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();


  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      fistName: '',
      lastName: '',
      address: '',
      zipCode: '',
      password: '',
      confirmPassword: '',
      
    },
    inputValidities: {
      fistName: false,
      lastName: false,
      address: false,
      zipCode: false,
      password: false,
      confirmPassword: false,

    },
    formIsValid: false
  });
  
  useEffect(() => {
    if (error) {
      Alert.alert('An Error Occurred!', error, [{ text: 'Okay' }]);
    }
  }, [error]);
  

  const update = async () => {
    
     const jsonToken = await AsyncStorage.getItem('userData');
     const transformedData = JSON.parse(jsonToken);
     //console.log(transformedData);
     const response = await fetch('https://lovechurh.graystork.co/api/update',
       {
        method: 'POST',
         headers: {
           'Accept': 'application/json',
           'Content-Type': 'application/json',
           Authorization: 'Bearer ' + transformedData.token
         },
         body: JSON.stringify({
          'firstname': formState.inputValues.fistName,
          'lastname': formState.inputValues.lastName,
          'address': formState.inputValues.address,
          'zipcode': formState.inputValues.zipCode,
          "password": formState.inputValues.password,
          'password_confirmation': formState.inputValues.confirmPassword,
          returnSecureToken: true
        })
       })
       
      if (!response.ok) {
        console.log("Something went wrong");
        //const errorResData = await response.json();
        //const errorId = errorResData.validation_errors.email;

        //Alert.alert('Invalid!', errorId, [{ text: 'Okay' }]);
        //throw new Error(message);
      }
      const resData = await response.json();

      Alert.alert('', resData.message, [{ text: 'Ok' }]);
      
 };

const inputChangeHandler = useCallback(
  (inputIdentifier, inputValue, inputValidity) => {
    dispatchFormState({
      type: FORM_INPUT_UPDATE,
      value: inputValue,
      isValid: inputValidity,
      input: inputIdentifier
    });
  },
  [dispatchFormState]
);
  

    return (
      <View style={styles.container}>
        <View style={{ flex: 1 ,top:15}}>
          <Text style={{ fontSize: 20,color: "#fff",fontFamily: "open-sans-bold",alignSelf: "center",top: 10,paddingBottom:10}}>
            Personal Information
          </Text>
  
          <View style={styles.screen}>
  
            <View style={{ marginHorizontal: 5, width: 180 }}>
            <Input
              id="fistName"
              //label="Address"
              keyboardType="email-address"
              placeholder="first name" 
              required
              autoCapitalize="none"
              errorText="Please enter a valid first name!" 
              onInputChange={inputChangeHandler}
              initialValue=""
            />
            </View>
  
            <View style={{ width: 180 }}>
            <Input
              id="lastName"
              //label="Address"
              keyboardType="email-address"
              placeholder="last name" 
              required
              autoCapitalize="none"
              errorText="Please enter a valid last name!" 
              onInputChange={inputChangeHandler}
              initialValue=""
            />
            </View>
          
          </View>
          <View style={styles.address}>
          <Input
              id="address"
              //label="Address"
              keyboardType="email-address"
              placeholder="address" 
              required
              autoCapitalize="none"
              errorText="Please enter a valid address!" 
              onInputChange={inputChangeHandler}
              initialValue=""
            />
  
          </View>
          <View style={styles.zipcode}>
          <Input
              id="zipCode"
              //label="Zip"
              keyboardType="email-address"
              placeholder="zipcode" 
              required
              autoCapitalize="none"
              errorText="Please enter a valid zipcode!" 
              onInputChange={inputChangeHandler}
              initialValue=""
            />
          </View>
        
        </View>
  
        <View style={{ flex: 1, top: 17 }}>
  
          <Text style={{ fontSize: 20,color: "#fff",fontFamily: "open-sans-bold",alignSelf: "center"}}>
            Account Details
          </Text>
          
          <View style={styles.password}>
            <View style={{ marginHorizontal: 5, width: 180 }}>
            <Input
              id="password"
              //label="Password"
              placeholder="password" 
              keyboardType="default"
              secureTextEntry
              required
              minLength={5}
              autoCapitalize="none"
              errorText="Please enter a valid password."
              onInputChange={inputChangeHandler}
              initialValue=""
            />
            </View>
  
            <View style={{ width: 180 }}>
            <Input
              id="confirmPassword"
              //label="Confirm Password"
              placeholder="confirm password" 
              keyboardType="default"
              secureTextEntry
              required
              minLength={5}
              autoCapitalize="none"
              errorText="Please enter a valid confirm password."
              onInputChange={inputChangeHandler}
              initialValue=""
            />
            </View>
          </View>
       
        </View>
  
        <View style={{ flex: 1, bottom: 20 }}>
  
          <TouchableOpacity onPress={ update } style={{alignSelf:'center',top:15}}>
          <LinearGradient colors={["#fff", "#fff", "#fff"]} style={{ padding: 15,marginTop: 20,alignItems: "center",borderRadius: 5,width: 250,}}>
            <Text style={styles.text}>SAVE</Text>
          </LinearGradient>
        </TouchableOpacity>
        </View>
      
      </View>
    );
  };

AccountScreen.navigationOptions = navData => {
    return {
      headerTitle: 'Account Details',
      // headerRight: ()=>(
      //   <HeaderButtons HeaderButtonComponent={HeaderButton}>
      //     <Item
      //       title="Save"
      //       onPress={() => {
      //         navData.update
      //       }}
      //     />
      //   </HeaderButtons>
      // )
    };
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: "100%",
      backgroundColor: "#307AB1",
    },
    screen: {
      justifyContent: "space-between",
      flexDirection: "row",
      alignSelf: "center",
      borderColor: "#69A0C9",paddingBottom:15
    },
    password: {
      justifyContent: "space-between",
      flexDirection: "row",
      alignSelf: "center",
      borderColor: "#69A0C9",
      bottom: 15,paddingBottom:15,paddingTop:15
    },
    address: {
      justifyContent: "space-around",
      width: 365,
      alignSelf: "center",
      borderColor: "#69A0C9",
      bottom: 15,paddingBottom:15
    },
    email: {
      justifyContent: "space-around",
      width: 365,
      alignSelf: "center",
      borderColor: "#69A0C9",
      bottom: 5,paddingBottom:15
    },
    zipcode: {
      justifyContent: "space-around",
      width: 365,
      alignSelf: "center",
      marginHorizontal: 5,
      borderColor: "#69A0C9",
      bottom: 30,paddingBottom:15
    },
    text:{
      backgroundColor: 'transparent',
      fontSize: 15,
      color: '#307AB1',
      fontWeight: "bold",
    },
    formControl: {
      width: '100%'
    },
    label: {
      fontFamily: 'open-sans-bold',
      marginVertical: 8,
      color:"black"
    },
    input: {
      paddingHorizontal: 5,
      paddingVertical: 5,
      borderBottomColor: '#ccc',
      borderBottomWidth: 1
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
export default AccountScreen;