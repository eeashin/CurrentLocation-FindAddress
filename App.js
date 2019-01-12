import React from 'react';
import { StyleSheet, View, TextInput, Button, Alert } from 'react-native';
import { MapView } from 'expo';
import Geocoder from 'react-native-geocoding';

Geocoder.setApiKey('AIzaSyC17oKKhMLx2hFNDhBWpDsSiTIqleJN_fE'); // use a valid API key
export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      myAddress: '',
      latitude:60.200692,
      longitude:24.934302,
      latitudeDelta: 0.0322,
      longitudeDelta: 0.0221,
    }    
  }
  
  
  findMyAddress = () =>{
    Geocoder.setApiKey('AIzaSyC17oKKhMLx2hFNDhBWpDsSiTIqleJN_fE'); // use a valid API key 
    Geocoder.getFromLocation(this.state.myAddress)
    .then( (responseData) => {
        var location = responseData.results[0].geometry.location;
        this.setState({
          longitude:location.lng,
          latitude: location.lat
        })
      },
      error => {
        Alert.alert(error);
      }
    );     
  }
  render() {
    return (
      <View style={styles.container}>
        <MapView
            style={styles.map}
            region={{
              latitude: this.state.latitude,
              longitude: this.state.longitude,
              latitudeDelta: this.state.latitudeDelta,
              longitudeDelta: this.state.longitudeDelta,
            }}>
                <MapView.Marker
                coordinate={{
                  latitude: this.state.latitude,
                  longitude: this.state.longitude
                }}
                title={this.state.myAddress}
                />
        </MapView>
        <View style={styles.wrapperInput}>
            <TextInput style={styles.inputSearch}  onChangeText={(myAddress) => this.setState({myAddress})} value={this.state.myAddress}/>
            <Button onPress={this.findMyAddress} title="SHOW"/>
        </View>          
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#F5FCFF',
  },
  map: {
    flex: 80,
  },
  wrapperInput:{
    flex:20,
  },
  inputSearch:{
    height: 36,
    padding: 10,
    margin: 18,
    fontSize: 18,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#48BBEC',
    backgroundColor: 'rgba(0,0,0,0)',
  }
});