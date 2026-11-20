import React, { useEffect } from "react";

import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
} from "react-native";

import { router } from "expo-router";

import { useAuth } from "../context/AuthContext";

import { COLORS } from "../constants/theme";

export default function SplashScreen() {
  const { user, loading } = useAuth();

  useEffect(() => {
    if (loading) return;

    const timer = setTimeout(() => {
      if (user) {
        router.replace("/drawer/tabs/home" as never);
      } else {
        router.replace("/auth/login");
      }
    }, 1500);

    return () => clearTimeout(timer);
  }, [loading, user]);

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>FOCUSLY.</Text>

      <Text style={styles.subtitle}>
        Take back your time.
      </Text>

      <ActivityIndicator
        color={COLORS.primary}
        style={{ marginTop: 30 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    justifyContent: "center",
    alignItems: "center",
  },

  logo: {
    color: COLORS.primary,
    fontSize: 42,
    fontWeight: "900",
    letterSpacing: 2,
  },

  subtitle: {
    color: COLORS.secondary,
    marginTop: 10,
    fontSize: 15,
  },
});