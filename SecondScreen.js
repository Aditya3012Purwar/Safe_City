import React,{useState,useEffect} from "react";
import { View,Button } from "react-native";
import {
  Layout,
  TopNav,
  Text,
  themeColor,
  useTheme,
} from "react-native-rapi-ui";
import { LogBox } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Linking from "expo-linking";
import Communications from 'react-native-communications';
import {Camera,CameraType} from 'expo-camera'
LogBox.ignoreLogs([
  "AsyncStorage has been extracted from react-native core and will be removed in a future release. It can now be installed and imported from '@react-native-async-storage/async-storage' instead of 'react-native'. See https://github.com/react-native-async-storage/async-storage",
]);

export default function ({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const { isDarkmode } = useTheme();
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [st,setst]=useState(null);

  useEffect(() => {
      (async () => {
        const { status } = await Camera.requestPermissionsAsync();
        setHasPermission(status === 'granted');
      })();
    }, []);
  
    const handleCameraRef = (ref) => {
      setCamera(ref);
    };
  
    const takePicture = async () => {
      if (camera) {
        const photo = await camera.takePictureAsync();
        console.log(photo);
        setst("Image captured and sent to the authorities");
        let SendIntentAndroid = require("react-native-send-intent");

SendIntentAndroid.sendSms("+919886806600", "SMS body text here");
      }
    };
  
  
  return (
    <Layout>
      
      <TopNav
        middleContent="Capture and Report"
        leftContent={
          <Ionicons
            name="chevron-back"
            size={20}
            color={isDarkmode ? themeColor.white100 : themeColor.black}
          />
        }
        leftAction={() => navigation.goBack()}
      />
      <View style={{ flex: 1,marginHorizontal:15 }}>
      {hasPermission ? (
        <Camera
          style={{ flex: 0.8, marginTop:15,marginBottom:30}}
          type={Camera.Constants.Type.back}
          ref={handleCameraRef}
        />
      ) : (
        <Text>No access to camera</Text>
      )}
      <Button title="Capture Incident" onPress={takePicture} />
      <Text>

      </Text>
      
      <Text style={{marginTop:15,textAlign:"center"}}>{st}</Text>
    </View>
    </Layout>
  );
}
      
