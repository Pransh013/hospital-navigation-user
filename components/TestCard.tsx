import { formatWaitingTime } from "@/lib/utils";
import { testCardStyles } from "@/styles/home.styles";
import { TestType } from "@/types";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";

const TestCard = ({
  test,
  onMarkComplete,
}: {
  test: TestType;
  onMarkComplete: (testName: string) => void;
}) => {
  const isCompleted = test.testStatus === "Completed";
  const formattedWaitingTime = formatWaitingTime(test.waitingTime);
  const [modalVisible, setModalVisible] = useState(false);

  const handleCardPress = () => {
    if (!isCompleted) {
      setModalVisible(true);
    }
  };

  return (
    <>
      <TouchableOpacity onPress={handleCardPress}>
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

      <Modal transparent visible={modalVisible} animationType="fade">
        <View style={testCardStyles.modalOverlay}>
          <View style={testCardStyles.modalContent}>
            <Text style={testCardStyles.modalTitle}>Name of the test</Text>
            <Text style={testCardStyles.modalTestName}>{test.testName}</Text>

            <View style={testCardStyles.modalInfo}>
              <View style={testCardStyles.modalRow}>
                <View style={testCardStyles.modalInfoItem}>
                  <Text style={testCardStyles.modalInfoLabel}>
                    Patients in line
                  </Text>
                  <Text style={testCardStyles.modalInfoValue}>
                    {test.patientsInLine}
                  </Text>
                </View>
                <View style={testCardStyles.modalInfoItem}>
                  <Text style={testCardStyles.modalInfoLabel}>
                    Waiting Time
                  </Text>
                  <Text style={testCardStyles.modalInfoValue}>
                    {formattedWaitingTime}
                  </Text>
                </View>
              </View>

              <View style={testCardStyles.modalRow}>
                <View style={testCardStyles.modalInfoItem}>
                  <Text style={testCardStyles.modalInfoLabel}>Room No.</Text>
                  <Text style={testCardStyles.modalInfoValue}>
                    {test.roomNumber}
                  </Text>
                </View>
                <View style={testCardStyles.modalInfoItem}>
                  <Text
                    style={[
                      testCardStyles.modalInfoLabel,
                      testCardStyles.textCenter,
                    ]}
                  >
                    Floor No.
                  </Text>
                  <Text style={testCardStyles.modalInfoValue}>
                    {test.floorNumber}
                  </Text>
                </View>
              </View>
            </View>

            <TouchableOpacity
              onPress={() => {
                onMarkComplete(test.testName);
                setModalVisible(false);
              }}
              activeOpacity={0.7}
              accessibilityRole="button"
              style={testCardStyles.completeButton}
            >
              <Text style={testCardStyles.completeButtonText}>
                Mark as Complete
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={testCardStyles.closeButton}
            >
              <Ionicons name="close-outline" size={22}/>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default TestCard;
