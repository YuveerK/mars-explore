import { LinearGradient } from "expo-linear-gradient";
import React, { useState, useEffect } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useFonts, Michroma_400Regular } from "@expo-google-fonts/michroma";

const ImagesScreen = ({ route, navigation }) => {
  let [fontsLoaded] = useFonts({
    Michroma_400Regular,
  });
  const API_KEY = "HvEcKggUkmfHcMEvKoM8DwRPKNzml0l8wH55HOZ4";
  const roverName = route.params.roverName;
  const solDays = route.params.solDays;
  const roverCamera = route.params.roverCamera;

  const ImageURL =
    route.params.roverCamera !== null
      ? `https://api.nasa.gov/mars-photos/api/v1/rovers/${roverName}/photos?api_key=${API_KEY}&sol=${solDays}&camera=${roverCamera}`
      : `https://api.nasa.gov/mars-photos/api/v1/rovers/${roverName}/photos?api_key=${API_KEY}&sol=${solDays}`;

  //state
  const [images, setImages] = useState([]);

  useEffect(() => {
    const getImages = async () => {
      try {
        await fetch(ImageURL)
          .then((response) => response.json())
          .then((data) => {
            setImages(data.photos);
          });
      } catch (error) {
        setImages(null);
      }
    };
    getImages();
    checkIfEmpty(images);
  }, []);

  const checkIfEmpty = (images) => {
    if (images?.length === 0) {
      setImages(null);
    }
  };

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
  console.log(images);
  console.log(ImageURL);

  renderItem = ({ item }) => (
    <View style={styles.imageView}>
      <View style={styles.imageViewHeader}>
        <View style={styles.row}>
          <Image
            source={getImage(roverName)}
            style={[styles.image, { width: 30, height: 30, borderRadius: 50 }]}
          />

          <Text style={[styles.text, { marginLeft: 20 }]}>{roverName}</Text>
        </View>
      </View>
      <Image source={{ uri: `${item.img_src}` }} style={styles.image} />
      <View style={styles.imageViewFooter}>
        <Text style={styles.text}>Sol: {item.sol}</Text>
        <Text style={styles.text}>{item.camera.full_name}</Text>
      </View>
    </View>
  );

  return (
    <LinearGradient
      // Button Linear Gradient
      colors={["#000108", "#03111C"]}
      style={styles.container}
    >
      {images?.length === 0 && (
        <View style={styles.error}>
          <Image
            source={require("../assets/error.png")}
            style={{ width: Dimensions.get("screen").width, height: 180 }}
          />
          <Text
            style={{
              fontSize: 20,
              color: "white",
              fontFamily: "Michroma_400Regular",
              textAlign: "center",
              lineHeight: 40,
            }}
          >
            No Images Found. Please Choose a different camera or sol.
            Alternatively, you can only select a sol which will return all of
            the pictures taken by all cameras that day....
          </Text>
        </View>
      )}
      <FlatList
        data={images}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        initialNumToRender={20}
      />
    </LinearGradient>
  );
};

export default ImagesScreen;

const styles = StyleSheet.create({
  error: {
    width: "100%",
    height: Dimensions.get("screen").height,
    alignItems: "center",
    padding: 60,
  },
  container: {
    width: "100%",
    flex: 1,
  },
  image: {
    width: "100%",
    height: Dimensions.get("screen").height / 2 - 50,
    resizeMode: "cover",
  },
  imageView: {
    marginVertical: 15,
  },
  imageViewHeader: {
    width: "100%",
    height: 50,
    backgroundColor: "black",
    justifyContent: "center",
    paddingHorizontal: 15,
  },
  row: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    color: "white",
    fontFamily: "Michroma_400Regular",
  },
  imageViewFooter: {
    padding: 20,
    backgroundColor: "black",
  },
});
