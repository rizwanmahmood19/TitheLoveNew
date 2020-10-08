import React, { Component,useState,useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity,AsyncStorage,ActivityIndicator } from "react-native";
import MapView,{PROVIDER_GOOGLE,Marker,Callout} from "react-native-maps";
import { LinearGradient } from 'expo-linear-gradient';

const WelcomeScreen = (props) => {
  const [date, setData] = useState();
  const [isLoading, setisLoading] = useState(true);

useEffect(() => {
  
  async function fetchData() {
  
  try {

    const churchid = await AsyncStorage.getItem('productid');
    const transformedDataid = JSON.parse(churchid);
    
    console.log("Produt id : "+transformedDataid);

    const jsonToken = await AsyncStorage.getItem("userData");
    const transformedDatatoken = JSON.parse(jsonToken);
    console.log(transformedDatatoken);

    fetch(`https://lovechurh.graystork.co/api/church_list_detail/${transformedDataid}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + transformedDatatoken.token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setisLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    
  } 
  catch(e) {
    console.log(e.error)
  }
}
fetchData();
}, []);

  const latitudeDelta = 0.09;
  const longitudeDelta = 0.0921;

  if(isLoading){
    return(
        <View style={{flex:1,alignItems:'center',justifyContent:'center'}} >
            <ActivityIndicator/>
        </View>
    );
  }
  
  return (
    <View>
      
      <View style={styles.container}>
        <MapView provider={PROVIDER_GOOGLE} style={styles.map} initialRegion={{ "latitude": parseFloat(date.latitude), "longitude": parseFloat(date.longitude) ,latitudeDelta,longitudeDelta}} >

        <Marker coordinate={{ "latitude": parseFloat(date.latitude), "longitude": parseFloat(date.longitude) }} title={'First Baptist Church'}  >
             <Callout><Text>{date.address}</Text></Callout>
        </Marker>

        </MapView>
      </View>

      <Text style={{fontWeight: "bold",fontSize: 30,color: "#307AB1",paddingHorizontal: 20,}}>
           {date.name} 
      </Text>

      <Text style={{ fontSize: 15, padding: 20, bottom: 20 }}>
        {date.address}
      </Text>

      <TouchableOpacity style={{alignSelf:'center'}} onPress={() => { this.props.navigation.navigate("Donation");}}>
        <LinearGradient colors={["#307AB1", "#307AB1", "#307AB1"]} style={{ padding: 15, marginTop: 20,alignItems: "center",borderRadius: 5,width: 200,}}>
          <Text style={styles.text}>Give Now</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );

};

const styles = StyleSheet.create({
  container: {
    height: 280,
  },
  map: {
    height: 250,
  },
  text:{
    backgroundColor: 'transparent',
    fontSize: 15,
    color: '#FFF',
    fontWeight: "bold",
    alignSelf:'center'
  },
});
export default WelcomeScreen;

