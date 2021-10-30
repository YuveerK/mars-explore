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
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import DateTimePicker from "@react-native-community/datetimepicker";
import { AntDesign } from "@expo/vector-icons";

const APOD = () => {
  const [pod, setPod] = useState([]);
  const [text, onChangeText] = useState("");
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const windowHeight = Dimensions.get("window").height;

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);

    let tempDate = new Date(currentDate);
    let fDate =
      tempDate.getFullYear() +
      "-" +
      (tempDate.getMonth() + 1) +
      "-" +
      tempDate.getDate();
    onChangeText(fDate.toString());
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

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
      console.log(url);
    } catch (error) {
      setPod(null);
    }
  };

  console.log(pod);
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
            style={[styles.podImage, { height: windowHeight / 2 }]}
          />
        ) : (
          <Image
            source={{ uri: `${pod.url}` }}
            style={[styles.podImage, { height: windowHeight / 2 }]}
          />
        )}

        {pod?.length !== 0 && (
          <>
            <View style={styles.searchContainer}>
              <TextInput
                style={styles.input}
                onChangeText={onChangeText}
                value={text}
                placeholder={"YYYY-MM-MM"}
                placeholderTextColor="lightgrey"
              />
              <TouchableOpacity onPress={showDatepicker}>
                <AntDesign name="calendar" size={30} color="white" />
              </TouchableOpacity>
            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => getImage()}
              >
                <Text style={styles.text}>Search</Text>
              </TouchableOpacity>
            </View>

            <View>
              {show && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={date}
                  mode={mode}
                  is24Hour={true}
                  display="default"
                  onChange={onChange}
                />
              )}
            </View>
            <View>
              <Text
                style={[
                  styles.text,
                  {
                    textAlign: "center",
                    fontFamily: "Michroma_400Regular",
                    fontSize: 40,
                    lineHeight: 50,
                  },
                ]}
              >
                {pod.title}
              </Text>
              <View style={{ padding: 20 }}>
                {pod.copyright && (
                  <Text style={styles.text}>
                    Copyright: {"\n"}
                    <Text style={styles.fontfam}>{pod.copyright}</Text>
                  </Text>
                )}
                <Text style={styles.text}>
                  Date: {"\n"}
                  <Text style={styles.fontfam}>{pod.date}</Text>
                </Text>
                <Text style={styles.text}>
                  Explanation: {"\n"}
                  {pod.explanation}
                </Text>
              </View>
            </View>
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
    padding: 10,
    color: "white",
    width: "60%",
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
    elevation: 3,
    borderRadius: 20,
  },
  searchContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#0b2941",
    padding: 10,
    marginBottom: 20,
  },
  fontfam: {
    fontFamily: "Michroma_400Regular",
  },
});
