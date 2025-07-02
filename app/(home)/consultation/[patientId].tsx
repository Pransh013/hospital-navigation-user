import ConsultationDetails from "@/components/ConsultationDetails";
import DoctorCard from "@/components/DoctorCard";
import Header from "@/components/Header";
import { reminders } from "@/constants/data";
import { useApiClient } from "@/lib/api/apiClient";
import { consultationScreenStyles } from "@/styles/consultation.styles";
import { ConsultationSummary } from "@/types";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const ConsultationScreen = () => {
  const router = useRouter();
  const { patientId } = useLocalSearchParams();
  const { patient } = useApiClient();
  const [summary, setSummary] = useState<ConsultationSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDetails = async () => {
      if (!patientId) return;
      setLoading(true);
      setError(null);
      try {
        const data = await patient.getDetails(patientId as string);
        setSummary(data);
      } catch (err: any) {
        setError(err.message || "Failed to fetch details");
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [patientId]);

  if (loading) return <ActivityIndicator />;
  if (error) return <Text>{error}</Text>;
  if (!summary) return <Text>No details found.</Text>;

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
            startTime={summary.slotStartTime}
            endTime={summary.slotEndTime}
            date={summary.slotDate}
          />
          <DoctorCard
            name={summary.doctorName}
            designation={summary.doctorDesignation}
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
        onPress={() => {
          router.push("/");
        }}
        activeOpacity={0.7}
      >
        <Text style={consultationScreenStyles.buttonTitle}>Share Reports</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ConsultationScreen;
