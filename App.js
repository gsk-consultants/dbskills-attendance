import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginScreen from "./src/screens/LoginScreen";
import DashboardScreen from "./src/screens/DashboardScreen";
import CheckInScreen from "./src/screens/CheckInScreen"; // ✅ ADD THIS
import CheckOutScreen from "./src/screens/CheckOutScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Dashboard" component={DashboardScreen} />
          <Stack.Screen name="CheckIn" component={CheckInScreen} /> 
          <Stack.Screen name="CheckOut" component={CheckOutScreen} />

          {/* ✅ ADD THIS */}
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
