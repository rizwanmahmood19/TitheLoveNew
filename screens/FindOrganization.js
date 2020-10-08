
import React,{useState,useEffect} from 'react';
import {View,Text,StyleSheet,TouchableOpacity,KeyboardAvoidingView,Dimensions,TextInput, AsyncStorage} from 'react-native';
import Input from '../components/UI/input';
import { LinearGradient } from 'expo-linear-gradient';
import { add } from 'react-native-reanimated';

const FindOrganization = props => {
  //const [error, setError] = useState();
  const [name,setName]= useState();
  const [zip,setZip] = useState();

// const saveChurchData = async (id,name,address,zipCode,latitude,longitude,latitudeDelta,longitudeDelta) =>{
//    console.log("i am in saveChurchData ");
//    AsyncStorage.setItem(
//      'churchData',
//      JSON.stringify({
//       id:id,
//       name:name,
//       address:address,
//       zipCode:zipCode,
//       latitude:latitude,
//       longitude:longitude,
//       latitudeDelta:latitudeDelta,
//       longitudeDelta:longitudeDelta,
//      })
//    );
// };

const saveChurchData = async (object) =>{
  AsyncStorage.setItem(
    'churchData',
    JSON.stringify(object)
  );
};
// useEffect(() => {
//   if (error) {
//     Alert.alert('An Error Occurred!', error, [{ text: 'Okay' }]);
//   }
// }, [error]); 
  
const search = async ()=>{
    saveChurchData({
      "name":name,
      "zipCode":zip,
    });
    props.navigation.navigate('SearchChurch');
  };

return(
    <View style={styles.container}>
    <Text style={styles.title}>titheLOVE</Text>
        
        <Text style={styles.text1}>Find Your Orgnization to</Text>
        <Text style={styles.text1}> Get Started</Text>

        <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={50}
      style={styles.screen}
    >
        <View style={styles.formControl}>
      <TextInput
        style={styles.input}
        placeholder="Name" 
        keyboardType="default" 
        autoCapitalize='none'
        required 
        errorText="Please enter a valid name." 
        email 
        value={name} 
        onChangeText={(value)=>setName(value)}
        placeholderTextColor="white"
      />
      <TextInput
        style={styles.input}
        placeholder="Zip Code" 
        keyboardType="default" 
        required 
        errorText="Please enter a valid zip code."
        value={zip} 
        onChangeText={(value)=>setZip(value)}
        placeholderTextColor="white"
      />
    </View>
            </KeyboardAvoidingView>

          <TouchableOpacity onPress={search}>
            <LinearGradient colors={['#fff', '#fff', '#fff']} style={{ padding: 15, alignItems: 'center', borderRadius: 5 ,width:250}}>
              <Text style={styles.text}>
                Search
              </Text>
            </LinearGradient>
          </TouchableOpacity>
          
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
      screen: {
        //flex: 1,
        marginBottom:30,
        justifyContent: 'center',
        alignItems: 'center',
        width:250
      },
      title:{
        fontSize:40,
        justifyContent:'center',
        alignItems:'center',
        paddingBottom:100,
        color:"#fff"
      },
      text1:{
        backgroundColor: 'transparent',
        fontSize: 15,
        color: '#fff',
        fontSize:15,
        marginBottom:5
      },
      text:{
        backgroundColor: 'transparent',
        fontSize: 15,
        color: '#307AB1',
        fontWeight: "bold",
      },
      gradient: {
        flex: 1,
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
export default FindOrganization;



