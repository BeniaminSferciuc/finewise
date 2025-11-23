import { authClient } from "@/lib/auth-client";
import { THEME_COLOR } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Link, router } from "expo-router";
import {
  AlertOctagon,
  Eye,
  EyeOff,
  Lock,
  Mail,
  User,
} from "lucide-react-native";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/AntDesign";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // UI States
  const [secure, setSecure] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSignUp = async () => {
    try {
      setLoading(true);
      setError(null);

      const { error } = await authClient.signUp.email({
        name,
        email: email.trim(),
        password,
      });

      if (error) {
        setError(error.message || "Something went wrong. Please try again.");
        return;
      }

      router.push("/sign-in");
    } catch (err) {
      console.log(err);
      setError(
        "Unable to sign up. Check your internet connection or try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      setLoading(true);
      await authClient.signIn.social({ provider: "google" });
    } catch {
      setError("Google sign-up failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-[#f5f5f7] p-4">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          className="flex-1"
        >
          <ScrollView
            contentContainerStyle={{
              flexGrow: 1,
              paddingVertical: 32,
            }}
            showsVerticalScrollIndicator={false}
            className="px-6 bg-white rounded-3xl"
          >
            {/* --- HEADER SECTION --- */}
            <View className="items-center mb-8">
              <View
                className="items-center justify-center mb-6 shadow-sm size-16 rounded-[20px]"
                style={{ backgroundColor: THEME_COLOR }}
              >
                <Image
                  source={require("../../assets/images/logo.png")}
                  className="size-10"
                />
              </View>

              <Text className="mb-3 text-2xl font-bold text-black">
                Create Account
              </Text>

              <Text className="px-4 leading-5 text-center text-gray-500">
                Sign up to get started. Enter your details below to create your
                profile.
              </Text>
            </View>

            {/* --- ERROR MESSAGE --- */}
            {error && (
              <View
                className="flex-row items-center gap-2 p-3 mb-6 border rounded-xl"
                style={{
                  backgroundColor: "rgba(255, 0, 0, 0.05)",
                  borderColor: "rgba(255, 0, 0, 0.2)",
                }}
              >
                <AlertOctagon size={20} color="#dc2626" />
                <Text className="flex-1 text-sm text-[#dc2626]">{error}</Text>
              </View>
            )}

            {/* --- FORM SECTION --- */}
            <View className="gap-3">
              {/* NAME INPUT */}
              <View
                className={`flex-row items-center gap-2 px-4 bg-gray-100/80 rounded-2xl ${
                  Platform.OS === "ios" ? "h-14" : "h-[46px]"
                }`}
              >
                <User size={20} color={THEME_COLOR} />
                <TextInput
                  placeholder="Full Name"
                  placeholderTextColor="#999"
                  className="flex-1 h-full text-base text-black"
                  value={name}
                  onChangeText={setName}
                />
              </View>

              {/* EMAIL INPUT */}
              <View
                className={`flex-row items-center gap-2 px-4 bg-gray-100/80 rounded-2xl ${
                  Platform.OS === "ios" ? "h-14" : "h-[46px]"
                }`}
              >
                <Mail size={20} color={THEME_COLOR} />
                <TextInput
                  placeholder="E-mail"
                  placeholderTextColor="#999"
                  autoCapitalize="none"
                  keyboardType="email-address"
                  className="flex-1 h-full text-base text-black"
                  value={email}
                  onChangeText={setEmail}
                />
              </View>

              {/* PASSWORD INPUT */}
              <View
                className={`flex-row items-center gap-2 px-4 bg-gray-100/80 rounded-2xl ${
                  Platform.OS === "ios" ? "h-14" : "h-[46px]"
                }`}
              >
                <Lock size={20} color={THEME_COLOR} />
                <TextInput
                  placeholder="Password"
                  placeholderTextColor="#999"
                  secureTextEntry={secure}
                  value={password}
                  onChangeText={setPassword}
                  className="flex-1 h-full text-base text-black"
                />
                <TouchableOpacity onPress={() => setSecure(!secure)}>
                  {secure ? (
                    <EyeOff size={20} color={THEME_COLOR} />
                  ) : (
                    <Eye size={20} color={THEME_COLOR} />
                  )}
                </TouchableOpacity>
              </View>
            </View>

            {/* --- ACTIONS SECTION --- */}
            <View className="gap-4 mt-8">
              {/* PRIMARY BUTTON (Sign Up) */}
              <TouchableOpacity
                onPress={handleSignUp}
                disabled={loading}
                className={cn(
                  "items-center justify-center rounded-full shadow-sm",
                  Platform.OS === "ios" ? "h-14" : "h-[46px]"
                )}
                style={{ backgroundColor: THEME_COLOR }}
              >
                {loading ? (
                  <ActivityIndicator size="small" color="white" />
                ) : (
                  <Text className="text-base font-bold text-white">
                    Create Account
                  </Text>
                )}
              </TouchableOpacity>

              {/* Divider */}
              <View className="flex-row items-center justify-center my-2">
                <View className="h-[1px] bg-gray-200 w-16" />
                <Text className="mx-3 text-xs text-gray-400">
                  Already have an account?
                </Text>
                <View className="h-[1px] bg-gray-200 w-16" />
              </View>

              <View className="gap-3">
                {/* SECONDARY BUTTON (Navigate to Sign In) */}
                <Link href="/sign-in" asChild>
                  <TouchableOpacity
                    className={cn(
                      "items-center justify-center bg-gray-100 rounded-full",
                      Platform.OS === "ios" ? "h-14" : "h-[46px]"
                    )}
                  >
                    <Text className="text-base font-semibold text-black">
                      Sign In
                    </Text>
                  </TouchableOpacity>
                </Link>

                {/* SOCIAL BUTTONS */}
                <TouchableOpacity
                  onPress={handleGoogleSignUp}
                  className={cn(
                    "flex-row items-center justify-center bg-gray-100 rounded-full",
                    Platform.OS === "ios" ? "h-14" : "h-[46px]"
                  )}
                >
                  <Icon
                    name="google"
                    size={20}
                    color="black"
                    className="mr-2"
                  />
                  <Text className="ml-2 text-base font-semibold text-black">
                    Sign up with Google
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  className={cn(
                    "flex-row items-center justify-center bg-gray-100 rounded-full",
                    Platform.OS === "ios" ? "h-14" : "h-[46px]"
                  )}
                >
                  <Icon name="apple" size={22} color="black" className="mr-2" />
                  <Text className="ml-2 text-base font-semibold text-black">
                    Sign up with Apple
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>

          {/* FOOTER */}
          <View className="mt-4">
            <Text className="text-xs leading-5 text-center text-gray-400">
              By clicking &quot;Create Account&quot;, I agree to the{"\n"}
              <Text className="text-gray-600 underline">
                Terms of Service & Privacy Policy
              </Text>
            </Text>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}
