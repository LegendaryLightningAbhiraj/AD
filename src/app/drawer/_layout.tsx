import { Drawer } from "expo-router/drawer";
import { Ionicons } from "@expo/vector-icons";

import { COLORS } from "../../constants/theme";

export default function DrawerLayout() {
  return (
    <Drawer
      screenOptions={{
        headerShown: false,
        drawerType: "front",
        swipeEnabled: true,

        drawerStyle: {
          backgroundColor: COLORS.surface,
          width: 280,
        },

        drawerActiveTintColor: COLORS.primary,
        drawerInactiveTintColor: COLORS.text,

        drawerLabelStyle: {
          fontSize: 15,
        },
      }}
    >
      <Drawer.Screen
        name="tabs"
        options={{
          title: "Dashboard",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={String(color)} />
          ),
        }}
      />

      <Drawer.Screen
        name="setting"
        options={{
          title: "Settings",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="settings-outline" size={size} color={String(color)} />
          ),
        }}
      />

      <Drawer.Screen
        name="legal"
        options={{
          title: "Rules & Regulations",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="document-text-outline" size={size} color={String(color)} />
          ),
        }}
      />
    </Drawer>
  );
}