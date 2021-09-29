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
    <ImageBackground source={require("../assets/bg.jpg")} style={styles.image}>
      <View style={styles.feed}>
        <FlatList
          data={images}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Image
              style={styles.tinyLogo}
              source={{
                uri: item.img_src,
              }}
            />
          )}
        />

        {/* {images.map((image, index) => (
          ))} */}
      </View>
    </ImageBackground>
  );
};

export default ImagesScreen;

const styles = StyleSheet.create({
  image: {
    width: "100%",
    flex: 1,
    resizeMode: "contain",
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
