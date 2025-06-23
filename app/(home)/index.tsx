import { useAuthStore } from "@/stores/authStore";
import { Text, TouchableOpacity, View } from "react-native";

export default function Index() {
  const { signout } = useAuthStore();
  return (
    <View
      style={{
        flex: 1,
        borderWidth: 2,
        borderColor: "#000",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Edit app/index.tsx to edit this screen.</Text>
      <TouchableOpacity onPress={() => signout()}>
        <Text>Sign out</Text>
      </TouchableOpacity>
    </View>
  );
}
