import React, { useState,useEffect} from "react";
import { View, Linking,Image, ScrollView } from "react-native";
import { getAuth, signOut} from "firebase/auth";
import BleManager from 'react-native-ble-manager';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { initializeApp } from "firebase/app";
import {Camera,CameraType} from 'expo-camera'
import { LogBox } from "react-native";
import { doc, setDoc } from "firebase/firestore"; 
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import {
  Layout,
  Button,
  Text,
  TopNav,
  Section,
  SectionContent,
  useTheme,
} from "react-native-rapi-ui";
import * as Location from 'expo-location'
import { fontSize } from "react-native-rapi-ui/constants/typography";
let deviceId="DNPDQC8T0DY2";
  let message="Help";
 let CHARACTERISTIC_UUID="";
 let SERVICE_UUID="";
 

export default function ({ navigation }) {
  const { isDarkmode, setTheme } = useTheme();
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  function toggleCameraType() {
    setType(current => (current == CameraType.back));
  }
  function componentDidMount() {
    BleManager.start({ showAlert: false })
      .then(() => {
        console.log('Bluetooth module initialized');
        // Additional setup and functionality can be implemented here
      })
      .catch((error) => {
        console.log('Bluetooth module initialization error:', error);
      });
  }
  
  function scanDevices() {
    BleManager.scan([], 5, true)
      .then(() => {
        console.log('Scanning started');
        // Additional handling of discovered devices can be implemented here
      })
      .catch((error) => {
        console.log('Scan error:', error);
      });
  }
  
  function connectToDevice(deviceId) {
  BleManager.connect(deviceId)
    .then(() => {
      console.log('Connected to device');
      // Additional communication with the connected device can be implemented here
    })
    .catch((error) => {
      console.log('Connection error:', error);
    });
}

function sendMessageToDevice(deviceId, message) {
  BleManager.write(deviceId, SERVICE_UUID, CHARACTERISTIC_UUID, message)
    .then(() => {
      console.log('Message sent to device');
      // Additional handling of the message being sent can be implemented here
    })
    .catch((error) => {
      console.log('Write error:', error);
    });
}
  
  useEffect(() => {
    (async () => {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }
      
      let location = await Location.getCurrentPositionAsync({});
      
      setLatitude(location.coords.latitude)
      setLongitude(location.coords.longitude);
      console.log(location.coords.latitude);
      console.log(location.coords.longitude);
      setLocation(location.coords);
      const firebaseConfig = {
        apiKey: "AIzaSyA4TWlaJdScWrzPkYpI7nTVCdeKewEdGyE",
        authDomain: "communitysafety-2fb24.firebaseapp.com",
        projectId: "communitysafety-2fb24",
        storageBucket: "communitysafety-2fb24.appspot.com",
        messagingSenderId: "703443897809",
        appId: "1:703443897809:web:2e1a1ae0e38f6c1b6624f0",
        measurementId: "G-PHHZPEWVYY"
      };
      const app = initializeApp(firebaseConfig);
      const db = getFirestore();
      console.log("Before");
     db.collection("Userdata")
     .add({
        name:name,
        Latitude:location.coords.latitude,
        Longitude:location.coords.longitude
     })
     .then((docRef)=>
     {
        console.log("Data pushed",docRef.id);
        console.log("After");
     })
     .catch((error)=>
     {
        console.log("Error");
        console.log("After2");

     });
     
    })();
}, []);
  

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }
  if(latitude!=null)
  {
  console.warn("latitude: ", latitude);
  }
  if(longitude!=null)
  {
  console.warn("longitude: ", longitude);
  }
 

  const auth = getAuth();
  return (
    <Layout style={{backgroundColor:"black"}}>
      <Text>

      </Text>
      <View >
      <Text style={{textAlign:"center",fontSize:20}}>Safe City</Text>
      <View style={{width:"30%",alignItems:"center",marginLeft:125}}>
      <Button
              status="danger"
              text="Logout"
              onPress={() => {
                signOut(auth);
              }}
              style={{
                marginTop: 10,
              }}
            />
            </View>
            </View>
      
    <Layout>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          marginHorizontal: 20,
        }}
      >
        <Section>
        <Image source={require("../imagesmain/guns.jpg")} />
          <SectionContent>
            <Text fontWeight="bold" style={{ textAlign: "center" }}>
              Armed Assault 
            </Text>
           {/* <Button
              style={{ marginTop: 10 }}
              text="Rapi UI Documentation"
              status="info"
              onPress={() => Linking.openURL("https://rapi-ui.kikiding.space/")}
    /> */}
            <Button
              text="Emergency"
              onPress={() => {
                navigation.navigate("SecondScreen");
               
              }}
              style={{
                marginTop: 10,
              }}
            />
            
          
          </SectionContent>
        </Section>
      </View>
      

      <View style={{flexDirection:"row"}}>
            <ScrollView horizontal={true}>
      <View
        style={{
          flex: 0,
          alignItems: "center",
          justifyContent: "center",
          marginHorizontal: 3,
        }}
      >
        <Section>
        <Image source={require("../imagesmain/cops.jpg")} />
          <SectionContent>
          
            <Text fontWeight="bold" style={{ textAlign: "center" }}>
              Alert a Police Official near you
            </Text>
          {/*  <Button
              style={{ marginTop: 10 }}
              text="Rapi UI Documentation"
              status="info"
              onPress={() => Linking.openURL("https://rapi-ui.kikiding.space/")}
            />
    */}
            <Button
              text="Police"
              onPress={() => {
                toggleCameraType;
                navigation.navigate("SecondScreen");
                connectToDevice(deviceId);
                sendMessageToDevice(deviceId,message);
                

              
                
              }
            }
              style={{
                marginTop: 10,
              }}
            />
          
          
          </SectionContent>
        </Section>
      </View>

      <View
        style={{
          flex: 0,
          alignItems: "center",
          justifyContent: "center",
          marginHorizontal: 0,
         
        }}
      >
        <Section>
        <Image source={require("../imagesmain/R.jpg")} />
          <SectionContent>
          
            <Text fontWeight="bold" style={{ textAlign: "center" }}>
              Alert a Health Official near you
            </Text>
          {/*  <Button
              style={{ marginTop: 10 }}
              text="Rapi UI Documentation"
              status="info"
              onPress={() => Linking.openURL("https://rapi-ui.kikiding.space/")}
            />
    */}
            <Button
              text="Hospital"
              onPress={() => {
                navigation.navigate("SecondScreen");
              }}
              style={{
                marginTop: 10,
              }}
            />
          
          
          </SectionContent>
        </Section>
      </View>


      
      <View
        style={{
          flex: 0,
          alignItems: "center",
          justifyContent: "center",
          marginHorizontal:3,
         
        }}
      >
        <Section>
        <Image source={require("../imagesmain/fire.jpg")} />
          <SectionContent>
          
            <Text fontWeight="bold" style={{ textAlign: "center" }}>
              Alert a Fire Official near you
            </Text>
          {/*  <Button
              style={{ marginTop: 10 }}
              text="Rapi UI Documentation"
              status="info"
              onPress={() => Linking.openURL("https://rapi-ui.kikiding.space/")}
            />
    */}
            <Button
              text="Fire"
              onPress={() => {
                navigation.navigate("SecondScreen");
              }}
              style={{
                marginTop: 10,
              }}
            />
          
          
          </SectionContent>
        </Section>
      </View>
             </ScrollView>
      </View>

    



      
    </Layout>
   
   </Layout>
    
  );
};


