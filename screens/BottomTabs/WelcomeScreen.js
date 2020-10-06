import React, { Component,useState,useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity,AsyncStorage } from "react-native";
import MapView,{PROVIDER_GOOGLE,Marker,Callout} from "react-native-maps";
import { LinearGradient } from 'expo-linear-gradient';

const WelcomeScreen = (props) => {
  const [jsonData, setjsonData] = useState({});

  // const productId = props.navigation.getParam('productId');
  // console.log("first hello  : " + `${productId}`);

useEffect(() => {
  
  async function fetchData() {
  
  try {
    

    const churchData = await AsyncStorage.getItem('WelData');
    const transformedData = JSON.parse(churchData);
    setjsonData(transformedData);

    const churchid = await AsyncStorage.getItem('productid');
    const transformedDataid = JSON.parse(churchid);
    
    console.log("Produt id : "+transformedDataid);
    
  } 
  catch(e) {
    console.log(e.error)
  }
}
fetchData();
}, []);
  const latitude= 35.437390;
  const longitude= -94.348993;
  const latitudeDelta = 0.09;
  const longitudeDelta = 0.0921;

  //console.log("json object1 : "+jsonData);
  return (
    <View>
      
      <View style={styles.container}>
        <MapView provider={PROVIDER_GOOGLE} style={styles.map} initialRegion={{latitude: latitude,longitude: longitude,latitudeDelta: latitudeDelta,longitudeDelta: longitudeDelta}} >

        <Marker coordinate={{ latitude: 35.437390,longitude: -94.348993,latitudeDelta : 0.09,longitudeDelta: 0.0921 }} title={'First Baptist Church'}  >
            {/* <Callout><Text>{jsonData.address}</Text></Callout>  */}
        </Marker>

        </MapView>
      </View>

      <Text style={{fontWeight: "bold",fontSize: 30,color: "#307AB1",paddingHorizontal: 20,}}>
          {/* {jsonData.name}   */}
          {/* {productId.id} */}
      </Text>

      <Text style={{ fontSize: 15, padding: 20, bottom: 20 }}>
        {/* {jsonData.address}  */}
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

