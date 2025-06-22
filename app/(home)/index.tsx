import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

export default function Index() {
  const router = useRouter();
  return (
    <View
      style={{
        flex: 1,
        borderWidth: 2,
        borderColor: "#000",
      }}
    >
      <Text>Edit app/index.tsx to edit this screen.</Text>
      <TouchableOpacity
        onPress={() => {
          router.push("/sign-in");
        }}
      >
        <Text>Signin</Text>
      </TouchableOpacity>
    </View>
  );
}
