import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CameraView, useCameraPermissions } from "expo-camera";
import * as Location from "expo-location";
import MapView, { Marker } from "react-native-maps";
import { Ionicons } from "@expo/vector-icons";

export default function CheckInScreen({ navigation }) {
  const cameraRef = useRef(null);
  const [permission, requestPermission] = useCameraPermissions();
  const [photo, setPhoto] = useState(null);
  const [location, setLocation] = useState(null);
  const [time, setTime] = useState("");
const [cameraType, setCameraType] = useState("front");

  useEffect(() => {
    (async () => {
      const locStatus =
        await Location.requestForegroundPermissionsAsync();

      if (locStatus.status === "granted") {
        const currentLocation =
          await Location.getCurrentPositionAsync({});
        setLocation(currentLocation.coords);
      }

      const now = new Date();
      setTime(
        now.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })
      );
    })();
  }, []);

  const takePhoto = async () => {
    if (cameraRef.current) {
      const result = await cameraRef.current.takePictureAsync();
      setPhoto(result.uri);
    }
  };

  const confirmCheckIn = () => {
    navigation.replace("Dashboard", {
      checkInTime: time,
    });
  };

  if (!permission) return <View style={{ flex: 1 }} />;

  if (!permission.granted) {
    return (
      <View style={styles.permissionContainer}>
        <Text style={{ marginBottom: 20 }}>
          Camera permission required
        </Text>
        <TouchableOpacity
          style={styles.permissionBtn}
          onPress={requestPermission}
        >
          <Text style={{ color: "#fff" }}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.outerContainer}>
      <View style={styles.cardContainer}>
        {/* HEADER */}
        <View style={styles.headerRow}>
          <View style={styles.titlePill}>
            <Text style={styles.titleText}>Check In</Text>
          </View>
<TouchableOpacity
  style={styles.switchCircle}
  onPress={() =>
    setCameraType(prev =>
      prev === "front" ? "back" : "front"
    )
  }
>
  <Ionicons name="camera-reverse" size={20} />
</TouchableOpacity>

          <TouchableOpacity
            style={styles.closeCircle}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="close" size={20} />
          </TouchableOpacity>
        </View>

        {/* CAMERA OR PREVIEW */}
        {!photo ? (
          <View style={styles.cameraWrapper}>
          <CameraView
  style={styles.camera}
  ref={cameraRef}
  facing={cameraType}
/>


            <View style={styles.timePill}>
              <Ionicons
                name="time-outline"
                size={16}
                color="#7B8DFF"
              />
              <Text style={styles.timeText}>{time}</Text>
            </View>
          </View>
        ) : (
          <View style={styles.cameraWrapper}>
            <Image
              source={{ uri: photo }}
              style={styles.camera}
            />

            <View style={styles.timePill}>
              <Ionicons
                name="time-outline"
                size={16}
                color="#7B8DFF"
              />
              <Text style={styles.timeText}>{time}</Text>
            </View>
          </View>
        )}

        {/* LOCATION CARD */}
        {location && (
          <View style={styles.locationCard}>
            <View style={styles.locationHeader}>
              <Ionicons
                name="location"
                size={18}
                color="#7B8DFF"
              />
              <Text style={styles.locationTitle}>
                Current Location
              </Text>
            </View>

            <MapView
              style={styles.map}
              initialRegion={{
                latitude: location.latitude,
                longitude: location.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
              }}
            >
              <Marker coordinate={location} />
            </MapView>
          </View>
        )}

        {/* BUTTONS */}
        {!photo ? (
         <View >
  <TouchableOpacity style={styles.primaryBtn}
            onPress={takePhoto}
   >

            <Text style={styles.primaryBtnText}>
              Take Photo
            </Text>
          </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={styles.secondaryBtn}
              onPress={() => setPhoto(null)}
            >
              <Text>Retake</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.primaryBtn}
              onPress={confirmCheckIn}
            >
              <Text style={styles.primaryBtnText}>
                Confirm Check In
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "center",
  },

cardContainer: {
  backgroundColor: "#fff",
  margin: 10,
  borderRadius: 30,
  padding: 15,
  flex: 1,
  justifyContent: "space-between",
},


  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  titlePill: {
    backgroundColor: "#F2F2F2",
    paddingHorizontal: 15,
    paddingVertical: 6,
    borderRadius: 20,
  },

  titleText: {
    fontWeight: "600",
  },

  closeCircle: {
    backgroundColor: "#F2F2F2",
    width: 35,
    height: 35,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
  },

  cameraWrapper: {
    borderRadius: 20,
    overflow: "hidden",
    marginTop: 15,
  },

  camera: {
    width: "100%",
    height:500,
  },

  timePill: {
    position: "absolute",
    bottom: 15,
    alignSelf: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 25,
    flexDirection: "row",
    alignItems: "center",
    elevation: 5,
  },

  timeText: {
    marginLeft: 5,
    fontWeight: "600",
  },

  locationCard: {
    marginTop: 15,
    backgroundColor: "#F7F7F7",
    borderRadius: 20,
    padding: 10,
  },

  locationHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },

  locationTitle: {
    marginLeft: 6,
    fontWeight: "600",
  },

  map: {
    height: 120,
    borderRadius: 15,
  },
primaryBtn: {
  flex: 2,
  backgroundColor: "#000",
  paddingVertical: 5,   // ✅ increase height
  borderRadius: 30,
  alignItems: "center",
  justifyContent: "center",

  shadowColor: "#000",
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.3,
  shadowRadius: 5,
  elevation: 6,
},


primaryBtnText: {
  color: "#fff",
  fontWeight: "700",
  fontSize: 16,
  letterSpacing: 0.5,
},


secondaryBtn: {
  flex: 1,
  backgroundColor: "#E0E0E0",
  paddingVertical: 18,
  borderRadius: 30,
  alignItems: "center",
  justifyContent: "center",
  marginRight: 12,
},



buttonRow: {
  flexDirection: "row",
  marginTop: 30,
},

switchCircle: {
  backgroundColor: "#F2F2F2",
  width: 35,
  height: 35,
  borderRadius: 18,
  justifyContent: "center",
  alignItems: "center",
  marginRight: 10,
},


  permissionContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  permissionBtn: {
    backgroundColor: "#000",
    padding: 15,
    borderRadius: 20,
  },
});

