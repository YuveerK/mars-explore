import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ImageBackground,
  Image,
  TouchableOpacity,
  StatusBar,
  Pressable,
} from "react-native";
import { useFonts, Michroma_400Regular } from "@expo-google-fonts/michroma";
import { LinearGradient } from "expo-linear-gradient";

const LandingScreen = ({ navigation }) => {
  let [fontsLoaded] = useFonts({
    Michroma_400Regular,
  });

  if (!fontsLoaded) {
    return <Text>Fonts not loaded</Text>;
  } else {
    return (
      <LinearGradient
        // Button Linear Gradient
        colors={["#000108", "#03111C"]}
        style={styles.container}
      >
        <StatusBar barStyle="light-content" hidden={false} translucent={true} />

        <Text style={styles.text}>Mars Explore</Text>

        <View style={styles.cardContainer}>
          <TouchableOpacity
            style={styles.card}
            activeOpacity={0.8}
            onPress={() => navigation.navigate("APOD")}
          >
            <View style={styles.cardTextHeading}>
              <Image
                source={require("../assets/apod.jpg")}
                style={styles.cardImage}
              />
              <View style={{ position: "absolute" }}>
                <Text style={styles.cardText}>
                  Astronomy Picture of The Day
                </Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.card}
            activeOpacity={0.8}
            onPress={() => navigation.navigate("Select a Rover")}
          >
            <View style={styles.cardTextHeading}>
              <Image
                source={require("../assets/mars.jpg")}
                style={styles.cardImage}
              />
              <View style={{ position: "absolute" }}>
                <Text style={styles.cardText}>Mars Explorer</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    );
  }
};

export default LandingScreen;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    paddingTop: StatusBar.currentHeight,
    flex: 1,
    alignItems: "center",
  },
  cardContainer: {
    width: "100%",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
  },
  card: {
    width: "100%",
    height: 300,
    borderWidth: 1,
    borderColor: "lightgrey",
    borderRadius: 30,
    marginVertical: 20,
    position: "relative",
  },

  text: {
    backgroundColor: "transparent",
    fontSize: 40,
    color: "#fff",
    fontFamily: "Michroma_400Regular",
  },
  cardText: {
    fontSize: 20,
    color: "#fff",
    fontFamily: "Michroma_400Regular",
    textAlign: "center",
  },
  cardTextHeading: {
    alignItems: "center",
    justifyContent: "center",
  },
  cardImage: {
    width: "100%",
    height: "100%",
    borderRadius: 30,
    resizeMode: "cover",
  },
});
