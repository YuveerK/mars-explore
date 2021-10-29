import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useFonts, Michroma_400Regular } from "@expo-google-fonts/michroma";
import { Entypo } from "@expo/vector-icons";
const RoverCard = ({ roverName, status }) => {
  let [fontsLoaded] = useFonts({
    Michroma_400Regular,
  });
  return (
    <>
      <View style={styles.card} activeOpacity={0.6}>
        <View style={styles.cardRow}>
          <Text style={styles.cardHeading}>{roverName}</Text>
          <Entypo name="chevron-small-right" size={24} color="white" />
        </View>
        <Text style={styles.text}>Status: {status}</Text>
      </View>
    </>
  );
};

export default RoverCard;

const styles = StyleSheet.create({
  card: {
    width: "100%",
    borderWidth: 1,
    borderColor: "lightgrey",
    padding: 20,
    marginVertical: 30,

    borderRadius: 10,
  },
  cardRow: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  cardHeading: {
    fontFamily: "Michroma_400Regular",
    color: "white",
    fontSize: 20,
  },
  text: {
    fontFamily: "Michroma_400Regular",
    color: "white",
    fontSize: 12,
    marginTop: 5,
  },
});
