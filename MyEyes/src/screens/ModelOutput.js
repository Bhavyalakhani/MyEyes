import React, { Component } from 'react'
import { Text, View,TouchableOpacity } from 'react-native'

export class ModelOutput extends Component {
    render() {
        return (
            <View>
                <Text> ModelOutput Screen </Text>
                <TouchableOpacity onPress={() => {this.props.navigation.navigate("Home")}}>
                    <Text>To Home</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

export default ModelOutput

