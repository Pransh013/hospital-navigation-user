import { useAuthStore } from "@/stores/authStore";
import { Redirect, Stack } from "expo-router";
import { ActivityIndicator, View } from "react-native";

export default function AuthRoutesLayout() {
  const { isSignedIn, isHydrating } = useAuthStore();

  if (isHydrating) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (isSignedIn) {
    return <Redirect href="/" />;
  }
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: "slide_from_right",
        contentStyle: { backgroundColor: "white" },
      }}
    >
      <Stack.Screen
        name="sign-in"
        options={{
          title: "Sign In",
          animation: "slide_from_right",
        }}
      />
    </Stack>
  );
}
