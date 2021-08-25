import React from "react";
import { Text,TouchableOpacity,View,ScrollView, FlatList,StyleSheet, Alert, ActivityIndicator } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import Voice from '@react-native-community/voice';
import Tts from 'react-native-tts';


export default class Home extends React.Component {
    constructor(props){
        super(props);
        Voice.onSpeechStart = this.onSpeechStart.bind(this);
        Voice.onSpeechRecognized = this.onSpeechRecognized.bind(this);
        Voice.onSpeechResults = this.onSpeechResults.bind(this);
        Voice.onSpeechEnd = this.onSpeechEnd.bind(this);
        this.state={
            recognized: '',
            started: '',
            results: [],
            activatevoice:true,
            isloading:true
        }
    }

    componentWillUnmount() {
        Voice.destroy().then(Voice.removeAllListeners);
      }

      componentDidMount(){
          this.setState({
              isloading:false
          })
          Tts.speak('Welcome To MyEyes!', {
            androidParams: {
              KEY_PARAM_PAN: -1,
              KEY_PARAM_VOLUME: 0.5,
              KEY_PARAM_STREAM: 'STREAM_MUSIC',
              language:"en-US",
            },
          });
      }


    onSpeechStart = (e) => {
        console.log(e.value);
        this.setState({
          started: '√',
        });
      }

      onSpeechEnd = (e) => {
        console.log(e);
      }

    onSpeechRecognized = (e) => {
        this.setState({
          recognized: '√',
        });
      }

    onSpeechResults = (e) =>  {
        console.log(e.value)
        this.setState({
          results: e.value,
        });
      }

     _startRecognition = async (e) => {
        console.log("recognizing speech")
        await Tts.speak('Please speak now', {
                androidParams: {
                KEY_PARAM_PAN: -1,
                KEY_PARAM_VOLUME: 0.5,
                KEY_PARAM_STREAM: 'STREAM_MUSIC',
                language:"en-US"
            },
          });
        this.setState({
          recognized: '',
          started: '',
          results: [],
          activatevoice:false
        });
        try {
          await Voice.start('en-US');
          console.log("yes")
        } catch (e) {
          console.error(e);
        }
      }

    stoprecognition =  async () => {
        this.setState({
            activatevoice:true
        });
        console.log("Recognition stopped");
        try {
            await Voice.stop();
        } catch (error) {
            console.log(error);
        }
    }

    render(){
        if(this.state.isloading){
            return(
                <View>
                    <ActivityIndicator size="large" color="#fccb45"></ActivityIndicator>
                </View>
            )
        }
        return(
            <View style={{flex:1,flexDirection:"column",justifyContent:"space-between"}}>
                <View>
                    <TouchableOpacity style={styles.box} onPress={() => {this.props.navigation.navigate("ModelOutput")}}>
                        <Text style={styles.textsize}>Money Detection</Text>
                        <Icon name="angle-right" size={30} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.box} onPress={() => {this.props.navigation.navigate("ModelOutput")}}>
                        <Text style={styles.textsize}>Document Reading</Text>
                        <Icon name="angle-right" size={30} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.box} onPress={() => {this.props.navigation.navigate("ModelOutput")}}>
                        <Text style={styles.textsize}>Color Detection</Text>
                        <Icon name="angle-right" size={30} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.box} onPress={() => {this.props.navigation.navigate("ModelOutput")}}>
                        <Text style={styles.textsize}>Money Detection</Text>
                        <Icon name="angle-right" size={30} color="black" />
                    </TouchableOpacity>
                    {
                        this.state.results.map((result, index) => <Text style={styles.transcript}> {result}</Text>
                    )}
                </View>
                {
                    this.state.activatevoice?
                    <View>
                        <TouchableOpacity style={styles.buttonbottom} onPress={this._startRecognition.bind(this)}>
                            <Text style={{fontSize:20}}>Activate Voice Command</Text>
                        </TouchableOpacity>
                    </View>
                    :
                    <View>
                        <TouchableOpacity style={styles.buttonbottom} onPress={this.stoprecognition.bind()}>
                            <Text style={{fontSize:20}}>DeActivate Voice Command</Text>
                        </TouchableOpacity>
                    </View>
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    box:{
        flexDirection:"row",
        height:50,
        alignContent:"center",
        justifyContent:"space-between",
        alignItems:"center",
        backgroundColor:"#d1cfc5",
        paddingHorizontal:10,
        borderBottomWidth:1,
    },
    textsize:{
        fontSize:20
    },
    buttonbottom:{
        bottom:0,
        alignItems:"center",
        height:40,
        backgroundColor:"#3355ff",
        alignContent:"center",
        justifyContent:"center"
    }
})