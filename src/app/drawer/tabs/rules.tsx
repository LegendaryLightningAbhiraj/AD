import React, { useEffect, useState } from "react";

import {
  View,
  Text,
  StyleSheet,
  Switch,
  ScrollView,
  ActivityIndicator,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import api from "../../../lib/api";

import AppCard from "../../../components/appcard";

import { COLORS } from "../../../constants/theme";

export default function Rules() {
  const [apps, setApps] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchApps = async () => {
    try {
      const response = await api.get("/api/blocked-apps");
      setApps(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApps();
  }, []);

  const toggleApp = async (id: number, value: boolean) => {
    try {
      const response = await api.patch(`/api/blocked-apps/${id}`, {
        blocked: value,
      });

      setApps((previous) =>
        previous.map((app) =>
          app.id === id ? response.data : app
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Your Rules</Text>

      <Text style={styles.subtitle}>
        Control the apps that distract you.
      </Text>

      {loading ? (
        <ActivityIndicator color={COLORS.primary} />
      ) : (
        apps.map((app) => (
          <AppCard key={app.id}>
            <View style={styles.item}>
              <Ionicons
                name={app.icon}
                size={30}
                color={COLORS.primary}
              />

              <View style={{ flex: 1, marginLeft: 15 }}>
                <Text style={styles.name}>{app.name}</Text>
                <Text style={styles.category}>{app.category}</Text>
              </View>

              <Switch
                value={app.blocked}
                onValueChange={(value) =>
                  toggleApp(app.id, value)
                }
                trackColor={{ true: COLORS.primary }}
              />
            </View>
          </AppCard>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 20,
  },
  heading: {
    color: COLORS.text,
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 30,
  },
  subtitle: {
    color: COLORS.secondary,
    marginVertical: 15,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
  },
  name: {
    color: COLORS.text,
    fontWeight: "bold",
    fontSize: 16,
  },
  category: {
    color: COLORS.secondary,
    marginTop: 5,
  },
});