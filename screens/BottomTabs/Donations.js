import React,{useState, Component} from "react";
import { View, Text, StyleSheet, TouchableOpacity,ScrollView,Picker ,TextInput,AsyncStorage,Button} from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import {AntDesign,FontAwesome,MaterialIcons} from '@expo/vector-icons';
import Colors from '../../constant/Colors';
import { CheckBox } from 'react-native-elements'
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
export default class Donation extends Component{
  
constructor(props) 
  {
    super(props);
    this.state = { 
      jsonData: {} ,
      jsonCardData: {} ,
      users: [{type: null, amount: null}],
      frequancy: null,
      noOfmonth: null,
      date: null,
      checked:false,
      totalAmount:null,

      card_no: null,
      card_holder_name: null,
      expiry_month: null,
      expiry_year: null,
      
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this._loadData();
    this._loadCardData();
    //this._loadtoken();
  }
  
  addClick(){
    this.setState(prevState => ({ 
    	users: [...prevState.users, { type: "", amount: "" }]
    }))
  }
  
  handlefirstChange(i, event) {
   let users = [...this.state.users];
   users[i].type = event;
   this.setState({ users });
  }

  handlelastChange(i, event) {
  let users = [...this.state.users];
  users[i].amount = event;
  this.setState({ users });
 }
   
  
  removeClick(i){
     let users = [...this.state.users];
     users.splice(i, 1);
     this.setState({ users });
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + JSON.stringify(this.state.users));
    event.preventDefault();
  }

 _loadData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('churchData');
    const transformedData = JSON.parse(jsonValue);
    this.setState({
      jsonData: transformedData
    });
    //console.log(transformedData);
  } 
  catch(e) {
    console.log(e.error)
  }
}

_loadCardData = async () => {
  try {
    //console.log("get card data ");
    const jsonValue = await AsyncStorage.getItem('cardData');
    const transformedData = JSON.parse(jsonValue);
    this.setState({ jsonCardData: transformedData });
    //console.log(transformedData.card_no);
  } 
  catch(e) {
    console.log(e.error)
  }
}

// _loadtoken = async () => {
//   const jsonValue = await AsyncStorage.getItem('userData');
//     console.log(jsonValue)
  
// }
render(){

 const checkBoxTest = ()=>{
  if(this.setState({checked: !this.state.checked})){
    alert('not show data');
  }
}


const submitDonation = async () => {

  // donation http request 

  const jsonToken = await AsyncStorage.getItem('userData');
  const transformedData = JSON.parse(jsonToken);

  this.state.users.map(async(value,index)=>{
   
   const response = await fetch('https://lovechurh.graystork.co/api/donation',
     {
       method: 'POST',
       headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json',
         Authorization: 'Bearer ' + transformedData.token
       },
       body: JSON.stringify({
         'church_id': this.state.jsonData.id,
         'amount': value.amount,
         'donation_type':value.type,
         returnSecureToken: true
       })
     }
     )
     if (!response.ok) {
      console.log("Something went wrong");
    }
    const resData = await response.json();
    alert(resData.message);
    console.log(resData.message);
    });

// recurring http 
const response1 = await fetch('https://lovechurh.graystork.co/api/recurring-gift',
    {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + transformedData.token
      },
      body: JSON.stringify({
        'frequency': this.state.frequancy,
        'no_of_times': this.state.noOfmonth,
        'start_date':this.state.date,
        returnSecureToken: true
      })
    }
  );

  if (!response1.ok) {
    console.log("Something went wrong");
  }
  const resData1 = await response1.json();
  alert(resData1.message);
  console.log(resData1.message);


  // payment save Data 
    
  const response3 = await fetch('https://lovechurh.graystork.co/api/credit-card-detail',
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
  if (!response3.ok) {
   console.log("Something went wrong");
 }
 const resData2 = await response3.json();
 alert(resData2.message);
 console.log(resData2.message);
 saveCardData(resData2.id,resData2.card_no,resData2.card_holder_name,resData2.expiry_month,resData2.expiry_year);
 

};


