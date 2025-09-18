import { format, isBefore } from "date-fns";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { useApiClient } from "@/lib/api/apiClient";
import { AppointmentListItem } from "@/types";

export default function AppointmentsPage() {
  const { patient: patientApi } = useApiClient();

  const [appointments, setAppointments] = useState<AppointmentListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const res = await patientApi.getAppontments();
      setAppointments(res.data);
    } catch (err: any) {
      setError(err.message || "Failed to load appointments.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  if (loading) {
    return (
      <View style={appointmentStyles.centered}>
        <ActivityIndicator size="large" color="#3CC19A" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={appointmentStyles.centered}>
        <Text style={appointmentStyles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={appointmentStyles.container}>
      <Text style={appointmentStyles.heading}>🩺 Your Appointments</Text>
      <ScrollView
        contentContainerStyle={appointmentStyles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {appointments.length === 0 ? (
          <Text style={appointmentStyles.emptyText}>
            No appointments found.
          </Text>
        ) : (
          appointments.map((appointment, index) => {
            const isPast = isBefore(
              new Date(appointment.scheduledAt),
              new Date()
            );

            const formattedDate = format(
              new Date(appointment.scheduledAt),
              "dd MMM yyyy"
            );
            const formattedTime = format(
              new Date(appointment.scheduledAt),
              "hh:mm a"
            );

            const CardContent = (
              <View
                style={[
                  appointmentStyles.card,
                  isPast
                    ? appointmentStyles.disabledCard
                    : appointmentStyles.activeCard,
                ]}
              >
                <View>
                  <Text style={appointmentStyles.title}>
                    Appointment {index + 1}
                  </Text>
                  <Text style={appointmentStyles.status}>
                    Status: {appointment.status}
                  </Text>
                </View>
                <View style={appointmentStyles.dateSection}>
                  <Text style={appointmentStyles.dateText}>
                    {formattedDate}
                  </Text>
                  <Text style={appointmentStyles.timeText}>
                    {formattedTime}
                  </Text>
                </View>
              </View>
            );

            return isPast ? (
              <View key={appointment.id} style={{ opacity: 0.5 }}>
                {CardContent}
              </View>
            ) : (
              <Link
                key={appointment.id}
                href={`/appointments/${appointment.id}`}
                asChild
              >
                <TouchableOpacity activeOpacity={0.7}>
                  {CardContent}
                </TouchableOpacity>
              </Link>
            );
          })
        )}
      </ScrollView>
    </View>
  );
}

export const appointmentStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F4F6",
    paddingHorizontal: 16,
    paddingTop: 40,
  },
  heading: {
    fontSize: 28,
    fontFamily: "rubik-semibold",
    marginBottom: 20,
  },
  scrollContainer: {
    paddingBottom: 40,
    gap: 16,
  },
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    borderRadius: 10,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  activeCard: {
    borderLeftWidth: 4,
    borderLeftColor: "#3CC19A",
  },
  disabledCard: {
    borderLeftWidth: 4,
    borderLeftColor: "#9CA3AF",
  },
  title: {
    fontSize: 18,
    fontFamily: "rubik-medium",
    color: "#111827",
  },
  status: {
    fontSize: 14,
    color: "#6B7280",
    marginTop: 4,
  },
  dateSection: {
    justifyContent: "center",
    alignItems: "flex-end",
  },
  dateText: {
    fontSize: 14,
    fontFamily: "rubik-medium",
    color: "#374151",
  },
  timeText: {
    fontSize: 16,
    fontFamily: "rubik-semibold",
    color: "#10B981",
  },
  emptyText: {
    textAlign: "center",
    marginTop: 40,
    fontSize: 16,
    color: "#6B7280",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: "#DC2626",
    fontSize: 16,
    fontFamily: "rubik-medium",
  },
});
