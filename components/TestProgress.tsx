import { testProgressStyles } from "@/styles/home.styles";
import { TestBooking } from "@/types";
import React from "react";
import { Text, View } from "react-native";

export const TestProgress = ({ tests }: { tests: TestBooking[] }) => {
  const calculateCompletionDetails = (tests: TestBooking[]) => {
    const completedTests = tests.filter(
      (test) => test.status === "COMPLETED"
    ).length;
    const totalTests = tests.length;
    return { completedTests, totalTests };
  };

  const { completedTests, totalTests } = calculateCompletionDetails(tests);
  const progressWidth =
    totalTests > 0 ? (completedTests / totalTests) * 100 : 0;

  return (
    <View style={testProgressStyles.container}>
      <Text style={testProgressStyles.progressText}>
        {completedTests} / {totalTests}
      </Text>
      <View style={testProgressStyles.progressBarContainer}>
        <View
          style={[
            testProgressStyles.progressBarFill,
            { width: `${progressWidth}%` },
          ]}
        />
      </View>
    </View>
  );
};
