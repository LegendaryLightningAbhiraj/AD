import React, { useEffect, useState } from "react";

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import { useNavigation } from "expo-router";
import { DrawerActions } from "@react-navigation/native";

import QuoteCard from "../../../components/quotecard";
import AppCard from "../../../components/appcard";

import api from "../../../lib/api";

import { COLORS } from "../../../constants/theme";

export default function Home() {
  // Access the parent Drawer navigator
  const drawerNavigation = useNavigation("/drawer");

  const [data, setData] = useState<any>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  // Open and close drawer
  const openDrawer = () => {
    drawerNavigation.dispatch(DrawerActions.toggleDrawer());
  };

  // Fetch dashboard data
  useEffect(() => {
    api
      .get("/api/summary")
      .then((response) => {
        setData(response.data);
        setError("");
      })
      .catch((err) => {
        console.log("Dashboard API error:", err);
        setError("Unable to connect to server");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <View style={styles.screen}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >

        {/* HEADER */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>
              YOUR DAILY OVERVIEW
            </Text>

            <Text style={styles.heading}>
              Stay focused.
            </Text>
          </View>

          {/* DRAWER BUTTON */}
          <TouchableOpacity
            onPress={openDrawer}
            style={styles.menuButton}
            activeOpacity={0.7}
          >
            <Ionicons
              name="menu"
              size={30}
              color="white"
            />
          </TouchableOpacity>
        </View>

        {/* LOADING STATE */}
        {loading ? (
          <View style={styles.loading}>
            <ActivityIndicator color={COLORS.primary} />

            <Text style={styles.muted}>
              Loading your dashboard...
            </Text>
          </View>
        ) : (
          <>
            {/* ERROR MESSAGE */}
            {error ? (
              <Text style={styles.error}>
                {error}
              </Text>
            ) : null}

            {/* SCREEN TIME DASHBOARD */}
            {data && (
              <>
                <AppCard>
                  <Text style={styles.label}>
                    TOTAL SCREEN TIME
                  </Text>

                  <Text style={styles.bigNumber}>
                    {Math.floor(data.screenTime / 60)}h{" "}
                    {data.screenTime % 60}m
                  </Text>

                  <Text style={styles.muted}>
                    Daily goal: {data.goal} minutes
                  </Text>
                </AppCard>

                {/* FOCUS TIME AND PICKUPS */}
                <View style={styles.row}>
                  <AppCard style={styles.smallCard}>
                    <Ionicons
                      name="timer-outline"
                      size={25}
                      color={COLORS.primary}
                    />

                    <Text style={styles.number}>
                      {data.focusTime}m
                    </Text>

                    <Text style={styles.muted}>
                      Focus time
                    </Text>
                  </AppCard>

                  <AppCard style={styles.smallCard}>
                    <Ionicons
                      name="phone-portrait-outline"
                      size={25}
                      color={COLORS.primary}
                    />

                    <Text style={styles.number}>
                      {data.pickups}
                    </Text>

                    <Text style={styles.muted}>
                      Pickups
                    </Text>
                  </AppCard>
                </View>

                {/* DAILY MISSION */}
                <AppCard>
                  <Text style={styles.cardHeading}>
                    Your daily mission
                  </Text>

                  <Text style={styles.muted}>
                    Spend less time scrolling and more time creating.
                  </Text>

                  <View style={styles.progressBackground}>
                    <View style={styles.progress} />
                  </View>
                </AppCard>
              </>
            )}

            {/* PUBLIC REST API */}
            <QuoteCard />

            {/* FOCUS SESSION */}
            <TouchableOpacity
              style={styles.focusButton}
              activeOpacity={0.8}
            >
              <Text style={styles.focusText}>
                START FOCUS SESSION
              </Text>
            </TouchableOpacity>
          </>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  container: {
    flex: 1,
  },

  content: {
    padding: 20,
    paddingBottom: 35,
  },

  loading: {
    justifyContent: "center",
    alignItems: "center",
    padding: 30,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 30,
  },

  menuButton: {
    width: 45,
    height: 45,
    justifyContent: "center",
    alignItems: "center",
  },

  greeting: {
    color: COLORS.secondary,
    fontSize: 11,
    letterSpacing: 2,
  },

  heading: {
    color: COLORS.text,
    fontSize: 28,
    fontWeight: "bold",
    marginTop: 8,
  },

  label: {
    color: COLORS.secondary,
    fontSize: 12,
  },

  bigNumber: {
    color: COLORS.primary,
    fontSize: 42,
    fontWeight: "bold",
    marginVertical: 15,
  },

  muted: {
    color: COLORS.secondary,
    marginTop: 8,
  },

  row: {
    flexDirection: "row",
    gap: 10,
  },

  smallCard: {
    flex: 1,
  },

  number: {
    color: COLORS.text,
    fontSize: 27,
    fontWeight: "bold",
    marginTop: 12,
  },

  cardHeading: {
    color: COLORS.text,
    fontSize: 18,
    fontWeight: "bold",
  },

  progressBackground: {
    backgroundColor: "#353740",
    height: 9,
    borderRadius: 10,
    marginTop: 20,
  },

  progress: {
    backgroundColor: COLORS.primary,
    width: "65%",
    height: 9,
    borderRadius: 10,
  },

  focusButton: {
    backgroundColor: COLORS.primary,
    padding: 18,
    borderRadius: 15,
    marginVertical: 20,
  },

  focusText: {
    textAlign: "center",
    fontWeight: "bold",
    color: "#101114",
  },

  error: {
    color: COLORS.danger,
    marginBottom: 15,
  },
});