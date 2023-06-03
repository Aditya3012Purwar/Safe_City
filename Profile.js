import React from 'react';
import { useState,useEffect} from "react";
import { View,Image, ScrollView } from "react-native";
import { getAuth, signOut} from "firebase/auth";
import BleManager from 'react-native-ble-manager';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { initializeApp } from "firebase/app";
import {Camera,CameraType} from 'expo-camera'
import { doc, setDoc } from "firebase/firestore"; 
import * as Notifications from 'expo-notifications';
import * as Linking from "expo-linking";
import Communications from 'react-native-communications';
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
let text1="Please help me my coordinates are ";
export default function ({ navigation }) {
	return (
		<Layout>
			<ScrollView>
			
				  <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          marginHorizontal: 20,
        }}
      >
		<Text></Text>
		<Text>My Emergency Contacts</Text>
		<Text>

		</Text>
        <Section>
        <Image source={require("../imagesmain/OIPw.jpg")} style={{}}/>
          <SectionContent>
		 
            <Text fontWeight="bold" style={{ textAlign: "center" }}>
              Pranjal Gupta
            </Text>
            
            <Text  style={{ textAlign: "center",marginTop:10 }}>
              Friend
            </Text>
           {/* <Button
              style={{ marginTop: 10 }}
              text="Rapi UI Documentation"
              status="info"
              onPress={() => Linking.openURL("https://rapi-ui.kikiding.space/")}
    /> */}
            <Button
              text="Call"
              onPress={() => {
				console.log("Buttoned");
				Linking.openURL(`tel:${9560939549}`);
                Communications.phonecall('9560939549',true);
               
              }}
              style={{
                marginTop: 10,
              }}
            />
             <Button
              text="Message"
              onPress={() => {
              
                  Communications.text(phoneNumber = "9560939549", body = "MyCoords- 12.96-79.146" )
               
                
               
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
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          marginHorizontal: 20,
        }}
      >
        <Section>
        <Image source={require("../imagesmain/OIPw.jpg")} />
          <SectionContent>
            <Text fontWeight="bold" style={{ textAlign: "center" }}>
              Anil Agarwal
            </Text>

            <Text style={{textAlign: "center",marginTop:10}}>
              Father
            </Text>
           {/* <Button
              style={{ marginTop: 10 }}
              text="Rapi UI Documentation"
              status="info"
              onPress={() => Linking.openURL("https://rapi-ui.kikiding.space/")}
    /> */}
            <Button
              text="Call"
              onPress={() => {
                Linking.openURL(`tel:${9886806600}`);
                Communications.phonecall('9886806600',true);
                
               
              }}
              style={{
                marginTop: 10,
              }}
            />
             <Button
              text="Message"
              onPress={() => {
                Communications.text(phoneNumber = "9886806600", body = "MyCoords- 12.96-79.146" )
               
                
               
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
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          marginHorizontal: 20,
        }}
      >
        <Section>
        <Image source={require("../imagesmain/OIPw.jpg")} />
          <SectionContent>
            <Text fontWeight="bold" style={{ textAlign: "center" }}>
              Monika Agarwal
            </Text>
            <Text style={{textAlign: "center",marginTop:10}}>
              Mother
            </Text>
           {/* <Button
              style={{ marginTop: 10 }}
              text="Rapi UI Documentation"
              status="info"
              onPress={() => Linking.openURL("https://rapi-ui.kikiding.space/")}
    /> */}
            <Button
              text="Call"
              onPress={() => {
                	Linking.openURL(`tel:${9886332311}`);
                Communications.phonecall('9886332311',true);
               
                
               
              }}
              style={{
                marginTop: 10,
              }}
            />
            <Button
              text="Message"
              onPress={() => {
                Communications.text(phoneNumber = "9886332311", body = "MyCoords- 12.96-79.146" )
               
                
               
              }}
              style={{
                marginTop: 10,
              }}
            />
          
          </SectionContent>
        </Section>
      </View>
			
			</ScrollView>
		</Layout>
	);
}
