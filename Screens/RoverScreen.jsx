import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useFonts, Michroma_400Regular } from "@expo-google-fonts/michroma";
import RoverCard from "../components/RoverScreen/RoverCard";

const RoverScreen = ({ navigation }) => {
  let [fontsLoaded] = useFonts({
    Michroma_400Regular,
  });
  const API_KEY = "HvEcKggUkmfHcMEvKoM8DwRPKNzml0l8wH55HOZ4";

  //URLS
  const getRoversURL = `https://api.nasa.gov/mars-photos/api/v1/rovers/?api_key=${API_KEY}`;
  const getManifestInfoURL = `https://api.nasa.gov/mars-photos/api/v1/manifests/Curiosity?api_key=${API_KEY}`;

  //state
  const [rovers, setRovers] = useState([]);

  useEffect(() => {
    const getRovers = async () => {
      await fetch(getRoversURL)
        .then((response) => response.json())
        .then((data) => {
          setRovers(data.rovers);
        });
    };
    getRovers();
  }, []);

  const select = (rover) => {
    navigation.navigate("Select Sol", {
      rover: rover,
    });
  };

  return (
    <LinearGradient
      // Button Linear Gradient
      colors={["#000108", "#03111C"]}
      style={styles.container}
    >
      {rovers?.length === 0 ? (
        <ActivityIndicator size="large" color="#ff0000" />
      ) : (
        <View style={styles.cardContainer}>
          {rovers.map((rover, index) => (
            <TouchableOpacity onPress={() => select(rover)} key={index}>
              <RoverCard roverName={rover.name} status={rover.status} />
            </TouchableOpacity>
          ))}
        </View>
      )}
    </LinearGradient>
  );
};

export default RoverScreen;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  cardContainer: {
    width: "100%",
    paddingHorizontal: 20,
  },
});
