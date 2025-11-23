import { authClient } from "@/lib/auth-client";
import { THEME_COLOR } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Link, router } from "expo-router";
import { AlertOctagon, Eye, EyeOff, Lock, Mail } from "lucide-react-native";
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

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secure, setSecure] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    try {
      setLoading(true);
      setError(null);

      const { error } = await authClient.signIn.email({
        email: email.trim(),
        password,
      });

      if (error) {
        setError(
          error.message ?? "Something went wrong. Please try again later."
        );
        return;
      }

      router.push("/overview");
    } catch {
      setError("Something went wrong. Please try again later.");
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
            className={`px-6 bg-white rounded-3xl`}
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
                Sign In
              </Text>

              <Text className="px-4 leading-5 text-center text-gray-500">
                To sign in to an account in the application, enter your email
                and password
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
              {/* EMAIL INPUT */}
              <View
                className={`flex-row items-center gap-2 px-4 bg-gray-100/80 rounded-2xl ${Platform.OS === "ios" ? "h-14" : "h-[46px]"}`}
              >
                <Mail size={20} color={THEME_COLOR} />
                <TextInput
                  placeholder="E-mail"
                  placeholderTextColor="#999"
                  autoCapitalize="none"
                  className="flex-1 h-full text-base text-black"
                  value={email}
                  onChangeText={setEmail}
                />
              </View>

              {/* PASSWORD INPUT */}
              <View
                className={`flex-row items-center gap-2 px-4 bg-gray-100/80 rounded-2xl ${Platform.OS === "ios" ? "h-14" : "h-[46px]"}`}
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

              {/* Forgot Password */}
              <TouchableOpacity className="items-end">
                <Text
                  className="text-sm font-semibold"
                  style={{ color: THEME_COLOR }}
                >
                  Forgot password?
                </Text>
              </TouchableOpacity>
            </View>

            {/* --- ACTIONS SECTION --- */}
            <View className="gap-4 mt-8">
              {/* PRIMARY BUTTON (Continue) */}
              <TouchableOpacity
                onPress={handleLogin}
                className={cn(
                  "items-center justify-center rounded-full shadow-sm h-14",
                  Platform.OS === "ios" ? "h-14" : "h-[46px]"
                )}
                style={{ backgroundColor: THEME_COLOR }}
              >
                {loading ? (
                  <ActivityIndicator size="small" color="white" />
                ) : (
                  <Text className="text-base font-bold text-white">
                    Continue
                  </Text>
                )}
              </TouchableOpacity>

              {/* Divider */}
              <View className="flex-row items-center justify-center my-2">
                <View className="h-[1px] bg-gray-200 w-16" />
                <Text className="mx-3 text-xs text-gray-400">
                  Don&apos;t have an account yet?
                </Text>
                <View className="h-[1px] bg-gray-200 w-16" />
              </View>

              <View className="gap-3">
                {/* SECONDARY BUTTON (Create Account) */}
                <Link href="/sign-up" asChild>
                  <TouchableOpacity
                    className={cn(
                      "items-center justify-center bg-gray-100 rounded-full",
                      Platform.OS === "ios" ? "h-14" : "h-[46px]"
                    )}
                  >
                    <Text className="text-base font-semibold text-black">
                      Create an account
                    </Text>
                  </TouchableOpacity>
                </Link>

                {/* SOCIAL BUTTONS */}
                <TouchableOpacity
                  className={cn(
                    "flex-row items-center justify-center bg-gray-100 rounded-full h-14",
                    Platform.OS === "ios" ? "h-14" : "h-[46px]"
                  )}
                >
                  <Icon name="apple" size={22} color="black" className="mr-2" />
                  <Text className="ml-2 text-base font-semibold text-black">
                    Sign in with Apple
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  className={cn(
                    "flex-row items-center justify-center bg-gray-100 rounded-full h-14",
                    Platform.OS === "ios" ? "h-14" : "h-[46px]"
                  )}
                >
                  {/* Using a generic Google icon representation or Icon lib */}
                  <Icon
                    name="google"
                    size={20}
                    color="black"
                    className="mr-2"
                  />
                  <Text className="ml-2 text-base font-semibold text-black">
                    Sign in with Google
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>

          <View className="mt-4">
            <Text className="text-xs leading-5 text-center text-gray-400">
              By clicking &quot;Continue&quot;, I have read and agree{"\n"}
              with the{" "}
              <Text className="text-gray-600 underline">
                Term Sheet, Privacy Policy
              </Text>
            </Text>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}
