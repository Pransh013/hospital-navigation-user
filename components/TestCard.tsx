import { testCardStyles } from "@/styles/home.styles";
import { TestBooking } from "@/types";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

export const TestCard = ({
  test,
  statusColor,
}: {
  test: TestBooking; // Corrected prop type to TestBooking
  statusColor: string;
}) => {
  // Correctly check if the test is completed using the status property
  const isCompleted = test.status === "COMPLETED";

  // Note: The 'durationInMins' is on the 'test.test' object, but 'patientsInLine' is
  // not. The waiting time calculation will be set to a placeholder or handled differently.
  const formattedWaitingTime = "N/A";

  return (
    <TouchableOpacity disabled>
      <View
        style={[
          testCardStyles.cardContainer,
          { backgroundColor: statusColor },
          test.status === "COMPLETED"
            ? testCardStyles.completedCard
            : test.status === "IN_QUEUE"
            ? testCardStyles.inQueueCard
            : testCardStyles.scheduledCard,
        ]}
      >
        <View style={testCardStyles.leftSection}>
          {/* Access the nested name property */}
          <Text style={testCardStyles.testName}>{test.test.name}</Text>
          {isCompleted ? (
            <View style={testCardStyles.statusRow}>
              <View style={testCardStyles.checkIconContainer}>
                <Ionicons
                  name="checkmark"
                  color="white"
                  strokeWidth={2}
                  size={10}
                />
              </View>
              <Text style={testCardStyles.completedText}>Test Completed</Text>
            </View>
          ) : (
            <View style={testCardStyles.waitingTimeRow}>
              <Ionicons name="time-outline" color="#5D5D5D" size={16} />
              <View style={testCardStyles.waitingTimeContainer}>
                <Text style={testCardStyles.waitingTimeLabel}>
                  Waiting time:
                </Text>
                <Text style={testCardStyles.waitingTimeValue}>
                  {formattedWaitingTime}
                </Text>
              </View>
            </View>
          )}
        </View>
        <View style={testCardStyles.rightSection}>
          <View style={testCardStyles.infoSection}>
            <View style={testCardStyles.infoHeader}>
              <Ionicons name="business-outline" color="#5E5D5D" size={14} />
              <Text style={testCardStyles.infoLabel}>Floor</Text>
            </View>
            {/* Access the nested floor property */}
            <Text style={testCardStyles.infoValue}>{test.test.floor}</Text>
          </View>
          <View style={testCardStyles.divider}></View>
          <View style={testCardStyles.infoSection}>
            <View style={testCardStyles.infoHeader}>
              <Ionicons name="storefront-outline" color="#5E5D5D" size={14} />
              <Text style={testCardStyles.infoLabel}>Room</Text>
            </View>
            {/* Access the nested roomNumber property */}
            <Text style={testCardStyles.infoValue}>{test.test.roomNumber}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};
