import React, { Component } from 'react';
import {View ,AsyncStorage,Text, ActivityIndicator,StyleSheet} from 'react-native';
import {createSwitchNavigator,createAppContainer,} from 'react-navigation';
//import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer';
import { createStackNavigator } from 'react-navigation-stack';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { Ionicons,MaterialIcons,MaterialCommunityIcons,SimpleLineIcons } from '@expo/vector-icons';
import Colors from '../constant/Colors';
import FindOrganization from "../screens/FindOrganization";
import LoginScreen from '../screens/loginScreen';
import SignInScreen from '../screens/SignInScreen';
import WelcomeScreen from "../screens/BottomTabs/WelcomeScreen";
import AddPaymentMethod from '../screens/BottomTabs/SettingFolder/AddPaymentMethod'
import History from "../screens/BottomTabs/History";
import Recurring from "../screens/BottomTabs/Recurring";
import Setting from "../screens/BottomTabs/Setting";
import AccountScreen from '../screens/BottomTabs/SettingFolder/AccountScreen'
import PaymentScreen from '../screens/BottomTabs/SettingFolder/PaymentScreen'
import Donation from '../screens/BottomTabs/Donations'
import SearchChurchData from '../screens/SearchChurchData'
import SearchChurchData1 from '../screens/BottomTabs/SearchChurchData1'
import TokenFromCard from '../screens/stripeFolder/TokenFormCard';
import Home from '../screens/stripeFolder/Home';
import GooglePayScreen from '../screens/stripeFolder/GooglePayScreen';
import CardFormScreen from '../screens/stripeFolder/CardFormScreen';
import BySourceScreen from '../screens/stripeFolder/BySourceScreen';
import ApplePayScreen from '../screens/stripeFolder/ApplePay';

const defaultNavOptions = {
  headerStyle: {
    backgroundColor: Colors.primary
  },
  headerTitleStyle: {
    fontFamily: 'open-sans-bold'
  },
  headerBackTitleStyle: {
    fontFamily: 'open-sans'
  },
  headerTintColor: Colors.white
};

class AuthLoginScreen extends Component
{
constructor(props){
  super(props);
  this._loadData();
}

  render(){
    return(
      <View style={{alignItems:'center',justifyContent:'center',flex:1}} >
        <ActivityIndicator/>
      </View>
    );
  };

_loadData = async(props) =>{
  const isLoggedIn = await AsyncStorage.getItem('userData');
  if (!isLoggedIn) {
    this.props.navigation.navigate('Startup');
    return;
  }
  else{
    this.props.navigation.navigate('Bottom');
  }
};

}

const WelcomeNavigation = createStackNavigator(
  {
    Welcome:WelcomeScreen,
    Donation:Donation,
  },
  {
    defaultNavigationOptions: defaultNavOptions
  }
);
const HistoryNavigation = createStackNavigator(
  {
    History:History 
  },
  {
    defaultNavigationOptions: defaultNavOptions
  }
);
const RecurringNavigation = createStackNavigator(
  {
    Recurring:Recurring 
  },
  {
    defaultNavigationOptions: defaultNavOptions
  }
);
const PaymentNavigation = createStackNavigator(
  {
    HomeS: Home,
    TokenFromCardS: TokenFromCard,
    GooglePayS: GooglePayScreen,
    CardForm: CardFormScreen,
    BySource: BySourceScreen,
    ApplePay: ApplePayScreen,
  },
  {
    defaultNavigationOptions: defaultNavOptions
  }
);
const SettingNavigation = createStackNavigator(
  {
    Setting:Setting ,
    Account:AccountScreen,
    Payment:PaymentNavigation,
    //PaymentMethod:AddPaymentMethod,
  },
  {
    defaultNavigationOptions: defaultNavOptions
  }
);
const SearchNavigation = createStackNavigator(
  {
    Find1:FindOrganization,
    SearchChurch:SearchChurchData1,
    Login1: AuthLoginScreen,
  },
  {
    defaultNavigationOptions: defaultNavOptions
  }
);
const BottomTabNavigation = createMaterialBottomTabNavigator({
  Welcome: { screen: WelcomeNavigation ,
    navigationOptions:{
      tabBarLabel:'Home',
      tabBarIcon:()=>(
        <View><Ionicons
        name={Platform.OS === 'android' ? 'md-home' : 'ios-home'}
        size={23}
        color={Colors.primary}
      /></View>
      ),
    }
  },
  History: { screen: HistoryNavigation,
    navigationOptions:{
      tabBarLabel:'History',
      tabBarIcon:()=>(
        <View><MaterialIcons name="history" size={23} color={Colors.primary} /></View>
      ),
    }},
  Recurring: { screen: RecurringNavigation  ,
    navigationOptions:{
      tabBarLabel:'Recurring',
      tabBarIcon:()=>(
        <View><MaterialCommunityIcons name="calendar-check-outline" size={23} color={Colors.primary} /></View>
      ),
    }},
  Search: { screen: SearchNavigation  ,
    navigationOptions:{
      tabBarLabel:'Search Church',
      tabBarIcon:()=>(
        <View><MaterialIcons name="search" size={23} color={Colors.primary} /></View>
      ),
    }},
  Setting: { screen: SettingNavigation  ,
    navigationOptions:{
      tabBarLabel:'Setting',
      tabBarIcon:()=>(
        <View><SimpleLineIcons name="settings" size={23} color={Colors.primary} /></View>
      ),
    }},
}, {
  initialRouteName: 'Welcome',
  activeColor: '#307AB1',
  inactiveColor: '#307AB1',
  barStyle: { backgroundColor: '#fff' },
});

class AuthLoadingScreen extends Component
{
constructor(props){
  super(props);
  this._loadData();
}

  render(){
    return(
      <View style={{alignItems:'center',justifyContent:'center',flex:1}} >
        <ActivityIndicator/>
      </View>
    );
  };

_loadData = async(props) =>{
  const isLoggedIn = await AsyncStorage.getItem('userData');
  if (!isLoggedIn) {
    this.props.navigation.navigate('Startup');
    return;
  }
  else{
    this.props.navigation.navigate('Bottom');
  }
};

}

const TitheLOVENavigation = createStackNavigator(
    {
        Find:FindOrganization,
        SearchChurch:SearchChurchData,
        Login: LoginScreen,
        Signin: SignInScreen,
        
    },
    {
      defaultNavigationOptions: defaultNavOptions
    }
    
  );

const MainNavigator = createSwitchNavigator({
  Auth:AuthLoadingScreen,
  Startup : TitheLOVENavigation,
  Bottom : BottomTabNavigation,
  
});
export default createAppContainer(MainNavigator);