import ConsultationDetails from "@/components/ConsultationDetails";
import DoctorCard from "@/components/DoctorCard";
import Header from "@/components/Header";
import { reminders } from "@/constants/data";
import { useApiClient } from "@/lib/api/apiClient";
import { consultationScreenStyles } from "@/styles/consultation.styles";
import { Appointment } from "@/types";
import { addMinutes, format } from "date-fns";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const AppointmentPage = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { patient } = useApiClient();

  const [appointment, setAppointment] = useState<Appointment | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDetails = async () => {
      if (!id) return;
      setLoading(true);
      setError(null);
      try {
        const res = await patient.getAppontmentById(id as string);
        setAppointment(res.data);
      } catch (err: any) {
        setError(err.message || "Failed to fetch details");
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [id]);

  if (loading) {
    return (
      <View style={consultationScreenStyles.centered}>
        <ActivityIndicator size="large" color="#3CC19A" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={consultationScreenStyles.centered}>
        <Text>{error}</Text>
      </View>
    );
  }

  if (!appointment) {
    return (
      <View style={consultationScreenStyles.centered}>
        <Text>No appointment found</Text>
      </View>
    );
  }

  const startDate = new Date(appointment.scheduledAt);
  const endDate = addMinutes(startDate, 15);

  const formattedDate = format(startDate, "dd MMM yyyy");
  const formattedStart = format(startDate, "hh:mm a");
  const formattedEnd = format(endDate, "hh:mm a");

  return (
    <View style={consultationScreenStyles.container}>
      <Header />
      <View
        style={[
          consultationScreenStyles.decorativeCircle,
          consultationScreenStyles.topRightCircle,
        ]}
      />
      <View
        style={[
          consultationScreenStyles.decorativeCircle,
          consultationScreenStyles.topLeftCircle,
        ]}
      />

      <Text style={consultationScreenStyles.title}>Appointment</Text>

      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        style={consultationScreenStyles.innerScrollView}
      >
        <View style={consultationScreenStyles.cardContainer}>
          <ConsultationDetails
            date={formattedDate}
            startTime={formattedStart}
            endTime={formattedEnd}
          />

          <DoctorCard
            name={appointment.doctor.name}
            designation={appointment.doctor.specializations.join(", ")}
          />

          <View style={consultationScreenStyles.remindersContainer}>
            <Text style={consultationScreenStyles.remindersTitle}>
              Things to remember
            </Text>
            {reminders.map((item, idx) => (
              <View style={consultationScreenStyles.reminderItem} key={idx}>
                <Text style={consultationScreenStyles.reminderBullet}>•</Text>
                <Text style={consultationScreenStyles.reminderText}>
                  {item}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      <TouchableOpacity
        style={consultationScreenStyles.button}
        onPress={() => router.push("/")}
        activeOpacity={0.7}
      >
        <Text style={consultationScreenStyles.buttonTitle}>Share Reports</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AppointmentPage;
