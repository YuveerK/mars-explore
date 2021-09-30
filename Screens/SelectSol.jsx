import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import TypeWriter from "react-native-typewriter";
import { AntDesign } from "@expo/vector-icons";

const SelectSol = ({ route, navigation }) => {
  const roverName = route.params.rover;
  const solDays = route.params.solDays;
  const roverCameras = route.params.cameras;
  const [cameraName, setCameraName] = useState("");
  //state
  const [text, onChangeText] = React.useState("Useless Text");
  const [number, onChangeNumber] = useState(null);
  const [click, setClick] = useState(null);
  const [clicked, setClicked] = useState(false);
  const [menuClick, setMenuClick] = useState(false);

  const getImage = (roverName) => {
    if (roverName === "Curiosity") {
      return require("../assets/Curiosity.jpg");
    }
    if (roverName === "Spirit") {
      return require("../assets/Spirit.jpg");
    }
    if (roverName === "Opportunity") {
      return require("../assets/Opportunity.jpg");
    }
    if (roverName === "Perseverance") {
      return require("../assets/Perseverance.jpg");
    }
  };

  const getPictures = (index, cameraName) => {
    setClicked(!clicked);
    setClick(index);
    setCameraName(cameraName);
  };

  const toggleMenu = () => {
    setMenuClick(!menuClick);
  };
  return (
    <View style={{ backgroundColor: "black" }}>
      <ScrollView>
        <View style={styles.container}>
          <View style={{ width: "100%", alignItems: "center", padding: 15 }}>
            <TypeWriter typing={1} style={styles.title}>
              You have selected the {roverName} rover{" "}
            </TypeWriter>
          </View>
          <Image style={styles.rover} source={getImage(roverName)} />

          <View style={styles.avoid}>
            <View style={styles.headingsContainer}>
              <Text style={styles.headings}>Sol Details</Text>
            </View>
            <Text style={styles.rootTextStyles}>
              Please Select a sol day from 0 to {solDays}
            </Text>
            <TextInput
              style={styles.input}
              onChangeText={onChangeNumber}
              value={number}
              placeholder="Enter Sol Day..."
              placeholderTextColor={"white"}
              keyboardType="numeric"
            />
          </View>

          <View style={styles.cameraContainer}>
            <View style={styles.cameraHeadingsContainer}>
              <View>
                <Text style={styles.headings}>Camera Details</Text>
                <Text style={{ marginLeft: 15, color: "white" }}>
                  Please select a camera (Optional)
                </Text>
              </View>
              <TouchableOpacity onPress={() => toggleMenu()}>
                {menuClick === false ? (
                  <AntDesign
                    name="down"
                    size={24}
                    color="white"
                    style={{ marginRight: 15 }}
                  />
                ) : (
                  <AntDesign
                    name="up"
                    size={24}
                    color="black"
                    color="white"
                    style={{ marginRight: 15 }}
                  />
                )}
              </TouchableOpacity>
            </View>

            {menuClick && (
              <View style={styles.cameras}>
                {roverCameras.map((camera, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => getPictures(index, camera.name)}
                    style={
                      click === index && clicked
                        ? styles.cameraContentClicked
                        : styles.cameraContentUnclicked
                    }
                  >
                    <Text style={styles.rootTextStyles}>
                      {camera.full_name}
                    </Text>
                    <Text style={styles.rootTextStyles}>{camera.name}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
        </View>
      </ScrollView>

      {number != "" && number != null && (
        <TouchableOpacity
          style={styles.btn}
          onPress={() => {
            navigation.navigate("View Images", {
              solDays: number,
              camera: cameraName,
              roverName: roverName,
              clicked: clicked,
            });
          }}
        >
          <Text style={{ color: "white", fontSize: 25 }}>View Images</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default SelectSol;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    padding: 15,
  },
  btn: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",

    backgroundColor: "#00493d",
    padding: 10,
    position: "absolute",
    bottom: 0,
  },
  cameraContainer: {
    width: "100%",
    borderColor: "#00493d",
    borderWidth: 5,
    marginBottom: 100,
  },
  cameraHeadingsContainer: {
    width: "100%",
    paddingVertical: 20,
    borderBottomColor: "#00493d",
    borderBottomWidth: 2,
    backgroundColor: "rgba(0, 73, 61, 0.4)",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    justifyContent: "space-between",
  },
  cameraHeadings: {
    width: "100%",
    backgroundColor: "yellow",
  },
  headingsContainer: {
    marginBottom: 15,
  },
  headings: {
    fontSize: 40,
    color: "white",
    marginLeft: 15,
  },
  cameras: {
    width: "100%",
    flexWrap: "wrap",
    padding: 15,
  },
  cameraContentUnclicked: {
    width: "100%",
    padding: 25,
    borderColor: "#00493d",
    borderWidth: 2,
    marginVertical: 15,
    backgroundColor: "rgba(0, 73, 61, 0.2)",
  },

  cameraContentClicked: {
    width: "100%",
    padding: 25,
    borderColor: "#00493d",
    borderWidth: 10,
    marginVertical: 15,
    backgroundColor: "rgba(0, 73, 61, 0.2)",
  },
  avoid: {},
  input: {
    height: 40,
    marginVertical: 20,
    width: "100%",
    borderWidth: 1,
    padding: 10,
    color: "white",
    borderColor: "white",
  },
  rootTextStyles: {
    color: "white",
  },
  image: {
    width: "100%",
    flex: 1,
    resizeMode: "contain",
    position: "relative",
  },
  rover: {
    width: "100%",
    height: 400,
    marginBottom: 20,
  },
  title: {
    color: "white",
    fontSize: 20,
  },
});
