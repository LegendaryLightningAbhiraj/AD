import React, { useEffect, useState } from "react";

import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
} from "react-native";

import { doc, getDoc } from "firebase/firestore";
import { signOut } from "firebase/auth";

import { db, auth } from "../../../lib/firebase";

import { useAuth } from "../../../context/AuthContext";

import AppButton from "../../../components/appbutton";

import { router } from "expo-router";

import { COLORS } from "../../../constants/theme";

export default function Profile() {
  const { user } = useAuth();

  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        const result = await getDoc(
          doc(db, "users", user.uid)
        );

        if (result.exists()) {
          setProfile(result.data());
        }
      } catch (error) {
        console.log("Profile error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user]);

  const logout = async () => {
    await signOut(auth);
    router.replace("/auth/login");
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator color={COLORS.primary} />
      </View>
    );
  }

  const streak = profile?.currentStreak ?? 0;
  const longestStreak = profile?.longestStreak ?? 0;
  const savedMinutes = profile?.totalSavedMinutes ?? 0;

  const savedHours = Math.floor(savedMinutes / 60);
  const remainingMinutes = savedMinutes % 60;

  const savedDays = (savedMinutes / 60 / 24).toFixed(1);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* PROFILE HEADING */}
      <Text style={styles.heading}>Your Profile</Text>

      {/* AVATAR */}
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>
          {profile?.name?.charAt(0)?.toUpperCase() || "U"}
        </Text>
      </View>

      <Text style={styles.name}>
        {profile?.name || "User"}
      </Text>

      <Text style={styles.email}>
        {profile?.email || user?.email}
      </Text>

      {/* FOCUS STREAK */}
      <View style={styles.statCard}>
        <Text style={styles.cardTitle}>🔥 Focus Streak</Text>

        <Text style={styles.bigNumber}>
          {streak} days
        </Text>

        <Text style={styles.description}>
          Current consecutive focus days
        </Text>

        <View style={styles.divider} />

        <Text style={styles.secondaryText}>
          Longest streak: {longestStreak} days
        </Text>
      </View>

      {/* TIME SAVED */}
      <View style={styles.statCard}>
        <Text style={styles.cardTitle}>⏳ Time Saved</Text>

        <Text style={styles.bigNumber}>
          {savedHours}h {remainingMinutes}m
        </Text>

        <Text style={styles.description}>
          Approximately {savedDays} days of time saved
        </Text>

        <Text style={styles.secondaryText}>
          Every minute counts. Keep going!
        </Text>
      </View>

      {/* EXISTING PROFILE DETAILS */}
      <View style={styles.details}>
        <Text style={styles.cardTitle}>
          Account Details
        </Text>

        <Text style={styles.detail}>
          UID: {user?.uid}
        </Text>

        <Text style={styles.detail}>
          Total focus minutes: {profile?.totalFocusMinutes ?? 0}
        </Text>
      </View>

      {/* LOGOUT */}
      <AppButton
        title="Logout"
        onPress={logout}
      />

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  content: {
    padding: 25,
    paddingBottom: 40,
  },

  heading: {
    color: COLORS.text,
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 25,
  },

  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginTop: 35,
  },

  avatarText: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#101114",
  },

  name: {
    color: COLORS.text,
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 20,
  },

  email: {
    color: COLORS.secondary,
    textAlign: "center",
    marginTop: 8,
    marginBottom: 25,
  },

  statCard: {
    backgroundColor: COLORS.surface,
    padding: 22,
    borderRadius: 18,
    marginVertical: 10,
  },

  cardTitle: {
    color: COLORS.primary,
    fontSize: 17,
    fontWeight: "bold",
  },

  bigNumber: {
    color: COLORS.text,
    fontSize: 34,
    fontWeight: "bold",
    marginTop: 18,
  },

  description: {
    color: COLORS.secondary,
    marginTop: 8,
  },

  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: 18,
  },

  secondaryText: {
    color: COLORS.secondary,
    marginTop: 12,
  },

  details: {
    backgroundColor: COLORS.surface,
    padding: 20,
    borderRadius: 15,
    marginVertical: 20,
  },

  detail: {
    color: COLORS.text,
    marginVertical: 8,
  },
});