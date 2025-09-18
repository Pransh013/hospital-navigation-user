import { StyleSheet } from "react-native";

export const consultationScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F6F8FA",
    position: "relative",
    width: "100%",
    paddingVertical: 40,
  },
  decorativeCircle: {
    position: "absolute",
    borderRadius: 9999,
    width: 241,
    height: 226,
    zIndex: -10,
  },
  topRightCircle: {
    right: -56,
    top: -112,
    backgroundColor: "#d4e8e0ad",
  },
  topLeftCircle: {
    left: -40,
    top: 80,
    backgroundColor: "#d4e8e0c9",
  },
  title: {
    fontSize: 32,
    textAlign: "center",
    marginTop: 16,
    fontFamily: "Rubik-SemiBold",
    color: "#000",
  },
  innerScrollView: {
    width: "100%",
  },
  cardContainer: {
    backgroundColor: "#fff",
    borderRadius: 16,
    minHeight: "100%",
    marginTop: 16,
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  remindersContainer: {
    backgroundColor: "#3CC19A",
    borderRadius: 24,
    padding: 20,
    marginHorizontal: 24,
    marginTop: 24,
  },
  remindersTitle: {
    color: "#fff",
    fontSize: 20,
    fontFamily: "Rubik-SemiBold",
    textAlign: "center",
    marginBottom: 8,
  },
  reminderItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  reminderBullet: {
    color: "#fff",
    fontSize: 24,
  },
  reminderText: {
    color: "#fff",
    fontFamily: "Rubik-Regular",
    fontSize: 18,
  },
  button: {
    width: "75%",
    marginTop: 32,
  },
  buttonTitle: {
    color: "#fff",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export const consultationDetailsStyles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    alignItems: "center",
  },
  detailContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingBottom: 10,
  },
  detailItem: {
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    color: "#71717A",
    fontFamily: "Rubik-Medium",
    fontSize: 13,
  },
  value: {
    color: "#3CC19A",
    fontFamily: "Rubik-SemiBold",
    fontSize: 14,
  },
  divider: {
    height: "83%",
    width: 1,
    backgroundColor: "rgba(113,113,122,0.5)",
  },
  timeRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 2,
  },
  toText: {
    color: "#71717A",
    fontFamily: "Rubik-Regular",
    fontSize: 13,
  },
});

export const doctorCardStyles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    gap: 32,
    backgroundColor: "#F6F8FA",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 16,
  },
  image: {
    width: 64,
    height: 64,
    resizeMode: "contain",
  },
  infoContainer: {
    flex: 1,
    alignItems: "center",
    gap: 12,
  },
  name: {
    textAlign: "center",
    fontSize: 24,
    fontFamily: "Rubik-Medium",
  },
  specialityRow: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  speciality: {
    fontFamily: "Rubik-Regular",
    color: "#71717A",
  },
  divider: {
    height: "83%",
    width: 1,
    backgroundColor: "#A1A1AA",
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  statItem: {
    alignItems: "center",
  },
  statLabel: {
    fontFamily: "Rubik-Regular",
    color: "#71717A",
  },
  statValue: {
    fontFamily: "Rubik-Medium",
    color: "#52525B",
  },
});
