import React,{useState, useReducer, useEffect,useCallback } from "react";
import { View, Text, StyleSheet, TouchableOpacity,AsyncStorage ,TextInput,Alert} from "react-native";
import Input from '../components/UI/input';
import { LinearGradient } from 'expo-linear-gradient';
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

const SignInScreen = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();


const [formState, dispatchFormState] = useReducer(formReducer, {
  inputValues: {
    fistName: '',
    lastName: '',
    address: '',
    zipCode: '',
    email: '',
    password: '',
    confirmPassword: '',
    pin: '',
    
  },
  inputValidities: {
    fistName: false,
    lastName: false,
    address: false,
    zipCode: false,
    email: false,
    password: false,
    confirmPassword: false,
    pin: false,
  },
  formIsValid: false
});

useEffect(() => {
  if (error) {
    Alert.alert('An Error Occurred!', error, [{ text: 'Okay' }]);
  }
}, [error]);

const signup = async () => {
  const response = await fetch('https://lovechurh.graystork.co/api/register-user',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            'first_name': formState.inputValues.fistName,
            'last_name': formState.inputValues.lastName,
            'address': formState.inputValues.address,
            'zipCode': formState.inputValues.zipCode,
            "email": formState.inputValues.email, 
            "password": formState.inputValues.password,
            'password_confirmation': formState.inputValues.confirmPassword,
            'pin':formState.inputValues.pin,
            returnSecureToken: true
          })
        }
      );
          
          if (!response.ok) {
            const errorResData = await response.json();
            const errorId = errorResData.validation_errors.email;

            Alert.alert('Invalid!', errorId, [{ text: 'Okay' }]);
            throw new Error(message);
          }
          else{
  setError(null);
  setIsLoading(true);

  try {
        const resData = await response.json();
        props.navigation.navigate('Login');
        console.log(" Sign Up " + resData.message);
        
        Alert.alert('Registered!', resData.message, [{ text: 'Okay' }]);
      } 
  catch (err) {
    setError(err.message);
    setIsLoading(false);
  }

          }

  
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
        <View style={styles.email}>
        <Input
              id="email"
              //label="E-Mail"
              placeholder="Email" 
              keyboardType="email-address"
              required
              email
              autoCapitalize="none"
              errorText="Please enter a valid email address."
              onInputChange={inputChangeHandler}
              initialValue=""
            />
            
        </View>
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
        <Text style={{ fontSize: 20,color: "#fff",fontFamily: "open-sans-bold",alignSelf: "center"}}>
          Security
        </Text>
        <View style={styles.screen}>
          <View style={{ marginHorizontal: 5, width: 180 }}>
          <Input
              id="pin"
              //label="Pin"
              placeholder="pin" 
              keyboardType="default"
              secureTextEntry
              required
              minLength={3}
              autoCapitalize="none"
              errorText="Please enter a valid pin."
              onInputChange={inputChangeHandler}
              initialValue=""
            />
          </View>

          <View style={{ width: 180 }}>
          <Input
              id="confirm pin"
              //label="Confirm Pin"
              placeholder="confirm pin" 
              keyboardType="default"
              secureTextEntry
              required
              minLength={3}
              autoCapitalize="none"
              errorText="Please enter a confirm pin."
              onInputChange={inputChangeHandler}
              initialValue=""
            />
          </View>
        </View>

        <TouchableOpacity onPress={ signup } style={{alignSelf:'center',top:15}}>
          <LinearGradient colors={["#fff", "#fff", "#fff"]} style={{ padding: 15,marginTop: 20,alignItems: "center",borderRadius: 5,width: 250,}}>
            <Text style={styles.text}>Create Account</Text>
          </LinearGradient>
        </TouchableOpacity>

      </View>
    </View>
  );
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
    bottom: 15,paddingBottom:15
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
export default SignInScreen;

