import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { useNavigation, useRoute } from "@react-navigation/native";

export default function DashboardScreen() {
  const navigation = useNavigation();
  const route = useRoute();

  const checkInTime = route?.params?.checkInTime;

  const today = new Date();
  const formattedDate = today.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const [location, setLocation] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } =
        await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") return;

      let currentLocation =
        await Location.getCurrentPositionAsync({});
      setLocation(currentLocation.coords);
    })();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER */}
      <LinearGradient
        colors={["#0F172A", "#0B1220"]}
        style={styles.header}
      >
        <View style={styles.topRow}>
          <Text style={styles.homeText}>Home</Text>

          <TouchableOpacity style={styles.logoutBtn}>
            <Ionicons name="log-out-outline" size={22} color="#000" />
          </TouchableOpacity>
        </View>

        <Text style={styles.smallText}>
          Time to do what you do best !
        </Text>

        <Text style={styles.helloText}>Hello, KishoreS</Text>
      </LinearGradient>

      {/* MAIN */}
      <View style={styles.mainCard}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* OVERVIEW */}
          <View style={styles.overviewRow}>
            <Text style={styles.sectionTitle}>Overview</Text>

            <View style={styles.dateBadge}>
              <Ionicons name="calendar-outline" size={16} />
              <Text style={styles.dateText}>{formattedDate}</Text>
            </View>
          </View>

          {/* CHECK ROW */}
          <View style={styles.checkRow}>
            {/* CHECK IN */}
            <TouchableOpacity
              style={styles.checkCard}
              onPress={() => navigation.navigate("CheckIn")}
            >
              <View style={styles.cardTopRow}>
                <View style={styles.arrowCircle}>
                  <Ionicons
                    name="arrow-forward"
                    size={14}
                    color="#fff"
                  />
                </View>

                <Text style={styles.checkHeading}>Check in</Text>

                <View style={styles.menuCircle}>
                  <Ionicons
                    name="ellipsis-horizontal"
                    size={16}
                    color="#555"
                  />
                </View>
              </View>

              <View style={styles.timeRow}>
                <Text style={styles.dashTime}>
                  {checkInTime ? checkInTime : "--:--"}
                </Text>

                {checkInTime ? (
                  <View style={styles.successBadge}>
                    <Text style={styles.successText}>
                      Success
                    </Text>
                  </View>
                ) : (
                  <View style={styles.statusBadgeGray}>
                    <Text style={styles.statusText}>
                      n/a
                    </Text>
                  </View>
                )}
              </View>

              <Text style={styles.pendingText}>
                {checkInTime
                  ? "Checked in successfully"
                  : "Not checked in yet"}
              </Text>
            </TouchableOpacity>

            {/* CHECK OUT */}
            <View style={styles.checkCard}>
              <View style={styles.cardTopRow}>
                <View style={styles.arrowCircle}>
                  <Ionicons
                    name="arrow-back"
                    size={14}
                    color="#fff"
                  />
                </View>

                <Text style={styles.checkHeading}>
                  Check out
                </Text>

                <View style={styles.menuCircle}>
                  <Ionicons
                    name="ellipsis-horizontal"
                    size={16}
                    color="#555"
                  />
                </View>
              </View>

              <View style={styles.timeRow}>
                <Text style={styles.dashTime}>--:--</Text>

                <View style={styles.statusBadgeGray}>
                  <Text style={styles.statusText}>
                    n/a
                  </Text>
                </View>
              </View>

              <Text style={styles.pendingText}>
                Not checked out yet
              </Text>
            </View>
          </View>

          {/* MAP */}
          <View style={styles.mapBox}>
            {location && (
              <MapView
                style={styles.map}
                initialRegion={{
                  latitude: location.latitude,
                  longitude: location.longitude,
                  latitudeDelta: 0.01,
                  longitudeDelta: 0.01,
                }}
              >
                <Marker
                  coordinate={{
                    latitude: location.latitude,
                    longitude: location.longitude,
                  }}
                />
              </MapView>
            )}
          </View>
                    {/* Attendance */}
          <View style={styles.sectionRow}>
            <Text style={styles.sectionTitle}>Your attendance</Text>
            <Text style={styles.link}>See All</Text>
          </View>

          {/* Leaves */}
          <View style={styles.sectionRow}>
            <Text style={styles.sectionTitle}>Leaves</Text>
            <Text style={styles.link}>See All</Text>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0B1220",
   
  },

  header: {
    padding: 20,
    paddingBottom: 40,
  },

  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  homeText: {
    color: "#fff",
    fontSize: 18,
  },

  logoutBtn: {
    backgroundColor: "#F5E7D3",
    padding: 10,
    borderRadius: 30,
  },

  smallText: {
    color: "#B0B8C5",
    marginTop: 20,
  },

  helloText: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "bold",
    marginTop: 5,
  },

  mainCard: {
    flex: 1,
    backgroundColor: "#F4F4F4",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
  },

  overviewRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
  },

  dateBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EDEDED",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
  },

  dateText: {
    marginLeft: 5,
  },

  checkRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  },

  checkCard: {
    backgroundColor: "#fff",
    width: "48%",
    padding: 15,
    borderRadius: 20,
  },

  cardTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  checkHeading: {
    fontSize: 16,
    fontWeight: "600",
  },

  arrowCircle: {
    backgroundColor: "#8FA3FF",
    padding: 8,
    borderRadius: 20,
  },

  menuCircle: {
    backgroundColor: "#F2F2F2",
    padding: 8,
    borderRadius: 20,
  },

  timeRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15,
  },

  dashTime: {
    fontSize: 24,
    fontWeight: "bold",
  },

  amText: {
    marginLeft: 5,
    color: "#999",
  },

  statusBadgeGray: {
    marginLeft: "auto",
    backgroundColor: "#D9D9D9",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 15,
  },

  statusText: {
    fontSize: 12,
  },

  pendingText: {
    marginTop: 10,
    color: "#777",
  },

  sectionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 25,
    alignItems: "center",
  },

  link: {
    color: "#2BB5CE",
  },

 mapBox: {
  height: 160,
  borderRadius: 20,
  overflow: "hidden",
  marginTop: 15,
},

map: {
  width: "100%",
  height: "100%",
},

});
