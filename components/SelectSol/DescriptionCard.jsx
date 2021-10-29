import React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { useFonts, Michroma_400Regular } from "@expo-google-fonts/michroma";

const DescriptionCard = ({ icon, heading, number }) => {
  let [fontsLoaded] = useFonts({
    Michroma_400Regular,
  });
  return (
    <View style={styles.descriptionCard}>
      <View style={styles.cardRow}>
        <View style={styles.cardRowAlign}>
          {icon}
          <Text style={styles.text}>{heading}</Text>
        </View>
      </View>
      <Text style={styles.textNumber}>{number}</Text>
    </View>
  );
};

export default DescriptionCard;

const styles = StyleSheet.create({
  descriptionCard: {
    width: Dimensions.get("screen").width / 3 - 30,
    height: 100,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    margin: 15,
    borderColor: "lightgrey",
    borderRadius: 10,
  },
  cardRow: {
    width: "100%",
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  cardRowAlign: {
    alignItems: "center",
    justifyContent: "center",
  },
  textNumber: {
    fontSize: 15,
    color: "white",
    fontWeight: "bold",
  },
  text: {
    fontSize: 10,
    color: "white",
    marginBottom: 5,
    fontFamily: "Michroma_400Regular",
  },
});
