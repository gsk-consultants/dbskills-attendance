import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { COLORS } from "../theme/colors";

export default function CustomInput({
  icon,
  placeholder,
  secureTextEntry,
}) {
  return (
    <View style={styles.container}>
      {icon}
      <TextInput
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        placeholderTextColor={COLORS.gray}
        style={styles.input}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 14,
    paddingHorizontal: 15,
    height: 55,
    marginBottom: 18,
    backgroundColor: COLORS.white,
  },
  input: {
    flex: 1,
    marginLeft: 10,
  },
});
