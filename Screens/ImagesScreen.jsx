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
            console.log(error);
          }
        });
    };
    getImages();
    checkIfEmpty();
  }, []);

  const checkIfEmpty = () => {
    if (images?.length === 0) {
      setImages(null);
    }
  };
  console.log(images);
  return (
    <ImageBackground source={require("../assets/bg.jpg")} style={styles.image}>
      <View style={styles.feed}>
        {images?.length > 0 && (
          <FlatList
            data={images}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View
                style={{
                  width: "100%",
                  backgroundColor: "rgba(0, 73, 61, 0.4)",

                  marginVertical: 15,
                }}
              >
                <Image
                  style={styles.tinyLogo}
                  source={{
                    uri: item.img_src,
                  }}
                />
                <View style={styles.infoContainer}>
                  <View style={{ flexDirection: "row" }}>
                    <Text style={styles.rootTextHeading}>Earth Date:</Text>
                    <Text style={styles.rootTextContent}>
                      {item.earth_date}
                    </Text>
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
        )}
      </View>
      {images === null ? (
        <View
          style={{ width: "100%", height: "100%", backgroundColor: "black" }}
        >
          <Text style={{ color: "white", fontSize: 60 }}>Loading</Text>
        </View>
      ) : (
        <View
          style={{ width: "100%", height: "100%", backgroundColor: "black" }}
        >
          <Image
            source={require("../assets/error.png")}
            style={{ width: "100%", height: 400 }}
          />
          <Text
            style={{
              color: "white",
              width: "100%",
              textAlign: "center",
              fontSize: 30,
            }}
          >
            Could not find any images. Please select a different camera
          </Text>
        </View>
      )}
    </ImageBackground>
  );
};

export default ImagesScreen;

const styles = StyleSheet.create({
  image: {
    width: "100%",
    flex: 1,
    resizeMode: "cover",
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
  },
});
