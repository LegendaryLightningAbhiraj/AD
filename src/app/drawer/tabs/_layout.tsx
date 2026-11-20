import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import { COLORS } from "../../../constants/theme";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,

        tabBarStyle: {
          display: "flex",
          backgroundColor: "#1B1D23",
          borderTopColor: "#30323A",
          borderTopWidth: 1,
          height: 70,
          paddingBottom: 8,
          paddingTop: 8,
        },

        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: "#777",

        tabBarLabelStyle: {
          fontSize: 11,
        },

        tabBarHideOnKeyboard: true,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={String(color)} />
          ),
        }}
      />

      <Tabs.Screen
        name="rules"
        options={{
          title: "Rules",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="shield-checkmark-outline" size={size} color={String(color)} />
          ),
        }}
      />

      <Tabs.Screen
        name="squad"
        options={{
          title: "Squads",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="people-outline" size={size} color={String(color)} />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={size} color={String(color)} />
          ),
        }}
      />
    </Tabs>
  );
}