import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { StyleSheet, Text, View } from 'react-native';
import TitheLOVENavigation from './Navigations/TitheLOVENavigation';
//import FindOrganization from './screens/FindOrganization';

  const fetchFonts = () => {
    return Font.loadAsync({
      'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
      'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
    });
  };
  
  export default function App() {
    const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => {
          setFontLoaded(true);
        }}
      />
    );
  }

  return (
    <View style={styles.container}>
      
      <TitheLOVENavigation/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
  },
});
//<FindOrganization/>