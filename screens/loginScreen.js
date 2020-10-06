import React ,{useState ,useEffect, useReducer, useCallback }from 'react';
import {AsyncStorage ,Text,View,KeyboardAvoidingView,Alert,StyleSheet, TouchableOpacity,ActivityIndicator} from 'react-native';
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

const LoginScreen = props => {

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

const saveDataToStorage = (token) =>
{
  //console.log("login token :  " + token);
  AsyncStorage.setItem(
    'userData',
    JSON.stringify({
      token : token
    })
  );
};

useEffect(() => {
  if (error) {
    Alert.alert('An Error Occurred!', error, [{ text: 'Okay' }]);
  }
}, [error]); 

const [formState, dispatchFormState] = useReducer(formReducer, {
  inputValues: {
    email: '',
    password: '',
    //role: '',
    
  },
  inputValidities: {
    email: false,
    password: false,
    //role: false,
  },
  formIsValid: false
});

useEffect(() => {
  if (error) {
    Alert.alert('An Error Occurred!', error, [{ text: 'Okay' }]);
  }
}, [error]);

const authHandler = async () => {
  const response = await fetch('https://lovechurh.graystork.co/api/login-user',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              "email":formState.inputValues.email, 
              "password":formState.inputValues.password
            })
          });

          if (!response.ok) {
            
            const errorResData = await response.json();
            const errorId = errorResData.message.body;
            
            Alert.alert('Invalid!', errorId, [{ text: 'Okay' }]);
            
          }
          else{
            
  setError(null);
  setIsLoading(true);

  try {
        const resData = await response.json();
        props.navigation.navigate('Welcome');
        saveDataToStorage(resData.message.token);
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
    <LinearGradient colors={['rgba(0,0,0,0)', 'transparent']} style={{position: 'absolute',left: 0,right: 0,top: 0,height: 200,}}/>

    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={50}
      style={styles.screen}
    >
    <Text style={styles.title}>titheLOVE</Text>

    <View style={styles.formControl}>
        <Input
              id="email"
              label="E-Mail"
              keyboardType="email-address"
              required
              email
              autoCapitalize="none"
              errorText="Please enter a valid email address."
              onInputChange={inputChangeHandler}
              initialValue=""
        />
        <Input
              id="password"
              label="Password"
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

<TouchableOpacity onPress={authHandler}>
<LinearGradient colors={['#fff', '#fff', '#fff']} style={{ padding: 15,marginTop:20, alignItems: 'center', borderRadius: 5 ,width:250}}
        // Button Linear Gradient
        >
          <Text style={styles.text}>
            Sign in
          </Text>
          </LinearGradient>
          </TouchableOpacity>

        <TouchableOpacity >
                <Text style={{color:'#ffff',marginTop:25}}>Forget Password ?</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>{props.navigation.navigate('Signin')}} >
                <Text style={{color:'#ffff',marginTop:15}}>or Create an Account </Text>
        </TouchableOpacity>
    </KeyboardAvoidingView>
    </View>
  );
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
    color: '#307AB1',
    fontWeight: "bold",
  },
  title:{
    fontSize:40,
    justifyContent:'center',
    alignItems:'center',
    paddingBottom:100,
    color:"#fff"
  },
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width:250
  },
  gradient: {
    flex: 1,
  },
  
  authContainer: {
    width: '80%',
    maxWidth: 400,
    maxHeight: 400,
    padding: 20
  },
  buttonContainer: {
    marginTop: 10
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

export default LoginScreen;

