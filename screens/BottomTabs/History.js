import React, { Component } from 'react'
import { View ,Text,StyleSheet} from 'react-native'

export default class History extends Component {
    render() {
        return (
            <View style={styles.container}><Text style={{color:'#fff',fontSize:25}}>History</Text></View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          width:"100%",
          backgroundColor: '#307AB1',
      },
});