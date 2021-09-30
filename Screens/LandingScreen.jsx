import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ImageBackground,
  Image,
  TouchableOpacity,
} from "react-native";
const LandingScreen = ({ navigation }) => {
  return (
    <ImageBackground
      source={require("../assets/mars-landingscreen.jpg")}
      style={styles.image}
    >
      <View style={styles.headingContainer}>
        <Text style={styles.mainHeading}>Mars Explorer</Text>
      </View>

      <View style={styles.button}>
        <TouchableOpacity onPress={() => navigation.navigate("Select a Rover")}>
          <Text style={styles.exploreBtn}>Explore!</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default LandingScreen;

const styles = StyleSheet.create({
  image: {
    width: "100%",
    flex: 1,
    resizeMode: "contain",
  },
  headingContainer: {
    width: "100%",
    alignItems: "center",
    paddingTop: 80,
  },
  mainHeading: {
    fontSize: 50,
    fontWeight: "bold",
  },
  subHeading: {
    fontSize: 30,
    marginTop: 20,
    textAlign: "center",
  },
  button: {
    position: "absolute",
    width: "100%",
    height: "100%",

    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  exploreBtn: {
    backgroundColor: "rgba(255,255,255,0.5)",
    padding: 20,
    fontSize: 40,
  },
});
