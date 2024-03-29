import React from "react";
import { Text,View,ScrollView,StyleSheet, TouchableOpacity, ActivityIndicator,Dimensions,PermissionsAndroid } from "react-native";
import Tts from "react-native-tts";
import * as ImagePicker from "react-native-image-picker"
import colors from "../assets/colors"
import Icon from "react-native-vector-icons/FontAwesome5"

export default class DocReading extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            isloading:true,
            filePath:null,
            fileData:null,
            fileUri:null,
            text:null,
            success:false,
            width:null,
            height:null,
            pause:false
        }
    }

    async componentDidMount(){
        this.setState({
            isloading:false
        });
        const width = Dimensions.get("window").width
        const height = Dimensions.get("window").height
        this.setState({
            width,
            height
        })
        console.log(width,height)
    //     await Tts.speak('Click on the button at the bottom of the screen to turn on camera', {
    //         androidParams: {
    //         KEY_PARAM_PAN: -1,
    //         KEY_PARAM_VOLUME: 0.5,
    //         KEY_PARAM_STREAM: 'STREAM_MUSIC',
    //         language:"en-US"
    //     },
    //   });
    }

    // urlToBlob(url) {
    //     return new Promise((resolve, reject) => {
    //         var xhr = new XMLHttpRequest();
    //         xhr.onerror = reject;
    //         xhr.onreadystatechange = () => {
    //             if (xhr.readyState === 4) {
    //                 resolve(xhr.response);
    //             }
    //         };
    //         xhr.open('GET', url);
    //         xhr.responseType = 'blob'; // convert type
    //         xhr.send();
    //     })
    // }


    launchcamera = async () => {
        try {
            let options = {
                noData:true,
                maxWidth:600,
                maxHeight:600,
                quality:0.9,
                storageOptions: {
                    skipBackup: true,
                    path: 'images',
                  },
              };
              console.log("Turning on camera");
              const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA,
                {
                  title: "Cool Photo App Camera Permission",
                  message:
                    "Cool Photo App needs access to your camera " +
                    "so you can take awesome pictures.",
                  buttonNeutral: "Ask Me Later",
                  buttonNegative: "Cancel",
                  buttonPositive: "OK"
                }
              );
              console.log(granted);
              if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log("You can use the camera");
              } else {
                console.log("Camera permission denied");
              }
              const response = await ImagePicker.launchCamera(options)
            
                console.log('Response = ', response);
            
                if (response.didCancel) {
                    console.log('User cancelled image picker');
                } else if (response.error) {
                    console.log('ImagePicker Error: ', response.error);
                } else if (response.customButton) {
                    console.log('User tapped custom button: ', response.customButton);
                    alert(response.customButton);
                } else {
                    this.setState({
                    filePath: response,
                    fileData: response.data,
                    fileUri: response.uri,
                    });
                    this.ocr(response)
                    
                } 
        } catch (error) {
            console.log(error);
        }
    }

    ocr = async (response) => {
        console.log(response);
        const data = new FormData();
        data.append("file",{
            name:response.assets[0].fileName,
            type:response.assets[0].type,
            uri:response.assets[0].uri
        });

        await fetch("https://extract-text-image.herokuapp.com/upload",{
            method:"POST",
            headers:{
                "Content-Type":"multipart/form-data"
            },
            body:data,
        })
        .then((apiresponse) => apiresponse.json())
        .then(ocrtext => {
            console.log(ocrtext);
            if(ocrtext.success == true){
                this.setState({
                    success:true,
                    text:ocrtext.response.text
                })
                console.log("Text Done")
                this.readoutresponse(ocrtext.response.text)
                }
                if(ocrtext.success == false){
                    this.readoutresponse(ocrtext.message)
                }
                })
        .catch(e => console.log(e))
    }

    readoutresponse = async (text) => {
        Tts.speak(text, {
            androidParams: {
            KEY_PARAM_PAN: -1,
            KEY_PARAM_VOLUME: 0.5,
            KEY_PARAM_STREAM: 'STREAM_MUSIC',
            language:"en-US"
        },
      });
    }

    pausespeaking = async () => {
        console.log("Pause Speaking");
        await Tts.pause();
        this.setState({pause:true})
    }

    restartspeaking = async () => {
        console.log("Restarting speaking");
        await Tts.resume();
        this.setState({
            pause:false
        })
    }

    stopspeaking = async () => {
        console.log("SPeaking terminated");
        await Tts.stop();
        await Tts.speak("Speaking has been terminated", {
            androidParams: {
            KEY_PARAM_PAN: -1,
            KEY_PARAM_VOLUME: 0.5,
            KEY_PARAM_STREAM: 'STREAM_MUSIC',
            language:"en-US"
        },
      });
    }


    render(){
        if(this.state.isloading){
            return(
                <View style={{justifyContent:"center",flex:1}}>
                    <ActivityIndicator size="large" color="red" />
                </View>
            )
        }

        else{
            return(
                <View style={styles.container}>
                    <View>
                        {this.state.success?
                            <View style={{padding:10}}>
                                <Text style={{color:'black'}}>{this.state.text}</Text>
                            </View>
                            :
                            <View style={{padding:10}}>
                                <Text>No Doc Text</Text>
                            </View>
                        }
                    </View>
                    <View>
                        <View style={{flexDirection:"row",justifyContent:"space-between",marginBottom:30,paddingHorizontal:20}}>
                        {
                            this.state.pause==false?
                                <TouchableOpacity  onPress={() => {this.pausespeaking()}}> 
                                    <View style={styles.stopbutton}>
                                        <Icon name="pause" size={25}  />
                                    </View>
                                </TouchableOpacity>
                                :
                                <TouchableOpacity  onPress={() => {this.restartspeaking()}}> 
                                    <View style={[styles.stopbutton]}>
                                        <Icon name="play" size={25}  />
                                    </View>
                                </TouchableOpacity>                            
                        }
                            <TouchableOpacity  onPress={this.stopspeaking}> 
                                <View style={[styles.stopbutton]}>
                                        <Icon name="minus" size={25}  />
                                </View>
                            </TouchableOpacity> 
                        </View>
                        <TouchableOpacity style={styles.bottombutton} onPress={() => {this.launchcamera()}}> 
                            <Icon name="camera" size={30} style={{paddingRight:10}} />
                            <Text style={{fontSize:20}}>Camera</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )
        }
    }
}


const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection:"column",
        justifyContent:"space-between",
    },
    bottombutton:{
        height:60,
        flexDirection:"row",
        backgroundColor:colors.bottomcolor.backgroundColor,
        justifyContent:"center",
        alignItems:"center",
    },
    stopbutton:{
        borderRadius:70,
        height:70,
        width:70,
        justifyContent:"center",
        backgroundColor:"red",
        alignContent:"center",
        alignItems:'center'
    }
})