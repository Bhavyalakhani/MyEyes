import React from "react";
import { Text,View,ScrollView,StyleSheet, TouchableOpacity, ActivityIndicator,Dimensions,PermissionsAndroid, Alert } from "react-native";
import Tts from "react-native-tts";
import * as ImagePicker from "react-native-image-picker"
import colors from "../assets/colors"
import Icon from "react-native-vector-icons/FontAwesome5"

export default class ExpiryDateRecognitiion extends React.Component {
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
    //     await Tts.out = ('Click on the button at the bottom of the screen to turn on camera', {
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
            let out;
            console.log(ocrtext);
            var today = new Date();
            var dd = String(today.getDate()).padStart(2, '0');
            var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
            var yyyy = today.getFullYear();

            today = mm + '/' + dd + '/' + yyyy;
            if(ocrtext.success == true){
                const _text = ocrtext.response.text;
                if (_text!=null)
                {
                  if(_text.includes('Exp Date'))
                  {
                    let index = _text.indexOf('Exp');
                    var ans = _text.substring(index,index+17);
                    out = (ans + " " + today);
                  }
                  else if(_text.includes('exp Date'))
                  {
                    let index = _text.indexOf('exp');
                    var ans = _text.substring(index,index+17);
                    out = (ans + " " + today);
                  }
                  else if(_text.includes('EXP DATE'))
                  {
                    let index = _text.indexOf('EXP');
                    var ans = _text.substring(index,index+17);
                    out = (ans + " " + today);
                  }
                  else if(_text.includes('Expiry Date'))
                  {
                    let index = _text.indexOf('Expiry Date');
                    var ans = _text.substring(index,index+20);
                    out = (ans + " " + today);
                  }
                  else if(_text.includes('Exp. Date'))
                  {
                    let index = _text.indexOf('Exp. Date');
                    var ans = _text.substring(index,index+18);
                    out = (ans + " " + today);
                  }
                  else if(_text.includes('expiry'))
                  {
                    let index = _text.indexOf('expiry Date');
                    var ans = _text.substring(index,index+20);
                    out = (ans + " " + today);
                  }
                  else if(_text.includes('EXPIRY DATE'))
                  {
                    let index = _text.indexOf('EXPIRY DATE');
                    var ans = _text.substring(index,index+20);
                    out = (ans + " " + today);
                  }
                  else if(_text.includes('Exp'))
                  {
                    let index = _text.indexOf('Exp');
                    var ans = _text.substring(index,index+12);
                    out = (ans + " " + today);
                  }
                  else if(_text.includes('exp'))
                  {
                    let index = _text.indexOf('exp');
                    var ans = _text.substring(index,index+12);
                    out = (ans + " " + today);
                  }
                  else if(_text.includes('EXP'))
                  {
                    let index = _text.indexOf('EXP');
                    var ans = _text.substring(index,index+12);
                    out = (ans + " " + today);
                  }
                  else if(_text.includes('Expiry'))
                  {
                    let index = _text.indexOf('Expiry');
                    var ans = _text.substring(index,index+15);
                    out = (ans + " " + today);
                  }
                  else if(_text.includes('expiry'))
                  {
                    let index = _text.indexOf('expiry');
                    var ans = _text.substring(index,index+15);
                    out = (ans + " " + today);
                  }
                  else if(_text.includes('EXPIRY'))
                  {
                    let index = _text.indexOf('EXPIRY');
                    var ans = _text.substring(index,index+15);
                    out = (ans + " " + today);
                  }
                  else
                  {
                    out = ('No expiry Date found. Please try taking another photo from another side or angle. Click anywhere to start again');
                    out = 'No expiry Date found. Please try taking another photo from another side or angle.';
                  }
                }
                else {
                    this.setState({
                        success:false,
                        text:"Sorry could not fetch, please try again"
                    })
                }
                this.setState({
                    success:true,
                    text:out
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
        Tts.out = (text, {
            androidParams: {
            KEY_PARAM_PAN: -1,
            KEY_PARAM_VOLUME: 0.5,
            KEY_PARAM_STREAM: 'STREAM_MUSIC',
            language:"en-US"
        },
      });
    }

    pauseout = ing = async () => {
        console.log("Pause speaking");
        await Tts.pause();
        this.setState({pause:true})
    }

    restartout = async () => {
        console.log("Restarting speaking");
        await Tts.resume();
        this.setState({
            pause:false
        })
    }

    stopout = async () => {
        console.log("speaking terminated");
        await Tts.stop();
        await Tts.out("speaking has been terminated", {
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
                                <TouchableOpacity  onPress={() => {this.pauseout = ing()}}> 
                                    <View style={styles.stopbutton}>
                                        <Icon name="pause" size={25}  />
                                    </View>
                                </TouchableOpacity>
                                :
                                <TouchableOpacity  onPress={() => {this.restartout = ing()}}> 
                                    <View style={[styles.stopbutton]}>
                                        <Icon name="play" size={25}  />
                                    </View>
                                </TouchableOpacity>                            
                        }
                            <TouchableOpacity  onPress={this.stopout = ing}> 
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

