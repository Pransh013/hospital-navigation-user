import { theme } from "@/constants/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.bgPrimary,
    paddingHorizontal: 16,
    paddingVertical: 32,
  },
  title: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "500",
    marginBottom: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  center: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  heading: {
    textAlign: "center",
    fontSize: 36,
    fontWeight: "600",
  },
  relative: {
    position: "relative",
  },
  absoluteLike: {
    position: "absolute",
    top: -4,
    left: 20,
  },
  absoluteDoc: {
    position: "absolute",
    left: -16,
    top: "50%",
    transform: [{ translateY: -0.5 }],
  },
  form: {
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingVertical: 24,
    paddingHorizontal: 18,
    gap: 20,
  },
  inputContainer: {
    gap: 6,
  },
  label: {
    fontSize: 14,
  },
  input: {
    borderWidth: 1,
    borderColor: theme.border, // gray-200
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    fontSize: 16,
    marginBottom: 8,
  },
  button: {
    backgroundColor: theme.button, // blue-600
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 8,
  },
  buttonLoading: {
    opacity: 0.8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  errorText: {
    color: "#ef4444",
    textAlign: "center",
    fontSize: 15,
  },
});
