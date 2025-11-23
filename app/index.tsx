import { THEME_COLOR } from "@/lib/constants";
import { router } from "expo-router";
import {
  ArrowUpRight,
  Coffee,
  PieChart,
  ShoppingBag,
  TrendingUp,
} from "lucide-react-native";
import React from "react";
import { StatusBar, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  return (
    <View className="flex-1 bg-[#f5f7f2]">
      <StatusBar barStyle="dark-content" />

      {/* 1. ATMOSPHERIC BACKGROUND */}
      {/* Gradient subtil pentru a nu fi alb plat */}
      <View className="absolute top-0 left-0 right-0 h-full">
        <View className="absolute top-[-10%] left-[-20%] w-[150%] h-[60%] bg-blue-100/50 rounded-full blur-[100px]" />
        <View className="absolute bottom-[-10%] right-[-20%] w-[100%] h-[50%] bg-indigo-100/50 rounded-full blur-[80px]" />
      </View>

      <SafeAreaView className="justify-between flex-1">
        {/* 2. HERO VISUAL - "BENTO GRID" LAYOUT */}
        {/* Acesta simulează interfața aplicației plutind în spațiu */}
        <View className="items-center justify-center flex-1 mt-10">
          <View className="relative w-80 h-80">
            {/* MAIN WIDGET (Expense Chart) */}
            <View
              className="absolute top-0 left-4 right-4 h-48 bg-white rounded-[32px] shadow-2xl shadow-indigo-200/60 p-5 flex justify-between z-20"
              style={{ transform: [{ rotate: "-6deg" }] }}
            >
              <View className="flex-row items-center justify-between">
                <View className="p-2 bg-orange-100 rounded-full">
                  <PieChart size={20} color="#ea580c" />
                </View>
                <Text className="text-xs font-medium text-gray-400">
                  This Month
                </Text>
              </View>

              <View>
                <Text className="text-3xl font-bold text-black">$1,240.50</Text>
                <Text className="text-sm text-gray-500">Total Expenses</Text>
              </View>

              {/* Fake Bar Chart */}
              <View className="flex-row items-end justify-between h-12 gap-2 mt-2">
                <View className="w-8 bg-gray-100 rounded-t-md h-[40%]" />
                <View className="w-8 bg-gray-100 rounded-t-md h-[60%]" />
                <View className="w-8 bg-black rounded-t-md h-[85%]" />
                <View className="w-8 bg-gray-100 rounded-t-md h-[50%]" />
                <View className="w-8 bg-gray-100 rounded-t-md h-[30%]" />
              </View>
            </View>

            {/* FLOATING BUBBLE 1 (Income) */}
            <View
              className="absolute z-30 flex-row items-center px-4 py-3 bg-white border shadow-xl -right-4 top-10 rounded-2xl shadow-green-100 border-green-50"
              style={{ transform: [{ rotate: "12deg" }] }}
            >
              <View className="p-1 mr-2 bg-green-100 rounded-full">
                <ArrowUpRight size={16} color="#16a34a" />
              </View>
              <View>
                <Text className="text-xs font-bold text-gray-400">Salary</Text>
                <Text className="text-sm font-bold text-green-600">
                  +$3,200
                </Text>
              </View>
            </View>

            {/* FLOATING BUBBLE 2 (Expense - Coffee) */}
            <View
              className="absolute z-10 flex-row items-center px-4 py-3 bg-white shadow-xl -left-2 bottom-24 rounded-2xl shadow-gray-200"
              style={{ transform: [{ rotate: "-15deg" }] }}
            >
              <View className="p-2 mr-2 bg-gray-100 rounded-full">
                <Coffee size={18} color="#333" />
              </View>
              <Text className="font-bold text-black">-$5.50</Text>
            </View>

            {/* FLOATING BUBBLE 3 (Expense - Shopping) */}
            <View
              className="absolute z-30 flex-row items-center px-4 py-3 bg-white shadow-xl right-6 -bottom-2 rounded-2xl shadow-pink-100"
              style={{ transform: [{ rotate: "4deg" }] }}
            >
              <View className="p-2 mr-2 bg-pink-100 rounded-full">
                <ShoppingBag size={18} color="#db2777" />
              </View>
              <View>
                <Text className="text-xs font-bold text-gray-400">Zara</Text>
                <Text className="text-sm font-bold text-black">-$89.00</Text>
              </View>
            </View>
          </View>
        </View>

        {/* 3. TEXT & CTA */}
        <View className="px-8 pb-10">
          <View className="mb-10">
            <View className="flex-row items-center mb-4">
              <View className="px-3 py-1 bg-indigo-100 rounded-full">
                <Text className="text-xs font-bold tracking-wider text-indigo-700 uppercase">
                  Early Access
                </Text>
              </View>
            </View>
            <Text className="text-[42px] font-bold text-black leading-[1.1] tracking-tight">
              Stop guessing
              {"\n"}where your
              <Text style={{ color: THEME_COLOR }}> money goes.</Text>
            </Text>
            <Text className="mt-4 text-lg font-medium leading-7 text-gray-500">
              Track every expense, analyze spending habits, and take full
              control of your financial health.
            </Text>
          </View>

          <TouchableOpacity
            onPress={() => router.push("/sign-in")}
            activeOpacity={0.8}
            className="w-full"
            style={{
              backgroundColor: THEME_COLOR,
              height: 64,
              borderRadius: 200,
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "row",
            }}
          >
            <Text className="mr-2 text-lg font-bold text-white">
              Start Tracking
            </Text>
            <TrendingUp size={20} color="white" />
          </TouchableOpacity>

          <View className="flex-row items-center justify-center gap-6 mt-6">
            <Text className="text-sm font-medium text-gray-400">Simple</Text>
            <View className="w-1 h-1 bg-gray-300 rounded-full" />
            <Text className="text-sm font-medium text-gray-400">Secure</Text>
            <View className="w-1 h-1 bg-gray-300 rounded-full" />
            <Text className="text-sm font-medium text-gray-400">Smart</Text>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}
