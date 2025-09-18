import { useAuthStore } from "@/stores/authStore";
import { Link, Redirect } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function HomePage() {
  const { patient } = useAuthStore();
  if (!patient) {
    return <Redirect href={"/sign-in"} />;
  }
  const name = patient.firstName;

  return (
    <View style={styles.container}>
      <View style={styles.greetingContainer}>
        <Text style={styles.greetingText}>Hii {name}!</Text>
        <Text style={styles.subtitleText}>
          What would you like to do today?
        </Text>
      </View>

      <Link href="/(home)/tests" asChild>
        <TouchableOpacity style={styles.card}>
          <Text style={styles.cardText}>📋 Your Booked Tests</Text>
        </TouchableOpacity>
      </Link>

      <Link href="/(home)/appointments" asChild>
        <TouchableOpacity style={styles.card}>
          <Text style={styles.cardText}>🩺 Your Appointments</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F4F6",
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  greetingContainer: {
    marginBottom: 40,
  },
  greetingText: {
    fontSize: 32,
    fontFamily: "rubik-semibold",
    color: "#111827",
  },
  subtitleText: {
    fontSize: 18,
    fontFamily: "rubik-medium",
    color: "#6B7280",
    marginTop: 4,
  },
  card: {
    width: "100%",
    backgroundColor: "white",
    borderRadius: 12,
    paddingVertical: 20,
    paddingHorizontal: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  cardText: {
    fontSize: 18,
    fontFamily: "rubik-medium",
    color: "#374151",
  },
});
