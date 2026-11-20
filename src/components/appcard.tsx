import React from "react";
import { View, StyleSheet, ViewProps } from "react-native";
import { COLORS, RADIUS } from "../constants/theme";

export default function AppCard({ children, style }: ViewProps) {
  return (
    <View style={[styles.card, style]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.large,
    padding: 18,
    marginVertical: 8,
  },
});