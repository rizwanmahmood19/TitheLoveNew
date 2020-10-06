import React,{Component, useEffect,useState} from "react";
import { View, Text, StyleSheet, AsyncStorage, TouchableOpacity, Platform, FlatList, SafeAreaView, ActivityIndicator } from "react-native";

const SearchChurchData = (props) => {
    const [jsonData, setjsonData] = useState([]);

    const saveChurchData = async (object) =>{
        AsyncStorage.setItem(
          'WelData',
          JSON.stringify(object)
        );
      };

  useEffect(() => {

    async function fetchData() {
    try {
      const churchData = await AsyncStorage.getItem('churchData');
      console.log("church : " + churchData)
    const response = await fetch('https://lovechurh.graystork.co/api/search-church',
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: churchData
            });
              
              const resData = await response.json();
              if (jsonData.length == 0){
                setjsonData(resData.data);
                saveChurchData( resData.data );
              }
            
        } 
    catch(e) {
      console.log("error : " + e.error)
    }
  }
  fetchData();
  }, []);
  
    const selectItemHandler = (id) => { props.navigation.navigate('Login', 
    { productId: id,});
     console.log(id);
     AsyncStorage.setItem(
        'productid',
        JSON.stringify(id)
      );
    };
      
  return (
    <View style={{paddingBottom:"10%"}}>
      <View style={{paddingTop:"2%",paddingBottom:"2%"}}>
      <Text style={{fontSize:25,alignSelf:'center'}}>Churches Details</Text>
      </View>
    
    {
      jsonData.length > 0 ?
      <FlatList
      data={jsonData}
      renderItem={({ item }) => {
        return (
            
          <View key={item.id.toString()} style={styles.contaier}>
            
            
              <TouchableOpacity onPress={() => {selectItemHandler(item.id)}} >
                <Text style={styles.text}>Name : {item.name}</Text>
                <Text style={styles.text}>Address : {item.address}</Text>
                <Text style={styles.text}>Zip Code : {item.zipCode}</Text>
                
              </TouchableOpacity>
              
          </View>
        );
      }}
      keyExtractor={item => item.id.toString()}
    />
      : null
    }

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
    color: 'black',
    fontWeight: "bold",
    alignSelf:'center'
  },
});
export default SearchChurchData;


