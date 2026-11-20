import React, { useEffect, useState } from "react";

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import api from "../../../lib/api";
import AppCard from "../../../components/appcard";

import { COLORS } from "../../../constants/theme";

export default function Squads() {
  const [squads, setSquads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/api/squads")
      .then((response) => setSquads(response.data))
      .catch(console.log)
      .finally(() => setLoading(false));
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Your Squads</Text>

      <Text style={styles.subtitle}>
        Stay accountable together.
      </Text>

      {loading ? (
        <ActivityIndicator color={COLORS.primary} />
      ) : (
        squads.map((squad) => (
          <AppCard key={squad.id}>
            <View style={styles.row}>
              <Ionicons
                name="people-circle-outline"
                size={45}
                color={COLORS.primary}
              />

              <View style={{ flex: 1, marginLeft: 15 }}>
                <Text style={styles.name}>{squad.name}</Text>

                <Text style={styles.info}>
                  {squad.members} members
                </Text>
              </View>

              <View>
                <Text style={styles.streak}>{squad.streak} 🔥</Text>
                <Text style={styles.info}>Day streak</Text>
              </View>
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
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  name: {
    color: COLORS.text,
    fontSize: 17,
    fontWeight: "bold",
  },
  info: {
    color: COLORS.secondary,
    marginTop: 5,
    fontSize: 12,
  },
  streak: {
    color: COLORS.primary,
    fontWeight: "bold",
  },
});