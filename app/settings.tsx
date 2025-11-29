import { authClient } from "@/lib/auth-client";
import { router } from "expo-router";
import {
  Bell,
  ChevronLeft,
  ChevronRight,
  CreditCard,
  Globe,
  HelpCircle,
  Lock,
  LogOut,
  LucideIcon,
  Moon,
  Shield,
  User,
} from "lucide-react-native";
import React, { useState } from "react";
import {
  Alert,
  Pressable,
  ScrollView,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Settings = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const handleSignOut = async () => {
    Alert.alert(
      "Log Out",
      "Are you sure you want to log out?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Log Out",
          style: "destructive",
          onPress: async () => {
            try {
              await authClient.signOut();
            } catch {
              Alert.alert("Error", "Failed to sign out.");
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-neutral-100" edges={["top"]}>
      <View className="flex-row items-center px-5 pt-4">
        <Pressable
          onPress={() => router.back()}
          className="absolute left-5 top-6"
        >
          <View className="items-center justify-center p-2 bg-white rounded-full size-12 border border-neutral-200/75">
            <ChevronLeft size={28} style={{ marginLeft: -2 }} />
          </View>
        </Pressable>
        <View className="flex-1 px-5 pb-4 mt-4">
          <Text className="text-2xl font-bold tracking-tight text-center text-black">
            Settings
          </Text>
        </View>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        <SettingsSection>
          <SettingRow
            icon={User}
            iconBg="bg-neutral-800"
            label="Personal Information"
            onPress={() => console.log("Personal Info")}
          />
          <SettingRow
            icon={Shield}
            iconBg="bg-neutral-800"
            label="Login & Security"
            onPress={() => console.log("Security")}
            isLast={true}
          />
        </SettingsSection>

        <SettingsSection>
          <SettingRow
            icon={Bell}
            iconBg="bg-neutral-800"
            label="Notifications"
            rightElement={
              <Switch
                value={notificationsEnabled}
                onValueChange={setNotificationsEnabled}
                trackColor={{ false: "#767577", true: "#34C759" }}
                thumbColor={"#f4f3f4"}
                style={{ marginVertical: -12 }}
              />
            }
          />
          <SettingRow
            icon={Moon}
            iconBg="bg-neutral-800"
            label="Dark Mode"
            rightElement={
              <Switch
                value={isDarkTheme}
                onValueChange={setIsDarkTheme}
                trackColor={{ false: "#767577", true: "#34C759" }}
                thumbColor={"#f4f3f4"}
                style={{ marginVertical: -12 }}
              />
            }
          />
          <SettingRow
            icon={Globe}
            iconBg="bg-neutral-800"
            label="Language"
            value="English"
            onPress={() => console.log("Language")}
          />
          <SettingRow
            icon={CreditCard}
            iconBg="bg-neutral-800"
            label="Currency"
            value="USD ($)"
            onPress={() => console.log("Currency")}
            isLast={true}
          />
        </SettingsSection>

        <SettingsSection>
          <SettingRow
            icon={HelpCircle}
            iconBg="bg-neutral-800"
            label="Help Center"
            onPress={() => console.log("Help Center")}
          />
          <SettingRow
            icon={Lock}
            iconBg="bg-neutral-800"
            label="Privacy Policy"
            onPress={() => console.log("Privacy Policy")}
            isLast={true}
          />
        </SettingsSection>

        <View className="mx-4 mt-6">
          <TouchableOpacity
            onPress={handleSignOut}
            activeOpacity={0.8}
            className="flex-row items-center justify-center h-[50px] gap-3 bg-white rounded-full"
          >
            <LogOut size={20} color="#DC2626" className="mr-2" />
            <Text className="text-base font-semibold text-red-600">
              Log Out
            </Text>
          </TouchableOpacity>
          <Text className="mt-4 text-xs text-center text-neutral-400">
            Version 1.0.0 (Build 102)
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const SettingsSection = ({ children }: { children: React.ReactNode }) => (
  <View className="mt-8">
    <View className="mx-4 overflow-hidden bg-white rounded-3xl">
      {children}
    </View>
  </View>
);

type SettingRowProps = {
  icon: LucideIcon;
  iconBg: string;
  label: string;
  value?: string;
  onPress?: () => void;
  rightElement?: React.ReactNode;
  isLast?: boolean;
};

const SettingRow = ({
  icon: Icon,
  iconBg,
  label,
  value,
  onPress,
  rightElement,
  isLast = false,
}: SettingRowProps) => {
  const Container = onPress ? TouchableOpacity : View;

  return (
    <Container activeOpacity={onPress ? 0.7 : 1} onPress={onPress}>
      <View className="flex-row items-center pl-4 bg-white">
        <View
          className={`size-[30px] rounded-lg items-center justify-center mr-4 ${iconBg}`}
        >
          <Icon size={18} color="white" strokeWidth={2} />
        </View>
        <View
          className={`flex-1 flex-row items-center justify-between pr-4 py-3.5 ${
            !isLast ? "border-b border-neutral-200" : ""
          }`}
        >
          <Text className="text-base font-medium text-black">{label}</Text>
          <View className="flex-row items-center">
            {rightElement ? (
              rightElement
            ) : (
              <>
                {value && (
                  <Text className="mr-2 text-base text-neutral-500">
                    {value}
                  </Text>
                )}
                {onPress && <ChevronRight size={20} color="#C7C7CC" />}
              </>
            )}
          </View>
        </View>
      </View>
    </Container>
  );
};

export default Settings;
