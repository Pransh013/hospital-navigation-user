import { theme } from "@/constants/theme";
import { useAuthStore } from "@/stores/authStore";
import { headerStyles } from "@/styles/home.styles";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

const Header = () => {
  const router = useRouter();
  const { signout } = useAuthStore();
  return (
    <View style={headerStyles.container}>
      {router.canGoBack() ? (
        <TouchableOpacity
          style={headerStyles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={20} color={theme.button} />
        </TouchableOpacity>
      ) : (
        <View style={headerStyles.placeholder} />
      )}
      <Text style={headerStyles.title}>Hospital Way Finder</Text>
      <TouchableOpacity
        style={headerStyles.logoutButton}
        onPress={() => {
          signout();
          router.replace("/sign-in");
        }}
      >
        <Ionicons name="log-out-outline" size={24} color={theme.button} />
      </TouchableOpacity>
    </View>
  );
};

export default Header;
