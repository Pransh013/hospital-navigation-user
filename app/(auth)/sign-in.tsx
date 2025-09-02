import { useApiClient } from "@/lib/api/apiClient";
import { signinSchema } from "@/schema";
import { styles } from "@/styles/auth.styles";
import { Hospital, SigninForm } from "@/types";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";

export default function SignIn() {
  const { patient, hospital } = useApiClient();
  const router = useRouter();
  const [formData, setFormData] = useState<SigninForm>({
    email: "",
    password: "",
    hospitalId: "",
  });
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [error, setError] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isHospitalsLoading, setIsHospitalsLoading] = useState(false);

  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        setIsHospitalsLoading(true);
        const fetchedHospitals = await hospital.fetchAll();
        setHospitals(fetchedHospitals.data);
      } catch (err) {
        setError([{ message: "Failed to load hospitals" }]);
      } finally {
        setIsHospitalsLoading(false);
      }
    };
    fetchHospitals();
  }, []);

  const updateFormData = (field: keyof SigninForm, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setError(null);
  };

  const onSignInPress = async () => {
    setError(null);
    setIsLoading(true);

    const { success, data, error } = signinSchema.safeParse(formData);
    if (!success) {
      setError(error.errors);
      return;
    }

    try {
      await patient.signin(data.email, data.password, data.hospitalId);
      router.replace("/");
    } catch (err: any) {
      setError([{ message: err.message || "Something went wrong" }]);
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const isFormValid =
    formData.email && formData.password && formData.hospitalId;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.container}>
          <Text style={styles.title}>Hospital Way Finder</Text>
          <View style={styles.row}>
            <View style={styles.center}>
              <Text style={styles.heading}>Validate Your</Text>
              <Text style={styles.heading}>Wellness Test</Text>
            </View>
            <View style={styles.relative}>
              <Image
                source={require("@/assets/images/sign-in-doctor.png")}
                alt="doctor"
              />
              <Image
                source={require("@/assets/images/sign-in-like.png")}
                alt="like"
                style={styles.absoluteLike}
              />
              <Image
                source={require("@/assets/images/sign-in-doc.png")}
                alt="document"
                style={styles.absoluteDoc}
              />
            </View>
          </View>
          <View style={styles.form}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.input}
                autoCapitalize="none"
                value={formData.email}
                placeholder="Enter your email"
                placeholderTextColor="#0F2736"
                onChangeText={(text) => updateFormData("email", text)}
                keyboardType="email-address"
                autoComplete="email"
                editable={!isLoading}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Password</Text>
              <TextInput
                style={styles.input}
                value={formData.password}
                placeholder="Enter your password"
                placeholderTextColor="#0F2736"
                secureTextEntry
                onChangeText={(text) => updateFormData("password", text)}
                autoComplete="password"
                editable={!isLoading}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Hospital</Text>
              {isHospitalsLoading ? (
                <ActivityIndicator style={{ marginTop: 10 }} />
              ) : (
                <RNPickerSelect
                  placeholder={{ label: "Select a hospital", value: null }}
                  onValueChange={(value: string) =>
                    updateFormData("hospitalId", value)
                  }
                  items={hospitals.map((h) => ({
                    label: h.name,
                    value: h.id,
                  }))}
                  style={pickerSelectStyles}
                  value={formData.hospitalId}
                />
              )}
            </View>
            <TouchableOpacity
              style={[
                styles.button,
                (!isFormValid || isLoading) && styles.buttonLoading,
              ]}
              onPress={onSignInPress}
              disabled={!isFormValid || isLoading} // Disable until form is valid and not loading
            >
              <Text style={styles.buttonText}>
                {isLoading ? "Signing in..." : "Sign In"}
              </Text>
            </TouchableOpacity>
            {error && (
              <Text style={styles.errorText}>**{error[0]?.message}</Text>
            )}
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

export const pickerSelectStyles = {
  inputIOS: styles.input,
  inputAndroid: styles.input,
  placeholder: {
    color: "#0f2736", // A light gray color for the placeholder
  },
};
