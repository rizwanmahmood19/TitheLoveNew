import React,{useEffect,useState} from "react";
import {
  View,
  Text,
  StyleSheet,
  AsyncStorage,
  TouchableOpacity,
  Platform,
  FlatList,SafeAreaView,ActivityIndicator
} from "react-native";
import {heightPercentageToDP as hp, widthPercentageToDP as wp,} from '../../components/ResponsiveLayout';

import Card from "../../components/UI/Card";
import { LinearGradient } from "expo-linear-gradient";

const Recurring = (props) => {
  const [date, setData] = useState();
  const [isLoading, setisLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const jsonToken = await AsyncStorage.getItem('userData');
  const transformedData = JSON.parse(jsonToken);
      //console.log(transformedData);

      fetch("https://lovechurh.graystork.co/api/view-recurring-gifts-details", {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: 'Bearer ' + transformedData.token
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setData(data.data);
          setisLoading(false);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
    fetchData();
  }, []);

  if(isLoading){
    return(
        <View style={{flex:1,alignItems:'center',justifyContent:'center'}} >
            <ActivityIndicator/>
        </View>
    );
}
  if (!isLoading && date.length === 0) {
    return (
      <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
        <Text>No recurring gifts details found!</Text>
      </View>
    );
  }

  return (
    <View style={{paddingBottom:"10%"}}>
      <View style={{paddingTop:"2%",paddingBottom:"2%"}}>
      <Text style={{fontSize:25,alignSelf:'center'}}>Recurring Gift Details</Text>
      <Text style={{fontSize:13,color:"#616161",left:20,alignSelf:'center'}}>You can edit your recurring gift anytime.</Text>
      </View>
    
    <FlatList
      data={date}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => {
        return (
            
          <View key={item.id} style={styles.contaier}>
            
            <Card style={styles.summary}>
              <SafeAreaView >
              
                <Text style={styles.text}>Frequency : {item.frequency}</Text>
                <Text style={styles.text}>How many gifts : {item.no_of_months}</Text>
                <Text style={styles.text}>Start Date : {item.start_date}</Text>
                
              </SafeAreaView>
              </Card>
          </View>
        );
      }}
    />
    </View>
  );

};

Recurring.navigationOptions = (navData) => {
  return {
    headerTitle: "Recurring Gifts",
  };
};

const styles = StyleSheet.create({
  summary: {
    padding: 10,
    flexDirection:'row',
    width:350
  },
  contaier: {
    //flexDirection:'row',
    padding:0,
    alignItems:'center',
    paddingBottom:'6%',
    paddingTop:'3%',
  },
  text: {
    marginVertical:10,
    fontSize:15,
    //fontWeight:'bold',
    marginLeft:20,
  },
  
});
export default Recurring;



