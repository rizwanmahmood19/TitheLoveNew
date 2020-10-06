import React,{Component, useEffect,useState} from "react";
import { View, Text, StyleSheet, AsyncStorage, TouchableOpacity, Platform, FlatList, SafeAreaView, ActivityIndicator } from "react-native";
import { ListItem, Avatar,Icon } from 'react-native-elements'

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
    <View style={{paddingBottom:"10%",flex:1}}>
      {/* <View style={{paddingTop:"2%",paddingBottom:"2%"}}>
      <Text style={{fontSize:25,alignSelf:'center'}}>Search Results</Text>
      </View> */}
    
    {
      jsonData.length > 0 ?
      <View>
  {
    jsonData.map((item, i) => (
      <ListItem key={i} bottomDivider onPress={() => {selectItemHandler(item.id)}} >
        <ListItem.Content>
          <ListItem.Title>{item.name}</ListItem.Title>
          <ListItem.Subtitle >{item.address}</ListItem.Subtitle>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
    ))
  }
</View>
      : null
    }

    </View>
  );

};


SearchChurchData.navigationOptions = navData => {
  return {
      headerTitle: 'Search Results',
  };
};


const styles = StyleSheet.create({
  container: {
    height: 280,
  },
  map: {
    height: 250,
  },  
  item: {  
      padding: 10,  
      fontSize: 18,  
      height: 44,  
  },  
  text:{
    // backgroundColor: 'transparent',
    // fontSize: 15,
    // color: 'black',
    // fontWeight: "bold",
    alignSelf:'center'
  },
});
export default SearchChurchData;


