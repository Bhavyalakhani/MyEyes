import React from "react";
import { Text,TouchableOpacity,View,ScrollView, FlatList,StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import Voice from '@react-native-community/voice';


export default class Home extends React.Component {
    constructor(props){
        super(props);
        Voice.onSpeechStart = this.voiceCommandActivate.bind(this);
        this.state={
            "value":null
        }
    }

    voiceCommandActivate = async () => {
        console.log("Inside activate tfunction")
        await Voice.start("en-US");

    }

    render(){
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
                </View>
                <View>
                    <TouchableOpacity style={styles.buttonbottom} onPress={this.voiceCommandActivate}>
                        <Text style={{fontSize:20}}>Activate Voice Command</Text>
                    </TouchableOpacity>
                </View>
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