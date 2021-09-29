import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import LandingScreen from "./Screens/LandingScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import RoverScreen from "./Screens/RoverScreen";
import SelectSol from "./Screens/SelectSol";
import ImagesScreen from "./Screens/ImagesScreen";
export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={LandingScreen}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="Select a Rover"
          component={RoverScreen}
          options={{
            headerStyle: {
              backgroundColor: "#000000",
            },
            headerTintColor: "white",
            headerTitleStyle: {
              color: "white",
            },
          }}
        />

        <Stack.Screen
          name="Select Sol"
          component={SelectSol}
          options={{
            headerStyle: {
              backgroundColor: "#000000",
            },
            headerTintColor: "white",
            headerTitleStyle: {
              color: "white",
            },
          }}
        />

        <Stack.Screen
          name="View Images"
          component={ImagesScreen}
          options={{
            headerStyle: {
              backgroundColor: "#000000",
            },
            headerTintColor: "white",
            headerTitleStyle: {
              color: "white",
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
