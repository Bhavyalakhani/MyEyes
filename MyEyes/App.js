/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {createStackNavigator} from "react-navigation-stack";
import {createAppContainer} from "react-navigation"
import {
  StyleSheet,
  Text
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

//screens import 
import Home from "./src/screens/Home.js";
import ModelOutput from './src/screens/ModelOutput.js';

const stacknavigator = createStackNavigator({
  Home:{
    screen:Home,
  },
  ModelOutput:{
    screen:ModelOutput
  }
})

const AppContainer = createAppContainer(stacknavigator);

class App extends React.Component {
  render(){
    return(
      <AppContainer></AppContainer>
    )
  }
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
