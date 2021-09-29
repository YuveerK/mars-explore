import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
} from "react-native";

const RoverScreen = ({ navigation }) => {
  const API_KEY = "HvEcKggUkmfHcMEvKoM8DwRPKNzml0l8wH55HOZ4";

  //URLS
  const getRoversURL = `https://api.nasa.gov/mars-photos/api/v1/rovers/?api_key=${API_KEY}`;
  const getManifestInfoURL = `https://api.nasa.gov/mars-photos/api/v1/manifests/Curiosity?api_key=${API_KEY}`;

  //state
  const [rovers, setRovers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [click, setClick] = useState(null);
  const [roverCameras, setRoverCameras] = useState([]);

  useEffect(() => {
    const getRovers = async () => {
      await fetch(getRoversURL)
        .then((response) => response.json())
        .then((data) => {
          setRovers(data.rovers);
          setRoverCameras(data.rovers.cameras);
        });
    };
    setLoading(true);
    getRovers();
  }, []);

  const select = (index, roverName, maxSol, roverCameras) => {
    setClick(index);
    navigation.navigate("Select Sol", {
      id: index,
      rover: roverName,
      solDays: maxSol,
      cameras: roverCameras,
    });
  };
  return (
    <ImageBackground source={require("../assets/bg.jpg")} style={styles.image}>
      <View style={styles.container}>
        <View style={styles.roverContainer}>
          {rovers.length > 0 ? (
            rovers.map((rover, index) => (
              <TouchableOpacity
                key={index}
                onPress={() =>
                  select(index, rover.name, rover.max_sol, rover.cameras)
                }
              >
                <Text
                  style={
                    click === index ? styles.clickedBox : styles.unclickedBox
                  }
                >
                  {rover.name}
                </Text>
              </TouchableOpacity>
            ))
          ) : (
            <Text style={styles.loading}>Loading...</Text>
          )}
        </View>
      </View>
    </ImageBackground>
  );
};

export default RoverScreen;

const styles = StyleSheet.create({
  image: {
    width: "100%",
    flex: 1,
    resizeMode: "contain",
  },
  loading: {
    color: "white",
  },
  container: {
    width: "100%",
    flexWrap: "wrap",
    padding: 20,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  roverContainer: {
    width: "100%",
  },
  unclickedBox: {
    width: "100%",
    fontSize: 30,
    color: "white",
    padding: 20,
    marginVertical: 15,
    borderColor: "#00493d",
    borderWidth: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  clickedBox: {
    width: "100%",
    fontSize: 30,
    color: "white",
    padding: 20,
    marginVertical: 15,
    borderColor: "#00977e",
    borderWidth: 10,
    alignItems: "center",
    justifyContent: "center",
  },
});
