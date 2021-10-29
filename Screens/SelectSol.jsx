import React, { useEffect, useState } from "react";
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
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useFonts, Michroma_400Regular } from "@expo-google-fonts/michroma";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { EvilIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import DescriptionCard from "../components/SelectSol/DescriptionCard";
import Slider from "@react-native-community/slider";

const SelectSol = ({ route, navigation }) => {
  const rover = route.params.rover;
  const roverCameras = route.params.rover.cameras;
  let [fontsLoaded] = useFonts({
    Michroma_400Regular,
  });
  //state
  const [sliderSol, setSliderSol] = useState(0);
  const [sol, setSol] = useState(0);
  const [clicked, setClicked] = useState(false);
  const [cameraClicked, setCameraClicked] = useState(null);
  const [roverCameraClicked, setRoverCameraClicked] = useState(false);
  const [cameraNamePage, setCameraNamePage] = useState(null);
  const [image, setImage] = useState(null);
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
      return require("../assets/Perseverance.gif");
    }
  };

  const logNumber = (number) => {
    setSliderSol(number.toFixed(0));
  };
  const increment = () => {
    setSliderSol(Number(sliderSol) + 1);
  };
  const decrement = () => {
    setSliderSol(Number(sliderSol) - 1);
  };

  const yesClicked = () => {
    setClicked(!clicked);
  };

  const setCameraIndex = (index) => {
    setCameraClicked(index);
    setRoverCameraClicked(!roverCameraClicked);
    if (roverCameraClicked === true) {
      setCameraNamePage(null);
    } else {
      setCameraNamePage(roverCameras[index].name);
    }
  };

  return (
    <LinearGradient
      // Button Linear Gradient
      colors={["#000108", "#03111C"]}
      style={styles.container}
    >
      <KeyboardAwareScrollView style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.container}
          nestedScrollEnabled={true}
        >
          <Image source={getImage(rover.name)} style={styles.roverImage} />
          <Text style={styles.headingText}>{rover.name} Rover</Text>
          <View style={styles.underlineContainer}>
            <View style={styles.underline}></View>
          </View>
          <View style={styles.textContainer}>
            <DescriptionCard
              icon={<EvilIcons name="camera" size={40} color="white" />}
              heading={"Cameras"}
              number={rover.cameras.length}
            />
            <DescriptionCard
              icon={
                <MaterialCommunityIcons
                  name="rocket-outline"
                  size={30}
                  color="white"
                />
              }
              heading={"Landing"}
              number={rover.landing_date}
            />
            <DescriptionCard
              icon={
                <MaterialCommunityIcons
                  name="rocket-launch-outline"
                  size={30}
                  color="white"
                />
              }
              heading={"Launch"}
              number={rover.launch_date}
            />
            <DescriptionCard
              icon={<Fontisto name="date" size={30} color="white" />}
              heading={"Last Date"}
              number={rover.max_date}
            />
            <DescriptionCard
              icon={
                <Ionicons name="md-today-outline" size={30} color="white" />
              }
              heading={"Max Sol"}
              number={rover.max_sol}
            />
            <DescriptionCard
              icon={<FontAwesome name="photo" size={30} color="white" />}
              heading={"Photos"}
              number={rover.total_photos}
            />
          </View>

          <View style={styles.searchContainer}>
            <Text style={[styles.headingText, { fontSize: 20 }]}>
              Sol {sliderSol} of {rover.max_sol}
            </Text>
            <View style={styles.row}>
              <TouchableOpacity onPress={() => decrement()}>
                <FontAwesome name="minus-square-o" size={24} color="white" />
              </TouchableOpacity>
              <Slider
                style={{
                  width: Dimensions.get("screen").width - 100,
                  height: 40,
                  borderWidth: 10,
                }}
                minimumValue={0}
                maximumValue={rover.max_sol}
                minimumTrackTintColor="#FFFFFF"
                maximumTrackTintColor="#ffffff"
                onValueChange={(number) => logNumber(number)}
                value={sliderSol}
              />
              <TouchableOpacity onPress={() => increment()}>
                <Octicons name="diff-added" size={24} color="white" />
              </TouchableOpacity>
            </View>

            <View style={styles.viewCamerasContainer}>
              <TouchableOpacity
                onPress={() => yesClicked()}
                style={styles.SelectCameraRow}
              >
                <Text style={styles.text}>Select Camera (Optional)</Text>
                {clicked === true ? (
                  <>
                    <FontAwesome
                      name="minus-square-o"
                      size={24}
                      color="white"
                    />
                  </>
                ) : (
                  <Octicons name="diff-added" size={24} color="white" />
                )}
              </TouchableOpacity>
              <View
                style={
                  clicked === false
                    ? styles.listContainer1
                    : styles.listContainer2
                }
              >
                <ScrollView nestedScrollEnabled={true}>
                  {clicked === true &&
                    roverCameras.map((camera, index) => (
                      <TouchableOpacity
                        key={index}
                        style={styles.listItem}
                        onPress={() => setCameraIndex(index)}
                      >
                        <Text style={[styles.text, { width: "80%" }]}>
                          {index + 1}. {camera.full_name}
                        </Text>
                        {cameraClicked === index &&
                        roverCameraClicked === true ? (
                          <FontAwesome5
                            name="check-circle"
                            size={24}
                            color="white"
                          />
                        ) : (
                          <Entypo
                            name="chevron-small-right"
                            size={24}
                            color="white"
                          />
                        )}
                      </TouchableOpacity>
                    ))}
                </ScrollView>
              </View>

              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("View Images", {
                    solDays: sliderSol,
                    roverCamera: cameraNamePage,
                    roverName: rover.name,
                  })
                }
                style={{ marginBottom: 80, marginTop: 40 }}
              >
                <Text style={styles.headingText}>View Images</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAwareScrollView>
    </LinearGradient>
  );
};

export default SelectSol;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
  },
  headingText: {
    fontFamily: "Michroma_400Regular",
    fontSize: 30,
    color: "white",
    textAlign: "center",
  },

  text: {
    fontSize: 10,
    color: "white",
    marginBottom: 5,
    fontFamily: "Michroma_400Regular",
  },
  roverImage: {
    width: Dimensions.get("screen").width,
    height: Dimensions.get("screen").height / 2 + 80,
    resizeMode: "cover",
  },
  textContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    flexWrap: "wrap",
  },

  textNumber: {
    fontSize: 15,
    color: "white",
    fontWeight: "bold",
  },
  underlineContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  underline: {
    width: "60%",
    height: 1,
    marginTop: 5,
    backgroundColor: "lightgrey",
  },
  searchContainer: {
    marginTop: 20,
    width: "100%",
    padding: 15,
  },
  track: {
    height: 80,
    borderBottomRightRadius: 20,
    borderTopRightRadius: 20,
  },
  row: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    padding: 10,
  },
  viewCamerasContainer: {},
  SelectCameraRow: {
    width: "100%",
    backgroundColor: "#0c293f",
    padding: 14,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    marginTop: 30,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  listContainer1: {
    width: "100%",
    backgroundColor: "#0d202e",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  listContainer2: {
    width: "100%",
    height: 300,
    backgroundColor: "#0d202e",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  listItem: {
    width: "100%",
    padding: 20,
    marginBottom: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
