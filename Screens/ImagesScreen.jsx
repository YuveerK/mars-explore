import React, { useState, useEffect } from "react";
import {
  FlatList,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

const ImagesScreen = ({ route, navigation }) => {
  const API_KEY = "HvEcKggUkmfHcMEvKoM8DwRPKNzml0l8wH55HOZ4";
  const roverName = route.params.roverName;
  const solDays = route.params.solDays;
  const cameraName = route.params.camera;
  const clickState = route.params.clicked;
  const ImageURL = clickState
    ? `https://api.nasa.gov/mars-photos/api/v1/rovers/${roverName}/photos?api_key=${API_KEY}&sol=${solDays}&camera=${cameraName}`
    : `https://api.nasa.gov/mars-photos/api/v1/rovers/${roverName}/photos?api_key=${API_KEY}&sol=${solDays}`;

  console.log(ImageURL);
  //state
  const [images, setImages] = useState([]);

  useEffect(() => {
    const getImages = async () => {
      await fetch(ImageURL)
        .then((response) => response.json())
        .then((data) => {
          try {
            setImages(data.photos);
          } catch (error) {
            setImages([]);
          }
        });
    };
    getImages();
  }, []);

  return (
    <View style={{ backgroundColor: "#131313" }}>
      <View style={styles.feed}>
        <FlatList
          data={images}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={{ width: "100%" }}>
              <Image
                style={styles.tinyLogo}
                source={{
                  uri: item.img_src,
                }}
              />
              <View style={styles.infoContainer}>
                <View style={{ flexDirection: "row" }}>
                  <Text style={styles.rootTextHeading}>Earth Date:</Text>
                  <Text style={styles.rootTextContent}>{item.earth_date}</Text>
                </View>

                <View style={{ flexDirection: "row" }}>
                  <Text style={styles.rootTextHeading}>Camera Name:</Text>
                  <Text style={styles.rootTextContent}>
                    {item.camera.full_name}
                  </Text>
                </View>
              </View>
            </View>
          )}
        />

        {/* {images.map((image, index) => (
          ))} */}
      </View>
    </View>
  );
};

export default ImagesScreen;

const styles = StyleSheet.create({
  image: {
    width: "100%",
    flex: 1,
    resizeMode: "contain",
  },
  rootTextHeading: {
    color: "white",
  },

  rootTextContent: {
    color: "white",
    marginLeft: 10,
  },
  infoContainer: {
    width: "100%",
    borderBottomWidth: 2,
    borderBottomColor: "lightgrey",
    padding: 15,
    justifyContent: "space-between",
  },
  feed: {
    width: "100%",
    padding: 0,
  },
  tinyLogo: {
    width: "100%",
    height: 500,
    marginVertical: 20,
  },
});
