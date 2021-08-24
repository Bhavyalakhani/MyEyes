import React from "react";
import { Text,TouchableOpacity,View } from "react-native";

export default class Home extends React.Component {
    constructor(props){
        super(props);
        this.state={
            "value":null
        }
    }

    render(){
        return(
            <View>
                <Text>This is the homr page</Text>
                <TouchableOpacity onPress={() => {this.props.navigation.navigate("ModelOutput")}}>
                    <Text>To ModelOutput</Text>
                </TouchableOpacity>
            </View>
        )
    }
}