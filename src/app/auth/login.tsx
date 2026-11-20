import React, { useState } from "react";

import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from "react-native";

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../lib/firebase";

import { router } from "expo-router";
import AppButton from "../../components/appbutton";
import { COLORS } from "../../constants/theme";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);

      router.replace("../drawer/tabs");
    } catch (error: any) {
      Alert.alert("Login failed", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>FOCUSLY.</Text>

      <Text style={styles.heading}>Welcome back.</Text>
      <Text style={styles.subheading}>Your time belongs to you.</Text>

      <TextInput
        placeholder="Email address"
        placeholderTextColor="#777"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        placeholder="Password"
        placeholderTextColor="#777"
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <AppButton title="Login" onPress={login} />

      <TouchableOpacity onPress={() => router.push("/auth/signup")}>
        <Text style={styles.link}>
          Don't have an account? Sign up
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    justifyContent: "center",
    padding: 25,
  },
  logo: {
    color: COLORS.primary,
    fontSize: 32,
    fontWeight: "900",
    marginBottom: 50,
  },
  heading: {
    color: COLORS.text,
    fontSize: 30,
    fontWeight: "bold",
  },
  subheading: {
    color: COLORS.secondary,
    marginVertical: 15,
  },
  input: {
    backgroundColor: COLORS.surface,
    color: COLORS.text,
    padding: 17,
    borderRadius: 12,
    marginVertical: 9,
  },
  link: {
    color: COLORS.primary,
    textAlign: "center",
    marginTop: 20,
  },
});