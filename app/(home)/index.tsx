import Header from "@/components/Header";
import TestCard from "@/components/TestCard";
import TestProgress from "@/components/TestProgress";
import { tests as initialTests } from "@/constants/data";
import { useAuthStore } from "@/stores/authStore";
import { homeStyles } from "@/styles/home.styles";
import { useRouter } from "expo-router";
import { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

const Home = () => {
  const [tests, setTests] = useState(initialTests);
  const { user } = useAuthStore();
  const router = useRouter();

  const name = user?.firstName;

  const handleMarkComplete = (testName: string) => {
    setTests((prevTests) =>
      prevTests.map((test) =>
        test.testName === testName
          ? {
              ...test,
              testStatus: "Completed",
              waitingTime: null,
              patientsInLine: 0,
            }
          : test
      )
    );
  };

  const allTestsCompleted = tests.every(
    (test) => test.testStatus === "Completed"
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
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        style={homeStyles.innerScrollView}
      >
        <View style={homeStyles.testsContainer}>
          {tests.map((test, index) => (
            <TestCard
              onMarkComplete={handleMarkComplete}
              key={index}
              test={test}
            />
          ))}
        </View>
      </ScrollView>
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
