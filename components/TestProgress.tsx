import { testProgressStyles } from "@/styles/home.styles";
import { TestType } from "@/types";
import React from "react";
import { Text, View } from "react-native";

const TestProgress = ({ tests }: { tests: TestType[] }) => {
  const calculateCompletionDetails = (tests: TestType[]) => {
    const completedTests = tests.filter(
      (test) => test.testStatus === "Completed"
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

export default TestProgress;
