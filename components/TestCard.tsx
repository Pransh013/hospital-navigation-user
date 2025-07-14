import { formatWaitingTime } from "@/lib/utils";
import { testCardStyles } from "@/styles/home.styles";
import { TestType } from "@/types";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

const TestCard = ({
  test,
}: {
  test: TestType;
}) => {
  const isCompleted = test.testStatus !== "assigned";
  const formattedWaitingTime = formatWaitingTime(
    String(test.duration * test.patientsInLine)
  );

  return (
    <TouchableOpacity disabled>
      <View
        style={[
          testCardStyles.cardContainer,
          isCompleted
            ? testCardStyles.completedCard
            : testCardStyles.pendingCard,
        ]}
      >
        <View style={testCardStyles.leftSection}>
          <Text style={testCardStyles.testName}>{test.testName}</Text>
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
            <Text style={testCardStyles.infoValue}>{test.floorNumber}</Text>
          </View>
          <View style={testCardStyles.divider}></View>
          <View style={testCardStyles.infoSection}>
            <View style={testCardStyles.infoHeader}>
              <Ionicons name="storefront-outline" color="#5E5D5D" size={14} />
              <Text style={testCardStyles.infoLabel}>Room</Text>
            </View>
            <Text style={testCardStyles.infoValue}>{test.roomNumber}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default TestCard;
