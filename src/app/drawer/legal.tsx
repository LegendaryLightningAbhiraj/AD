import { View, Text, StyleSheet } from "react-native";
import { COLORS } from "../../constants/theme";

export default function Legal() {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Rules & Regulations</Text>

      <Text style={styles.text}>
        1. Respect the focus sessions you create.
      </Text>

      <Text style={styles.text}>
        2. Do not misuse squad features.
      </Text>

      <Text style={styles.text}>
        3. Respect other users and their privacy.
      </Text>

      <Text style={styles.text}>
        4. Your account information must remain secure.
      </Text>

      <Text style={styles.text}>
        5. Use Focusly responsibly.
      </Text>
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
    fontSize: 27,
    fontWeight: "bold",
    marginVertical: 30,
  },
  text: {
    color: COLORS.secondary,
    fontSize: 16,
    marginVertical: 15,
    lineHeight: 24,
  },
});