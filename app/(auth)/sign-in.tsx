import { signinSchema } from "@/schema";
import { styles } from "@/styles/auth.styles";
import { SigninForm } from "@/types";
import { useState } from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function SignIn() {
  const [formData, setFormData] = useState<SigninForm>({
    email: "",
    password: "",
  });
  const [error, setError] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const updateFormData = (field: keyof SigninForm, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setError(null);
  };

  const onSignUpPress = async () => {
    setError(null);
    setIsLoading(true);

    const result = signinSchema.safeParse(formData);
    if (!result.success) {
      setError(result.error.errors);
      return;
    }

    try {
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
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

        <TouchableOpacity
          style={[styles.button, isLoading && styles.buttonLoading]}
          onPress={onSignUpPress}
          disabled={isLoading}
        >
          <Text style={styles.buttonText}>
            {isLoading ? "Signing in..." : "Sign In"}
          </Text>
        </TouchableOpacity>

        {error && <Text style={styles.errorText}>**{error[0]?.message}</Text>}
      </View>
    </View>
  );
}
