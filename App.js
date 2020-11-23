import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { Component } from 'react';
//Initial Screens
import Home from './ui/Home';
import Countries from './ui/countries';
import CapitalWeather from './ui/CapitalWeather';
const Stack = createStackNavigator();
export default class App extends Component {
  constructor() {
    super();
  }
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator
        // screenOptions={{
        //   headerShown: false
        // }}
        // headerMode={"none"}
        >
          <Stack.Screen name={"Home"} component={Home} />
          <Stack.Screen name={"Countries"} component={Countries} />
          <Stack.Screen name={"CapitalWeather"} component={CapitalWeather} />
        </Stack.Navigator>
      </NavigationContainer>
    )
  }
}
