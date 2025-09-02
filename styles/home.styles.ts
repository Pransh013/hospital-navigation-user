import { StyleSheet } from "react-native";

export const headerStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    alignItems: "center",
    paddingHorizontal: 12,
    marginBottom: 16,
  },
  backButton: {
    backgroundColor: "white",
    height: 48,
    width: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  placeholder: {
    height: 48,
    width: 48,
  },
  title: {
    fontSize: 20,
    fontFamily: "rubik-semibold",
    color: "#111827",
  },
  logoutButton: {
    backgroundColor: "white",
    height: 48,
    width: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
  },
});

export const testCardStyles = StyleSheet.create({
  cardContainer: {
    height: 80,
    width: "100%",
    borderRadius: 6,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
  completedCard: {
    backgroundColor: "#CCFDE8",
  },
  inQueueCard: {
    backgroundColor: "#CCCDA8",
  },
  scheduledCard: {
    borderWidth: 1,
    borderColor: "#EB996E",
  },
  leftSection: {
    justifyContent: "center",
  },
  testName: {
    fontSize: 16,
  },
  statusRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  checkIconContainer: {
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#3CC19A", // button-bg color
    width: 16,
    height: 16,
  },
  completedText: {
    color: "#10B981", // green color
    fontFamily: "rubik-medium",
  },
  waitingTimeRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
  },
  waitingTimeContainer: {
    flexDirection: "row",
    gap: 4,
    marginTop: 4,
  },
  waitingTimeLabel: {
    color: "#71717A",
    fontSize: 14,
  },
  waitingTimeValue: {
    color: "#71717A",
    fontSize: 14,
  },
  rightSection: {
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  infoSection: {
    justifyContent: "center",
    alignItems: "center",
  },
  infoHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },
  infoLabel: {
    fontSize: 14,
    color: "#6B7280", // gray color
  },
  infoValue: {
    fontSize: 24,
    fontFamily: "rubik-medium",
    color: "#6B7280", // gray color
  },
  divider: {
    height: "83.33%", // 5/6 of height
    width: 2,
    backgroundColor: "rgba(113, 113, 122, 0.5)", // zinc-500/50
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(17, 94, 89, 0.4)", // teal-800/40
  },
  modalContent: {
    backgroundColor: "white",
    padding: 24,
    height: "33.33%", // 1/3 of screen height
    borderRadius: 8,
    width: "80%",
    position: "relative",
  },
  modalTitle: {
    color: "#6B7280", // gray color
    fontFamily: "rubik",
    textAlign: "center",
  },
  modalTestName: {
    color: "black",
    fontFamily: "rubik-semibold",
    fontSize: 20,
    textAlign: "center",
  },
  modalInfo: {
    gap: 24,
    marginTop: 16,
  },
  modalRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  modalInfoItem: {
    justifyContent: "center",
    alignItems: "center",
    gap: 2,
    width: "50%",
  },
  modalInfoLabel: {
    fontSize: 14,
    color: "#6B7280", // gray color
    fontFamily: "rubik",
  },
  modalInfoValue: {
    fontSize: 20,
    color: "#10B981", // green color
    fontFamily: "rubik-semibold",
  },
  textCenter: {
    textAlign: "center",
  },
  completeButton: {
    backgroundColor: "#3CC19A", // button-bg color
    borderRadius: 8,
    width: "100%",
    paddingVertical: 16,
    marginTop: 16,
  },
  completeButtonText: {
    color: "white",
    fontSize: 18,
    textAlign: "center",
    fontFamily: "rubik-medium",
  },
  closeButton: {
    position: "absolute",
    right: 16,
    top: 12,
  },
});

export const testProgressStyles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    alignItems: "center",
    borderRadius: 8,
    width: 144, // w-36 = 144px
    height: 64, // h-16 = 64px
    padding: 16,
    justifyContent: "center",
  },
  progressText: {
    fontFamily: "rubik-bold",
    marginBottom: 8,
  },
  progressBarContainer: {
    width: "100%",
    height: 10, // h-2.5 = 10px
    backgroundColor: "#E4E4E7", // bg-zinc-200
    borderRadius: 6,
    overflow: "hidden",
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: "#10B981", // bg-green
    borderRadius: 6,
  },
});

export const homeStyles = StyleSheet.create({
  container: {
    backgroundColor: "#F3F4F6",
    flex: 1,
    position: "relative",
    width: "100%",
    paddingVertical: 40,
  },
  decorativeCircle: {
    borderRadius: 120.5,
    width: 241,
    height: 226,
    position: "absolute",
    zIndex: -10,
  },
  topRightCircle: {
    backgroundColor: "#d4e8e0ad",
    right: -56,
    top: -112,
  },
  topLeftCircle: {
    backgroundColor: "#d4e8e0ad",
    top: 80,
    left: -40,
  },
  headerSection: {
    flexDirection: "row",
    paddingHorizontal: 16,
    marginTop: 16,
    gap: 12,
    justifyContent: "space-between",
  },
  greetingContainer: {
    gap: 4,
  },
  greetingText: {
    fontSize: 36,
    fontFamily: "rubik-semibold",
  },
  subtitleText: {
    fontFamily: "rubik-medium",
    fontSize: 18,
    color: "#71717A",
  },
  innerScrollView: {
    width: "100%",
  },
  testsContainer: {
    backgroundColor: "white",
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    minHeight: "100%",
    width: "100%",
    marginTop: 16,
    paddingHorizontal: 16,
    paddingVertical: 40,
    gap: 16,
  },
  proceedButton: {
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    marginHorizontal: 16,
    marginTop: 16,
  },
  enabledButton: {
    backgroundColor: "#3CC19A",
  },
  disabledButton: {
    backgroundColor: "#6B7280",
  },
  proceedButtonText: {
    fontSize: 18,
    textAlign: "center",
    fontFamily: "rubik-medium",
    color: "white",
  },
});
