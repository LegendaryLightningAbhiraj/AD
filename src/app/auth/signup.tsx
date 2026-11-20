import React, { useState } from "react";

import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
} from "react-native";

import { createUserWithEmailAndPassword } from "firebase/auth";

import {
  doc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";

import { auth, db } from "../../lib/firebase";

import AppButton from "../../components/appbutton";

import { router } from "expo-router";

import { COLORS } from "../../constants/theme";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signup = async () => {
    if (!name.trim() || !email.trim() || !password) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }

    try {
      console.log("SIGNUP STARTED");

      // STEP 1: CREATE FIREBASE ACCOUNT
      const result = await createUserWithEmailAndPassword(
        auth,
        email.trim(),
        password
      );

      console.log("1. FIREBASE ACCOUNT CREATED");
      console.log("USER UID:", result.user.uid);

      // STEP 2: SAVE USER DATA IN FIRESTORE
      await setDoc(doc(db, "users", result.user.uid), {
        name: name.trim(),
        email: email.trim(),
        createdAt: serverTimestamp(),
        totalFocusMinutes: 0,
      });

      console.log("2. FIRESTORE DATA SAVED");

      // STEP 3: NAVIGATE TO HOME
      console.log("3. ATTEMPTING NAVIGATION");

      router.replace("/drawer/tabs/home" as never);

      console.log("4. NAVIGATION COMMAND EXECUTED");

    } catch (error: any) {
      console.log("SIGNUP ERROR:", error);

      Alert.alert(
        "Signup failed",
        error.message
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Create account.</Text>

      <TextInput
        placeholder="Full name"
        placeholderTextColor="#777"
        style={styles.input}
        value={name}
        onChangeText={setName}
      />

      <TextInput
        placeholder="Email"
        placeholderTextColor="#777"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <TextInput
        placeholder="Password"
        placeholderTextColor="#777"
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <AppButton
        title="Create Account"
        onPress={signup}
      />
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

  heading: {
    color: COLORS.text,
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 35,
  },

  input: {
    backgroundColor: COLORS.surface,
    color: COLORS.text,
    padding: 17,
    borderRadius: 12,
    marginVertical: 10,
  },
});