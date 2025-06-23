import { useAuthStore } from "@/stores/authStore";
import { Redirect, Stack } from "expo-router";

export default function AuthRoutesLayout() {
  const { isSignedIn } = useAuthStore()

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
