import { ConfirmationModal } from "@/components/ConfirmationModal";
import Header from "@/components/Header";
import { TestCard } from "@/components/TestCard";
import { TestProgress } from "@/components/TestProgress";
import { useApiClient } from "@/lib/api/apiClient";
import { useAuthStore } from "@/stores/authStore";
import { homeStyles } from "@/styles/home.styles";
import { TestBooking, TestStatus } from "@/types";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// Define a mapping of status to color
const statusColors: Record<TestStatus, string> = {
  COMPLETED: "#3CC19A",
  IN_PROGRESS: "#FFC26B",
  IN_QUEUE: "#FFC26B",
  SCHEDULED: "#DBDBDB",
  CANCELLED: "#FF0000",
};

const Home = () => {
  const [tests, setTests] = useState<TestBooking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { patient: authPatient } = useAuthStore();
  const { patient: patientApi } = useApiClient();

  const [isModalVisible, setIsModalVisible] = useState(false);

  const name = authPatient?.firstName;

  const hasActiveTest = tests.some(
    (test) => test.status === "IN_QUEUE" || test.status === "IN_PROGRESS"
  );

  const allTestsScheduled = tests.every((test) => test.status === "SCHEDULED");

  const canCheckIn = allTestsScheduled && tests.length > 0 && !hasActiveTest;

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const today = format(new Date(), "yyyy-MM-dd");
      const fetchedBookings = await patientApi.getBookings(today);
      setTests(fetchedBookings.data);
    } catch (err: any) {
      setError("Failed to fetch bookings. Please try again later.");
      Alert.alert(
        "Error",
        err.response?.data?.message || "Failed to fetch bookings."
      );
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    if (!hasActiveTest) {
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const assignedTest = await patientApi.checkIn(authPatient!.id);
      Alert.alert(
        "Next Test Assigned!",
        `You have been assigned to Test: ${assignedTest.test.name} in Room ${assignedTest.test.roomNumber} on Floor ${assignedTest.test.floor}.`
      );
    } catch {
    } finally {
      await fetchData();
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [patientApi]);

  const handleCheckIn = async () => {
    if (!authPatient?.id) {
      Alert.alert("Error", "Patient information not found.");
      return;
    }

    setIsModalVisible(false);
    setLoading(true);
    try {
      const assignedTest = await patientApi.checkIn(authPatient.id);

      Alert.alert(
        "Check-in Successful!",
        `You have been assigned to Test: ${assignedTest.test.name} in Room ${assignedTest.test.roomNumber} on Floor ${assignedTest.test.floor}.`
      );

      await fetchData();
    } catch (error: any) {
      Alert.alert(
        "Check-in Failed",
        error.response?.data?.message || "An unexpected error occurred."
      );
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Sort tests by status: COMPLETED > IN_QUEUE/IN_PROGRESS > SCHEDULED
  const sortedTests = [...tests].sort((a, b) => {
    const statusOrder = {
      COMPLETED: 1,
      IN_QUEUE: 2,
      IN_PROGRESS: 2,
      SCHEDULED: 3,
      CANCELLED: 4,
    };
    return statusOrder[a.status] - statusOrder[b.status];
  });

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
        <TestProgress tests={sortedTests} />
      </View>
      <View
        style={{ flexDirection: "row", justifyContent: "flex-end", margin: 16 }}
      >
        {canCheckIn && (
          <TouchableOpacity
            onPress={() => setIsModalVisible(true)}
            style={{
              padding: 8,
              backgroundColor: "#3CC19A",
              borderRadius: 8,
            }}
            disabled={loading}
          >
            <Text style={{ color: "white", fontWeight: "bold" }}>Check In</Text>
          </TouchableOpacity>
        )}
        {hasActiveTest && (
          <TouchableOpacity
            onPress={handleRefresh}
            style={{
              padding: 8,
              backgroundColor: "#3CC19A",
              borderRadius: 8,
            }}
            disabled={loading}
          >
            <Text style={{ color: "white", fontWeight: "bold" }}>Refresh</Text>
          </TouchableOpacity>
        )}
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
            {sortedTests.length > 0 ? (
              sortedTests.map((test) => (
                <TestCard
                  key={test.id}
                  test={test}
                  statusColor={statusColors[test.status]}
                />
              ))
            ) : (
              <Text style={{ textAlign: "center", marginTop: 20 }}>
                No tests scheduled for today.
              </Text>
            )}
          </View>
        </ScrollView>
      )}

      <ConfirmationModal
        isVisible={isModalVisible}
        onConfirm={handleCheckIn}
        onCancel={() => setIsModalVisible(false)}
        title="Confirm Check-in"
        message="Are you sure you want to check in? This will assign you to the most efficient room for your first test."
      />
    </View>
  );
};

export default Home;
