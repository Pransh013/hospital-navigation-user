import { useAuthStore } from "@/stores/authStore";
import { Redirect } from "expo-router";
import { Stack } from "expo-router/stack";

export default function Layout() {
  const { isSignedIn } = useAuthStore();

  if (!isSignedIn) {
    return <Redirect href={"/sign-in"} />;
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: "slide_from_right",
        contentStyle: { backgroundColor: "white" },
        gestureEnabled: true,
        gestureDirection: "horizontal",
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "Home",
          animation: "fade",
        }}
      />
    </Stack>
  );
}
