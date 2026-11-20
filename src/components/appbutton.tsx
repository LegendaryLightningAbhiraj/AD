import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";
import { COLORS } from "../constants/theme";

interface Props {
  title: string;
  onPress: () => void;
}

export default function AppButton({ title, onPress }: Props) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.primary,
    padding: 16,
    borderRadius: 14,
    alignItems: "center",
    marginVertical: 10,
  },
  text: {
    color: "#101114",
    fontWeight: "bold",
    fontSize: 16,
  },
});