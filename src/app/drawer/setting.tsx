import { View, Text, StyleSheet } from "react-native";
import { COLORS } from "../../constants/theme";

export default function Settings() {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Settings</Text>

      <Text style={styles.item}>Notifications</Text>
      <Text style={styles.item}>Account Preferences</Text>
      <Text style={styles.item}>Privacy</Text>
      <Text style={styles.item}>About Focusly</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 25,
  },
  heading: {
    color: COLORS.text,
    fontSize: 30,
    fontWeight: "bold",
    marginVertical: 30,
  },
  item: {
    color: COLORS.text,
    backgroundColor: COLORS.surface,
    padding: 20,
    marginVertical: 8,
    borderRadius: 12,
  },
});