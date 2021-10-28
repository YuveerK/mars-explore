import React, { useState, useEffect } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Button,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const APOD = () => {
  const [pod, setPod] = useState([]);
  const [text, onChangeText] = useState("");

  useEffect(() => {
    const getPod = async () => {
      try {
        const API_KEY = "HvEcKggUkmfHcMEvKoM8DwRPKNzml0l8wH55HOZ4";
        let url = `https://api.nasa.gov/planetary/apod?thumbs=true&api_key=${API_KEY}`;
        await fetch(url)
          .then((response) => response.json())
          .then((data) => {
            setPod(data);
          });
      } catch (error) {
        setPod(null);
      }
    };
    getPod();
  }, []);

  const getImage = async () => {
    try {
      const API_KEY = "HvEcKggUkmfHcMEvKoM8DwRPKNzml0l8wH55HOZ4";
      let url =
        text === ""
          ? `https://api.nasa.gov/planetary/apod?thumbs=true&api_key=${API_KEY}`
          : `https://api.nasa.gov/planetary/apod?date=${text}&thumbs=true&api_key=${API_KEY}`;
      await fetch(url)
        .then((response) => response.json())
        .then((data) => {
          setPod(data);
        });
    } catch (error) {
      setPod(null);
    }
  };
  return (
    <LinearGradient
      // Button Linear Gradient
      colors={["#000108", "#03111C"]}
      style={styles.container}
    >
      <ScrollView>
        {pod?.length === 0 && (
          <View
            style={{
              width: "100%",
              height: 350,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ActivityIndicator size="large" color="#ff0000" />
          </View>
        )}
        {pod.thumbnail_url ? (
          <Image
            source={{ uri: `${pod.thumbnail_url}` }}
            style={styles.podImage}
          />
        ) : (
          <Image source={{ uri: `${pod.hdurl}` }} style={styles.podImage} />
        )}

        {pod?.length !== 0 && (
          <>
            <View>
              <TextInput
                style={styles.input}
                onChangeText={onChangeText}
                value={text}
                placeholder={"YYYY-MM-MM"}
                placeholderTextColor="lightgrey"
              />

              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => getImage()}
                >
                  <Text style={styles.text}>Search</Text>
                </TouchableOpacity>
              </View>
            </View>
            <Text style={[styles.text, { textAlign: "center" }]}>
              {pod.title}
            </Text>
            <Text style={styles.text}>Copyright: {pod.copyright}</Text>
            <Text style={styles.text}>Date: {pod.date}</Text>
            <Text style={styles.text}>Explanation: {pod.explanation}</Text>
          </>
        )}
      </ScrollView>
    </LinearGradient>
  );
};

export default APOD;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
  },
  podImage: {
    width: "100%",
    height: 350,
    resizeMode: "cover",
  },
  text: {
    fontSize: 15,
    color: "#fff",
    marginVertical: 15,
    lineHeight: 30,
  },
  input: {
    height: 50,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    color: "white",
    borderWidth: 1,
    borderColor: "white",
  },
  buttonContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    width: "60%",
    margin: "auto",
    backgroundColor: "red",
    alignItems: "center",
    justifyContent: "center",
  },
});
