import { THEME_COLOR } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { router } from "expo-router";
import { CreditCard, TrendingUp, Wallet } from "lucide-react-native";
import React from "react";
import { StatusBar, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  return (
    <View className="flex-1 bg-[#F2F2F7]">
      <StatusBar barStyle="dark-content" />

      <SafeAreaView className="justify-between flex-1 px-6 pt-2">
        <View className="flex-row items-center justify-between">
          <View className="items-center justify-center w-10 h-10 border border-gray-200 rounded-full bg-white/80">
            <Wallet size={20} color="black" />
          </View>
          <TouchableOpacity
            className="px-4 py-2 bg-white border border-gray-200 rounded-full"
            onPress={() => router.push("/sign-in")}
          >
            <Text className="text-sm font-semibold text-gray-900">Sign In</Text>
          </TouchableOpacity>
        </View>

        {/* 2. HERO SECTION - APPLE WALLET STYLE */}
        <View className="items-center justify-center flex-1">
          <View className="relative items-center justify-center w-full aspect-square">
            {/* <View className="absolute w-64 h-64 bg-indigo-500/20 rounded-full blur-[90px]" /> */}

            {/* Back Card (Secondary) */}
            <View
              className="absolute w-[85%] h-64 bg-gray-800 rounded-[32px] top-4 shadow-sm opacity-90 transform scale-95"
              style={{ transform: [{ translateY: -20 }, { scale: 0.92 }] }}
            />

            {/* Middle Card (Accent) */}
            <View
              className="absolute w-[90%] h-64 bg-black rounded-[32px] top-6 shadow-md transform scale-95"
              style={{ transform: [{ translateY: -10 }, { scale: 0.96 }] }}
            >
              <View className="justify-between flex-1 p-6 opacity-50">
                <View className="w-16 h-2 bg-gray-600 rounded-full" />
                <View className="flex-row gap-4">
                  <View className="w-10 h-10 bg-gray-700 rounded-full" />
                  <View className="w-24 h-4 mt-2 bg-gray-700 rounded-md" />
                </View>
              </View>
            </View>

            <View
              className="w-full h-64 bg-white rounded-[32px] shadow-2xl shadow-gray-300/50 p-6 flex justify-between z-20 border border-gray-100"
              style={{ transform: [{ translateY: -30 }] }}
            >
              <View className="flex-row items-start justify-between">
                <View>
                  <Text className="mb-1 text-xs font-medium tracking-widest text-gray-400 uppercase">
                    Total Balance
                  </Text>
                  <Text className="text-4xl font-bold tracking-tight text-black">
                    $14,240.50
                  </Text>
                </View>
                <View className="flex-row items-center px-2 py-1 bg-green-100 rounded-md">
                  <TrendingUp size={14} color="#16a34a" />
                  <Text className="ml-1 text-xs font-bold text-green-700">
                    +12%
                  </Text>
                </View>
              </View>

              {/* Minimal Chart Lines (Apple Stocks style) */}
              <View className="flex-row items-end justify-between h-20 mt-4 space-x-2 border-b border-b-neutral-200">
                {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
                  <View
                    key={i}
                    className={`flex-1 rounded-t-lg ${i === 0 ? "ml-0" : "ml-2"} ${i === 5 ? "bg-black" : "bg-gray-100"}`}
                    style={{ height: `${h}%` }}
                  />
                ))}
              </View>

              <View className="flex-row items-center gap-2 mt-2">
                <View className="bg-gray-100 p-1.5 rounded-full">
                  <CreditCard size={12} color="#666" />
                </View>
                <Text className="text-xs font-medium text-gray-400">
                  Main Account •••• 4829
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View>
          <Text className="text-[38px] font-bold text-black leading-tight tracking-tight mb-3">
            Master your{"\n"}
            finance with <Text style={{ color: THEME_COLOR }}>clarity.</Text>
          </Text>

          <Text className="mb-8 text-lg font-normal leading-7 text-gray-500">
            Effortless tracking. Beautiful insights.{"\n"}
            Designed for your peace of mind.
          </Text>

          <TouchableOpacity
            onPress={() => router.push("/sign-up")}
            activeOpacity={0.8}
            style={{ backgroundColor: THEME_COLOR }}
            className={cn(
              "w-full h-[58px] rounded-full flex-row items-center justify-center shadow-lg shadow-gray-400/30"
            )}
          >
            <Text className="text-white text-[17px] font-bold mr-2">
              Get Started
            </Text>
          </TouchableOpacity>

          <Text className="mt-6 text-xs font-medium text-center text-gray-400">
            Secure • Private • Smart
          </Text>
        </View>
      </SafeAreaView>
    </View>
  );
}
