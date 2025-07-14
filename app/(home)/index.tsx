import Header from "@/components/Header";
import TestCard from "@/components/TestCard";
import TestProgress from "@/components/TestProgress";
import { useApiClient } from "@/lib/api/apiClient";
import { useAuthStore } from "@/stores/authStore";
import { homeStyles } from "@/styles/home.styles";
import { TestType } from "@/types";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const Home = () => {
  const [tests, setTests] = useState<TestType[]>([]);
  const [loading, setLoading] = useState(true);
  const [consultationRequired, setConsultationRequired] = useState<
    boolean | null
  >(null);
  const { user } = useAuthStore();
  const router = useRouter();
  const { tests: testsApi, patient } = useApiClient();

  const name = user?.firstName;

  // Add a function to fetch tests (for refresh)
  const fetchTests = async () => {
    setLoading(true);
    try {
      const data = await testsApi.fetchAll();
      setTests(data.map((test: any) => ({ ...test })));
    } catch {
      Alert.alert("Failed to fetch tests");
    } finally {
      setLoading(false);
    }
  };

  // Fetch patient details for consultationRequired
  useEffect(() => {
    const fetchPatientDetails = async () => {
      if (!user?.patientId) return;
      try {
        const details = await patient.getDetails(user.patientId);
        setConsultationRequired(details.consultationRequired ?? false);
      } catch {
        setConsultationRequired(false);
      }
    };
    fetchPatientDetails();
  }, [user?.patientId]);

  useEffect(() => {
    fetchTests();
  }, []);

  const allTestsCompleted = tests.every(
    (test) => test.testStatus === "test_completed"
  );

  // Use this for the opt-out check
  const hasOptedOut = consultationRequired === false;

  return (
    <View style={homeStyles.container}>
      <Header />
      <View style={[homeStyles.decorativeCircle, homeStyles.topRightCircle]} />
      <View style={[homeStyles.decorativeCircle, homeStyles.topLeftCircle]} />
      <View style={homeStyles.headerSection}>
        <View style={homeStyles.greetingContainer}>
          <Text style={homeStyles.greetingText}>Hii {name}!</Text>
          <Text style={homeStyles.subtitleText}>
            Here Is Your Test Sequence
          </Text>
        </View>
        <TestProgress tests={tests} />
      </View>
      {/* Refresh Button */}
      <TouchableOpacity
        onPress={fetchTests}
        style={{
          alignSelf: "flex-end",
          margin: 16,
          padding: 8,
          backgroundColor: "#3CC19A",
          borderRadius: 8,
        }}
      >
        <Text style={{ color: "white", fontWeight: "bold" }}>Refresh</Text>
      </TouchableOpacity>
      {loading ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" color="#3CC19A" />
        </View>
      ) : (
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
          style={homeStyles.innerScrollView}
        >
          <View style={homeStyles.testsContainer}>
            {tests.map((test) => (
              <TestCard key={test.patientTestId} test={test} />
            ))}
          </View>
        </ScrollView>
      )}
      {/* Hide consultation button if opted out */}
      {!hasOptedOut && (
        <TouchableOpacity
          onPress={() => {
            if (!user?.patientId) return;
            router.push({
              pathname: "/consultation/[patientId]",
              params: { patientId: user.patientId },
            });
          }}
          style={[
            homeStyles.proceedButton,
            !allTestsCompleted
              ? homeStyles.disabledButton
              : homeStyles.enabledButton,
          ]}
          disabled={!allTestsCompleted}
        >
          <Text style={homeStyles.proceedButtonText}>
            Proceed to Consultation
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Home;
