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
import logo from "../assets/dbskills-logo.png";
import { Image } from "react-native";
import { getProfile, getTodayAttendance } from "../api/attendanceApi";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
export default function DashboardScreen() {
  const navigation = useNavigation();
  const route = useRoute();

const [employeeName, setEmployeeName] = useState("");
const [checkInTime, setCheckInTime] = useState(null);
const [checkOutTime, setCheckOutTime] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  const today = new Date();
  const formattedDate = today.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const [location, setLocation] = useState(null);

   const liveTime = currentTime.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  };
useEffect(() => {
  (async () => {
    let { status } =
      await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") return;

    // 🚀 Try cached location first (instant)
    const lastLocation =
      await Location.getLastKnownPositionAsync();

    if (lastLocation) {
      setLocation(lastLocation.coords);
    } else {
      // fallback (low accuracy = faster)
      const freshLocation =
        await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Low,
        });

      setLocation(freshLocation.coords);
    }
  })();
}, []);
useEffect(() => {
  loadProfile();
  loadAttendance();
}, []);

const loadProfile = async () => {
  try {
    const res = await getProfile();

    if (res.success) {
      setEmployeeName(res.data.name);
    }

  } catch (error) {
    console.log("Profile error:", error);
  }
};

const formatTime = (time) => {
  if (!time) return null;
  return new Date(time).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

const loadAttendance = async () => {
  try {
    const res = await getTodayAttendance();

    if (res.success && res.data) {
      setCheckInTime(formatTime(res.data.checkIn?.time));
      setCheckOutTime(formatTime(res.data.checkOut?.time));
    } else {
      setCheckInTime(null);
      setCheckOutTime(null);
    }

  } catch (error) {
    console.log("Attendance error:", error?.response?.data || error.message);
  }
};


 

const handleLogout = () => {
  Alert.alert(
    "Logout",
    "Are you sure you want to logout?",
    [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: async () => {
          await AsyncStorage.removeItem("token");
          navigation.reset({
            index: 0,
            routes: [{ name: "Login" }],
          });
        },
      },
    ]
  );
};


 
  return (
    <SafeAreaView style={styles.container}>
        <LinearGradient
          colors={["#0D1B2A", "#1B2D45", "#163354"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.header}
        >
          {/* Top Row */}
          <View style={styles.topRow}>
            <View style={styles.logoRow}>
              <View style={styles.logoWrap}>
                <Image source={logo} style={styles.logo} />
              </View>
              <Text style={styles.brandText}>DB Skills</Text>
            </View>

            <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout} activeOpacity={0.8}>
              <Ionicons name="log-out-outline" size={20} color="#fff" />
            </TouchableOpacity>
          </View>

          {/* Greeting */}
          <View style={styles.greetSection}>
            <Text style={styles.greetSmall}>{getGreeting()} 👋</Text>
            <Text style={styles.greetName}>
              {employeeName || "Employee"}
            </Text>
            {/* <Text style={styles.greetDate}>{formattedDate}</Text> */}
          </View>

     {/* Greeting + Clock Row */}
<View style={styles.greetRow}>

  {/* Left Side */}
  <View style={styles.greetSection}>
    <Text style={styles.greetSmall}>{getGreeting()} 👋</Text>
    <Text style={styles.greetName}>
      {employeeName || "Employee"}
    </Text>
  </View>

  {/* Right Side */}
  <View style={styles.clockBadge}>
    <Ionicons name="time-outline" size={15} color="#2BB5CE" />
    <Text style={styles.clockText}>{liveTime}</Text>
  </View>

</View> 
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

<Text style={styles.timeTextLarge}>
      {checkInTime ? checkInTime : "--:--"}
    </Text>

    <View style={styles.statusRow}>
      {checkInTime ? (
        <View style={styles.successBadge}>
          <Text style={styles.successText}>Success</Text>
        </View>
      ) : (
        <View style={styles.pendingBadge}>
          <Text style={styles.pendingBadgeText}>Pending</Text>
        </View>
      )}
    </View>
            </TouchableOpacity>

            {/* CHECK OUT */}
             
            <TouchableOpacity
  style={styles.checkCard}
  onPress={() => navigation.navigate("CheckOut")}
>

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
  <Text style={styles.timeTextLarge}>
      {checkOutTime ? checkOutTime : "--:--"}
    </Text>

    <View style={styles.statusRow}>
      {checkOutTime ? (
        <View style={styles.successBadge}>
          <Text style={styles.successText}>Success</Text>
        </View>
      ) : (
        <View style={styles.pendingBadge}>
          <Text style={styles.pendingBadgeText}>Pending</Text>
        </View>
      )}
    </View>
           </TouchableOpacity>
          </View>

<View style={styles.mapBox}>
  {location ? (
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
  ) : (
    <View style={styles.mapLoading}>
      <Ionicons name="location-outline" size={24} color="#999" />
      <Text style={{ marginTop: 5, color: "#999" }}>
        Fetching location...
      </Text>
    </View>
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
    paddingHorizontal: 22,
    paddingTop: 16,
    paddingBottom: 36,
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  logoWrap: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.12)",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  logo: {
    width: 36,
    height: 36,
    resizeMode: "contain",
  },
  brandText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "700",
    letterSpacing: 0.3,
  },
  logoutBtn: {
    backgroundColor: "#F0622D",
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  greetSection: {
    marginTop: 22,
  },
  greetSmall: {
    color: "#93C5FD",
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 4,
  },
  greetName: {
    color: "#fff",
    fontSize: 26,
    fontWeight: "800",
    letterSpacing: -0.3,
  },
  greetDate: {
    color: "#94A3B8",
    fontSize: 13,
    marginTop: 4,
  },
  clockBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(43,181,206,0.15)",
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginTop: 16,
    gap: 6,
    borderWidth: 1,
    borderColor: "rgba(43,181,206,0.3)",
  },
  clockText: {
    color: "#2BB5CE",
    fontWeight: "700",
    fontSize: 14,
    letterSpacing: 1,
  },
greetRow: {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  marginTop: 24,
},

greetSection: {
  flex: 1,
},

clockBadge: {
  flexDirection: "row",
  alignItems: "center",
  backgroundColor: "rgba(43,181,206,0.15)",
  paddingHorizontal: 12,
  paddingVertical: 6,
  borderRadius: 20,
  borderWidth: 1,
  borderColor: "rgba(43,181,206,0.3)",
},

  mainCard: {
    flex: 1,
    backgroundColor: "#F4F4F4",
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
  marginTop: -20,
    paddingTop: 24,
    paddingHorizontal: 18,
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
    backgroundColor: "#2BB5CE",
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
 timeTextLarge: {
  fontSize: 25,
  fontWeight: "bold",
  color: "#111",
  letterSpacing: 2,
  padding:4
},

statusRow: {
  marginTop: 15,
  alignItems: "flex-start",
},

successBadge: {
  backgroundColor: "#D1FAE5",
  paddingHorizontal: 12,
  paddingVertical: 5,
  borderRadius: 20,
},

successText: {
  color: "#059669",
  fontWeight: "600",
  fontSize: 12,
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
mapLoading: {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#EDEDED",
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