const total =  this.state.users.map((item,index)=>{
  this.state.totalAmount += item.amount;
})

  return (
    
    <ScrollView>
    <View>
    
        <View style={{paddingTop:30}}>
      <Text
        style={{
          fontWeight: "bold",
          fontSize: 30,
          paddingHorizontal: 20,
        }}
      >
        Give Now
      </Text>
      </View >
      <View style={{paddingTop:35}}>
      <Text style={{ fontSize: 25, padding: 20, bottom: 20 }}>
        My Donation
      </Text>
      </View>
      
    <View style={{alignSelf:'center'}} >
      
    {this.state.users.map((el, i) => ( 

<View key={i} >
      <Picker
          selectedValue={el.type ||''}
          onValueChange={(e) => {this.handlefirstChange(i, e)}}
          style={{ width: 300,marginHorizontal: 14, }}
          required
          errorText="Please Choose a Fund!"
          mode="dropdown">
            <Picker.Item label="Choose a Fund" />
          <Picker.Item label="General Church Budget" value="General Church Budget" />
          <Picker.Item label="Journey Beyond" value="Journey Beyond" />
          <Picker.Item label="Children's Camp" value="Children's Camp" />
          <Picker.Item label="Middle School Camp" value="Middle School Camp" />
      </Picker>

      <View style={{ marginHorizontal: 25, width: 180 ,flexDirection:'row'}}>
          <TextInput style={styles.input} placeholder="$ 00.0"  keyboardType="default"  autoCapitalize="none" required  errorText="Please enter a valid amount!"  
          value={el.amount ||''}  onChangeText={(e) => {this.handlelastChange(i, e)}} placeholderTextColor="black" returnKeyType="next"/>
                    
            <TouchableOpacity onPress={() => this.removeClick(i)}>
              <FontAwesome name="remove" size={24} color={Colors.accent} style={{marginHorizontal:80}}/>
            </TouchableOpacity>        
      </View>
      
</View>          
         ))}  
    </View>

        <View style={{paddingBottom:40}}>
            <TouchableOpacity onPress={() => this.addClick()}>
          
            <AntDesign name="plus" size={25} color={Colors.accent} style={{marginHorizontal:80,top:25}}/>
          <Text style={{color:'#616161',marginHorizontal:120,fontSize:15}}>ADD DONATION</Text>
          
           </TouchableOpacity>
        </View>

    <View style={{flex:1}} >
  <View style={{width:250,alignSelf:'center'}} >
<CheckBox title='Make this gift recurring' onPress={checkBoxTest} checked={this.state.checked}/>
</View>
{this.state.checked && (
        <View style={styles.containerRecurr}>
        <View style={{right:5,}} >
          <Text style={{fontSize:25}}>Recurring Gift Details</Text>
          <Text style={{fontSize:13,color:"#616161",left:20}}>You can edit your recurring gift anytime.</Text>
        </View>
        <View style={{padding:20,flex:1}} >
          <View >
        <DropDownPicker
            items={[ {label: 'Weekly', value: 'Weekly'}, {label: 'Bi-Weekly', value: 'Bi-Weekly'}, {label: 'Twice a Month', value: 'Twice a Month'}, {label: 'Monthly', value: 'Monthly'}, {label: 'Quaterly', value: 'Quaterly'}, {label: 'Annually', value: 'Annually'},]}
            defaultValue={this.state.frequancy}
            containerStyle={{height: 40}}
            placeholder="Select an frequency"
            style={{backgroundColor: '#fafafa',width: 250,}}
            containerStyle={{paddingTop:130}}
            itemStyle={{
                justifyContent: 'flex-start',
            }}
            dropDownStyle={{backgroundColor: '#fafafa'}}
            onChangeItem={item => this.setState({ frequancy: item.value })}
          />
          </View>
        </View>
    
        <View style={{padding:20,flex:1}}>
        <Text style={{paddingBottom:10}} >How Many Gifts  optional</Text>
        <TextInput style={styles.inputRecurr} placeholder="How Many Gifts" autoCapitalize="none" required
         value={this.state.noOfmonth}  onChangeText={(item) =>this.setState({ noOfmonth: item })} placeholderTextColor="#616161"/>
        </View>
    
        
        <View style={{padding:20,flex:1}}>
        <Text style={{paddingBottom:10}} >Start Date</Text>
        <TextInput style={styles.inputRecurr} placeholder="2020-09-12" autoCapitalize="none" required
         value={this.state.date}  onChangeText={(item) =>this.setState({ date: item })} placeholderTextColor="#616161"/>
        </View>
    
      </View>
      )}
</View>


    <View style={{paddingBottom:50}}>
      
      <View style={{ flex: 1 ,top:80,alignSelf:'center'}}>
      <View style={{alignSelf:'center'}}>
      <Text style={{ fontSize: 25, padding: 20, bottom: 20 }}>
        Payment Information
      </Text>
      </View>

        <View style={{padding:15}}>
        <TextInput
        style={styles.input}
        placeholder="Holder name" 
        keyboardType="default" 
        autoCapitalize="none"
        required 
        errorText="Please enter a valid name!"
        value={this.state.card_holder_name} 
        onChangeText={(value)=>{this.setState({card_holder_name:value})}}
        placeholderTextColor="black"
        returnKeyType="next"
      />

        </View>
        <View style={{padding:15}}>
        <TextInput
        style={styles.input}
        placeholder="Card number" 
        keyboardType="default" 
        autoCapitalize="none"
        required 
        errorText="Please enter a Card number!" 
        value={this.state.card_no} 
        onChangeText={(value)=>{this.setState({card_no:value})}}
        placeholderTextColor="black"
        returnKeyType="next"
      />
        </View>

          <View style={{padding:15}}>
            <TextInput
        style={styles.input}
        placeholder="Month (expire. 07)" 
        keyboardType="default" 
        autoCapitalize="none"
        required 
        errorText="Please enter a valid Month !" 
        value={this.state.expiry_month} 
        onChangeText={(value)=>{this.setState({expiry_month:value})}}
        placeholderTextColor="black"
      />
          </View>

          <View style={{ width: 300,padding:15 }}>
          <TextInput
        style={styles.input}
        placeholder="Year (expire. 2020)" 
        keyboardType="default" 
        autoCapitalize="none"
        required 
        errorText="Please enter a valid Year!" 
        value={this.state.expiry_year} 
        onChangeText={(value)=>{this.setState({expiry_year:value})}}
        placeholderTextColor="black"
      />
          </View>
      
      </View>

    </View>
    <View style={{paddingBottom:150}}>
      
      <View style={{ flex: 1 ,top:80,alignSelf:'center'}}>
      <View style={{alignSelf:'center'}}>
      <Text style={{ fontSize: 25, padding: 20, bottom: 20 }}>
        Billing Information
      </Text>
      </View>

        <View style={{padding:15}}>
        <TextInput
        style={styles.input}
        placeholder="Address" 
        keyboardType="default" 
        autoCapitalize="none"
        required 
        errorText="Please enter a valid address!"
        //value={this.state.card_holder_name} 
        onChangeText={(value)=>{this.setState(value)}}
        placeholderTextColor="black"
        returnKeyType="next"
      />

        </View>
        <View style={{padding:15}}>
        <TextInput
        style={styles.input}
        placeholder="Zip Code" 
        keyboardType="default" 
        autoCapitalize="none"
        required 
        errorText="Please enter a zip code!" 
        //value={this.state.card_no} 
        onChangeText={(value)=>{this.setState(value)}}
        placeholderTextColor="black"
        returnKeyType="next"
      />
        </View>
      
      </View>

    </View>
    
      <TouchableOpacity style={{alignSelf:'center'}} onPress={submitDonation }>
        <LinearGradient colors={["#307AB1", "#307AB1", "#307AB1"]} style={{ padding: 15, marginTop: 10, alignItems: "center", borderRadius: 5, width: 350,}}>
          <Text style={styles.text}>SUBMIT</Text>
        </LinearGradient>
      </TouchableOpacity>

      <View style={{flex:1,alignSelf:'center',padding:50,fontWeight:'bold',fontSize:30}} >
        <Text style={{fontWeight:'bold',fontSize:25}}>Total: $ {Math.round(this.state.totalAmount * 100) / 100}.00</Text>
        </View>

      <View style={{ alignSelf:'center' ,justifyContent:'center',paddingTop:30}}>
        <Text style={{ alignSelf:'center',color:'#616161',fontSize:16}}>Online Giving powered by titheLOVE</Text>
        <TouchableOpacity><Text style={{ alignSelf:'center' ,color:'blue',paddingTop:10}}>Need Help ?</Text></TouchableOpacity>
      </View>

    </View>
    </ScrollView>
    
  );
};
};
Donation.navigationOptions = navData => {
    return {
        headerTitle: 'Give Now',
    };
  };

const styles = StyleSheet.create({
  container: {
    height: 280,
  },
  fe:{
    borderColor:"blue",borderWidth:1,width:100
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
  input: {
    paddingHorizontal: 5,
    paddingVertical: 5,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,paddingRight:90,

  },
  errorContainer: {
    marginVertical: 5
  },
  errorText: {
    fontFamily: 'open-sans',
    color: '#FC5B57',
    fontSize: 13
  },
  detailItems: {
    width: '100%'
  },
  containerRecurr: {
    flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      width:"100%",
      padding:10,
      paddingTop:30,
  },
  inputRecurr: {
    paddingHorizontal: 5,
    paddingVertical: 5,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    width:250
  },
  detailItems: {
    width: '100%'
  }
});
//export default Donation;

