import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import { LinearGradient } from "expo-linear-gradient";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { COLORS } from "../theme/colors";
import logo from "../assets/dbskills-logo.png";
import { useNavigation } from "@react-navigation/native";
import { employeeLogin } from "../api/authApi";

export default function LoginScreen() {
  const [passwordVisible, setPasswordVisible] = useState(false);
const navigation = useNavigation();
const [username, setUsername] = useState("");
const [password, setPassword] = useState("");
const [loading, setLoading] = useState(false);

const handleLogin = async () => {
  if (!username || !password) {
    alert("Please enter username and password");
    return;
  }

  try {
    setLoading(true);

    const res = await employeeLogin({
      username,
      password,
    });

    if (res.success && res.role === "user") {
      navigation.replace("Dashboard");
    } else {
      alert("Invalid credentials");
    }

  } catch (error) {
    alert("Login failed");
  } finally {
    setLoading(false);
  }
};

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <LinearGradient
        colors={[COLORS.primary, COLORS.secondary]}
        style={styles.header}
      >
        <View  >
          <Image source={logo} style={styles.logo} resizeMode="contain" />
        </View>
      </LinearGradient>

      {/* Login Card */}
      <View style={styles.card}>
        <Text style={styles.loginText}>Welcome Back </Text>
        <Text style={styles.subText}>Login to continue</Text>

        {/* Email */}
        <View style={styles.inputContainer}>
          <MaterialIcons name="email" size={22} color={COLORS.primary} />
        <TextInput
  placeholder="Username"
  placeholderTextColor={COLORS.gray}
  style={styles.input}
  value={username}
  onChangeText={setUsername}
/>

        </View>

        {/* Password */}
        <View style={styles.inputContainer}>
          <Ionicons name="lock-closed" size={22} color={COLORS.primary} />
      <TextInput
  placeholder="Password"
  placeholderTextColor={COLORS.gray}
  secureTextEntry={!passwordVisible}
  style={styles.input}
  value={password}
  onChangeText={setPassword}
/>

          <TouchableOpacity
            onPress={() => setPasswordVisible(!passwordVisible)}
          >
            <Ionicons
              name={passwordVisible ? "eye" : "eye-off"}
              size={22}
              color={COLORS.gray}
            />
          </TouchableOpacity>
        </View>

        {/* Button */}
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>LOGIN</Text>
        </TouchableOpacity>

        <Text style={styles.forgot}>Forgot Password?</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightBg,
  },

  header: {
    height: 320,
    justifyContent: "center",
    alignItems: "center",
    borderBottomLeftRadius: 60,
    borderBottomRightRadius: 60,
  },

 

  logo: {
    width: 200,
    height:170,
  },

  card: {
    marginHorizontal: 25,
    marginTop: -60,
    backgroundColor: COLORS.white,
    padding: 25,
    borderRadius: 30,
    elevation: 20,
  },

  loginText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#222",
    textAlign: "center",
  },

  subText: {
    textAlign: "center",
    color: COLORS.gray,
    marginBottom: 25,
    marginTop: 5,
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 50,
    paddingHorizontal: 20,
    height: 55,
    marginBottom: 18,
    backgroundColor: "#FAFAFA",
  },

  input: {
    flex: 1,
    marginLeft: 10,
  },

  button: {
    backgroundColor: COLORS.primary,
    paddingVertical: 16,
    borderRadius: 50,
    alignItems: "center",
    marginTop: 10,
    elevation: 8,
  },

  buttonText: {
    color: COLORS.white,
    fontWeight: "bold",
    fontSize: 16,
    letterSpacing: 1,
  },

  forgot: {
    textAlign: "center",
    marginTop: 20,
    color: COLORS.primary,
    fontWeight: "500",
  },
});
