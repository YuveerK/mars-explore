import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
  ScrollView,
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

  const getImage = (roversName) => {
    if (roversName === "Curiosity") {
      return require("../assets/Curiosity.jpg");
    }
    if (roversName === "Spirit") {
      return require("../assets/Spirit.jpg");
    }
    if (roversName === "Opportunity") {
      return require("../assets/Opportunity.jpg");
    }
    if (roversName === "Perseverance") {
      return require("../assets/Perseverance.jpg");
    }
  };

  return (
    <ImageBackground source={require("../assets/bg.jpg")} style={styles.image}>
      <ScrollView>
        <View style={styles.roverContainer}>
          {rovers.length > 0 ? (
            rovers.map((rover, index) => (
              <TouchableOpacity
                key={index}
                onPress={() =>
                  select(index, rover.name, rover.max_sol, rover.cameras)
                }
                style={
                  click === index ? styles.clickedBox : styles.unclickedBox
                }
              >
                <Text
                  style={{
                    color: "white",
                    fontSize: 30,
                    width: "100%",
                    padding: 15,
                    backgroundColor: "rgba(0, 73, 61, 0.7)",
                  }}
                >
                  {rover.name}
                </Text>

                <Image style={styles.rover} source={getImage(rover.name)} />

                <View
                  style={{
                    width: "100%",
                    backgroundColor: "rgba(0, 73, 61, 0.7)",
                  }}
                >
                  <View style={styles.ContentView}>
                    <Text style={styles.contentTitle}>Landing Date:</Text>

                    <Text style={styles.contentDescription}>
                      {rover.landing_date}
                    </Text>
                  </View>
                  <View style={styles.ContentView}>
                    <Text style={styles.contentTitle}>Launch Date:</Text>

                    <Text style={styles.contentDescription}>
                      {rover.launch_date}
                    </Text>
                  </View>
                  <View style={styles.ContentView}>
                    <Text style={styles.contentTitle}>Status:</Text>

                    <Text style={styles.contentDescription}>
                      {rover.status}
                    </Text>
                  </View>
                  <View style={styles.ContentView}>
                    <Text style={styles.contentTitle}>Max Sol:</Text>

                    <Text style={styles.contentDescription}>
                      {rover.max_sol}
                    </Text>
                  </View>
                  <View style={styles.ContentView}>
                    <Text style={styles.contentTitle}>Latest Date:</Text>

                    <Text style={styles.contentDescription}>
                      {rover.max_date}
                    </Text>
                  </View>
                  <View style={styles.ContentView}>
                    <Text style={styles.contentTitle}>Total Photos:</Text>

                    <Text style={styles.contentDescription}>
                      {rover.total_photos}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))
          ) : (
            <View
              style={{
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                source={require("../assets/rover-loading.png")}
                style={{
                  width: "80%",
                  height: 400,
                  resizeMode: "contain",
                }}
              />
              <Text style={styles.loading}>Loading...</Text>
            </View>
          )}
        </View>
      </ScrollView>
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
  ContentView: {
    flexDirection: "row",
    width: "100%",
    padding: 5,
  },
  contentTitle: {
    color: "white",
    fontSize: 15,
  },
  contentDescription: {
    color: "white",
    fontSize: 15,
    marginLeft: 10,
  },
  rover: {
    width: "100%",
    height: 400,
    resizeMode: "cover",
  },
  loading: {
    color: "white",
    fontSize: 30,
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
    marginVertical: 15,
    borderTopColor: "#00493d",
    borderBottomColor: "#00493d",
    borderWidth: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  clickedBox: {
    width: "100%",
    fontSize: 30,
    color: "white",
    marginVertical: 15,
    borderTopColor: "#00493d",
    borderBottomColor: "#00493d",
    borderWidth: 10,
    alignItems: "center",
    justifyContent: "center",
  },
});
