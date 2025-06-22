import { Stack } from "expo-router";

export default function AuthRoutesLayout() {
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
