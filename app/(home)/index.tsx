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
  const { user, token } = useAuthStore();
  const router = useRouter();
  const { tests: testsApi } = useApiClient();

  const name = user?.firstName;

  useEffect(() => {
    const fetchTests = async () => {
      setLoading(true);
      try {
        const data = await testsApi.fetchAll();
        setTests(data.map((test: any) => ({ ...test, waitingTime: null })));
      } catch (err) {
        Alert.alert("Failed to fetch tests");
      } finally {
        setLoading(false);
      }
    };
    fetchTests();
  }, []);

  const handleMarkComplete = async (patientTestId: string) => {
    try {
      await testsApi.markComplete(patientTestId);
      setTests((prevTests) =>
        prevTests.map((test) =>
          test.patientTestId === patientTestId
            ? {
                ...test,
                testStatus: "test_completed",
                waitingTime: null,
                patientsInLine: 0,
              }
            : test
        )
      );
    } catch (err) {
      Alert.alert("Failed to mark test as completed");
    }
  };

  const allTestsCompleted = tests.every(
    (test) => test.testStatus === "test_completed"
  );

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
              <TestCard
                onMarkComplete={() => handleMarkComplete(test.patientTestId)}
                key={test.patientTestId}
                test={test}
              />
            ))}
          </View>
        </ScrollView>
      )}
      <TouchableOpacity
        onPress={() => {
          router.push("/");
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
    </View>
  );
};

export default Home;
