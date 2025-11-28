import { authClient } from "@/lib/auth-client";
import { THEME_COLOR } from "@/lib/constants";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import {
  ArrowDownRight,
  ArrowUpRight,
  Calendar,
  CreditCard,
  LucideIcon,
  MoreHorizontal,
  PieChart,
  Plus,
  Settings,
  TrendingUp,
  Wallet,
} from "lucide-react-native";
import React from "react";
import {
  Dimensions,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");
const CARD_WIDTH = width - 48; // Full width minus padding

// MOCK DATA
const RECENT_TXNS = [
  {
    id: 1,
    title: "Apple Services",
    subtitle: "Entertainment",
    amount: -14.99,
    date: "Today",
    icon: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
  },
  {
    id: 2,
    title: "Uber Trip",
    subtitle: "Transport",
    amount: -24.5,
    date: "Yesterday",
    icon: "UBER",
  },
  {
    id: 3,
    title: "Freelance Project",
    subtitle: "Income",
    amount: 1250.0,
    date: "Mon",
    icon: "WORK",
  },
];

const CATEGORY_STATS = [
  {
    label: "Food & Dining",
    amount: 450,
    total: 1000,
    color: "#FF9F0A",
    percent: "45%",
  },
  {
    label: "Transport",
    amount: 120,
    total: 400,
    color: "#0A84FF",
    percent: "30%",
  },
  {
    label: "Shopping",
    amount: 890,
    total: 1200,
    color: "#BF5AF2",
    percent: "74%",
  },
  {
    label: "Utilities",
    amount: 200,
    total: 300,
    color: "#30D158",
    percent: "66%",
  },
];

export default function HomeScreen() {
  const { data: session } = authClient.useSession();

  return (
    // 1. Folosim un View simplu ca container principal pentru a permite poziționarea absolută corectă
    <View className="flex-1 bg-gray-50">
      <SafeAreaView className="flex-1" edges={["top"]}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          // 2. Mărim padding-ul jos pentru a face loc Tab-urilor și butonului plutitor
          contentContainerStyle={{ paddingBottom: 140 }}
        >
          {/* 1. HEADER */}
          <View className="flex-row items-center justify-between px-6 py-4">
            <View>
              <Text className="text-2xl font-bold tracking-tight text-black">
                Hello, {session?.user.name} 👋
              </Text>
            </View>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => router.push("/settings")}
            >
              <Settings color="gray" />
            </TouchableOpacity>
          </View>

          {/* 2. CAROUSEL CARDS */}
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 20, gap: 12 }}
            decelerationRate="fast"
            snapToInterval={CARD_WIDTH + 12}
            className="mt-2"
          >
            {/* CARD 1: FINANCIAL OVERVIEW */}
            <LinearGradient
              colors={[THEME_COLOR, "#262626"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{
                width: CARD_WIDTH,
                height: 210,
                borderRadius: 24,
                padding: 24,
                justifyContent: "space-between",
                shadowColor: "#000",
                shadowOpacity: 0.2,
                shadowRadius: 10,
                shadowOffset: { width: 0, height: 4 },
              }}
            >
              <View>
                <View className="flex-row items-center mb-2">
                  <Text className="mr-2 font-medium text-gray-400">
                    Total Net Worth
                  </Text>
                  <View className="bg-green-500/20 px-2 py-0.5 rounded-full flex-row items-center">
                    <TrendingUp size={12} color="#4ade80" />
                    <Text className="ml-1 text-xs font-bold text-green-400">
                      +4.2%
                    </Text>
                  </View>
                </View>
                <Text className="text-4xl font-bold tracking-tight text-white">
                  $14,235.00
                </Text>
                <Text className="mt-1 text-xs text-gray-500">
                  Updated just now
                </Text>
              </View>

              <View className="flex-row p-3 mt-6 border bg-white/5 rounded-2xl border-white/5">
                <View className="flex-1 pr-4 border-r border-white/10">
                  <View className="flex-row items-center mb-1">
                    <View className="items-center justify-center w-4 h-4 mr-2 rounded-full bg-green-500/20">
                      <ArrowUpRight size={10} color="#4ade80" />
                    </View>
                    <Text className="text-xs text-gray-400">Income</Text>
                  </View>
                  <Text className="text-lg font-semibold text-white">
                    $3,240.50
                  </Text>
                </View>

                <View className="flex-1 pl-4">
                  <View className="flex-row items-center mb-1">
                    <View className="items-center justify-center w-4 h-4 mr-2 rounded-full bg-red-500/20">
                      <ArrowDownRight size={10} color="#ef4444" />
                    </View>
                    <Text className="text-xs text-gray-400">Expenses</Text>
                  </View>
                  <Text className="text-lg font-semibold text-white">
                    $1,145.00
                  </Text>
                </View>
              </View>
            </LinearGradient>

            {/* CARD 2: STATS */}
            <LinearGradient
              colors={["#007AFF", "#0055B3"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{
                width: CARD_WIDTH,
                height: 210,
                borderRadius: 24,
                padding: 24,
                justifyContent: "space-between",
                shadowColor: "#000",
                shadowOpacity: 0.2,
                shadowRadius: 10,
                shadowOffset: { width: 0, height: 4 },
              }}
            >
              <View>
                <View className="flex-row items-center justify-between">
                  <Text className="font-medium text-blue-100">
                    Savings Rate
                  </Text>
                  <PieChart size={20} color="white" opacity={0.8} />
                </View>
                <Text className="mt-2 text-4xl font-bold tracking-tight text-white">
                  35%
                </Text>
                <Text className="mt-1 text-sm text-blue-100 opacity-80">
                  You saved $850 this month. Keep it up!
                </Text>
              </View>

              <View className="w-full h-2 overflow-hidden rounded-full bg-white/10">
                <View className="bg-white w-[35%] h-full rounded-full" />
              </View>
            </LinearGradient>

            {/* CARD 3: DAILY AVERAGE */}
            <LinearGradient
              colors={["#FF9500", "#E08200"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{
                width: CARD_WIDTH,
                height: 210,
                borderRadius: 24,
                padding: 24,
                justifyContent: "space-between",
                shadowColor: "#000",
                shadowOpacity: 0.2,
                shadowRadius: 10,
                shadowOffset: { width: 0, height: 4 },
              }}
            >
              <View>
                <View className="flex-row items-center justify-between">
                  <Text className="font-medium text-orange-100">Daily Avg</Text>
                  <Calendar size={20} color="white" opacity={0.8} />
                </View>
                <Text className="mt-2 text-4xl font-bold tracking-tight text-white">
                  $42.50
                </Text>
                <Text className="mt-1 text-sm text-orange-100 opacity-80">
                  -12% less than last month.
                </Text>
              </View>
              <View className="flex-row items-end h-10 gap-1 opacity-50">
                <View className="w-2 h-4 bg-white rounded-t-sm" />
                <View className="w-2 h-6 bg-white rounded-t-sm" />
                <View className="w-2 h-3 bg-white rounded-t-sm" />
              </View>
            </LinearGradient>
          </ScrollView>

          {/* 3. QUICK ACTIONS */}
          <View className="flex-row justify-around px-6 mt-8">
            {/* Nota: Am scos butonul Add de aici pentru ca il punem floating, 
                 sau il poti lasa daca vrei redundanta */}
            <ActionButton
              icon={Wallet}
              label="Budget"
              color="bg-gray-200"
              iconColor="#000"
            />
            <ActionButton
              icon={CreditCard}
              label="Cards"
              color="bg-gray-200"
              iconColor="#000"
            />
            <ActionButton
              icon={MoreHorizontal}
              label="More"
              color="bg-gray-100"
              iconColor="#555"
            />
          </View>

          {/* 4. RECENT ACTIVITY */}
          <View className="px-6 mt-10">
            <View className="flex-row items-center justify-between mb-4">
              <Text className="text-lg font-bold text-black">
                Recent Activity
              </Text>
              <TouchableOpacity onPress={() => router.push("/transactions")}>
                <Text className="text-sm font-medium text-blue-600">
                  See All
                </Text>
              </TouchableOpacity>
            </View>

            <View className="bg-white rounded-[20px] overflow-hidden shadow-sm shadow-gray-100">
              {RECENT_TXNS.map((txn, index) => (
                <View key={txn.id}>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    className="flex-row items-center p-4"
                  >
                    <View
                      className={`w-10 h-10 rounded-full items-center justify-center mr-4 ${
                        txn.amount > 0 ? "bg-green-100" : "bg-gray-100"
                      }`}
                    >
                      {txn.amount > 0 ? (
                        <ArrowUpRight size={20} color="#16a34a" />
                      ) : (
                        <CreditCard size={20} color="#374151" />
                      )}
                    </View>

                    <View className="flex-1">
                      <Text className="font-semibold text-black text-[15px]">
                        {txn.title}
                      </Text>
                      <Text className="text-xs text-gray-500">
                        {txn.subtitle} • {txn.date}
                      </Text>
                    </View>

                    <Text
                      className={`font-bold text-[15px] ${
                        txn.amount > 0 ? "text-green-600" : "text-black"
                      }`}
                    >
                      {txn.amount > 0 ? "+" : ""}
                      {txn.amount.toFixed(2)}
                    </Text>
                  </TouchableOpacity>
                  {index < RECENT_TXNS.length - 1 && (
                    <View className="h-[1px] bg-gray-100 ml-[68px]" />
                  )}
                </View>
              ))}
            </View>
          </View>

          {/* 5. SPENDING BY CATEGORY */}
          <View className="px-6 mt-8 mb-6">
            <Text className="mb-4 text-lg font-bold text-black">
              Spending Breakdown
            </Text>
            <View className="bg-white rounded-[20px] p-5 shadow-sm shadow-gray-100">
              <View className="flex-row items-end justify-between mb-6">
                <View>
                  <Text className="text-sm font-medium text-gray-500">
                    Total Spent
                  </Text>
                  <Text className="text-3xl font-bold text-black">
                    $2,450.00
                  </Text>
                </View>
                <View className="px-3 py-1 bg-gray-100 rounded-full">
                  <Text className="text-xs font-bold text-gray-600">
                    Nov 2024
                  </Text>
                </View>
              </View>

              <View>
                {CATEGORY_STATS.map((cat, index) => (
                  <View
                    key={cat.label}
                    className={
                      index === CATEGORY_STATS.length - 1 ? "" : "mb-5"
                    }
                  >
                    <View className="flex-row justify-between mb-2">
                      <View className="flex-row items-center">
                        <View
                          className="w-2 h-2 mr-2 rounded-full"
                          style={{ backgroundColor: cat.color }}
                        />
                        <Text className="text-sm font-semibold text-gray-700">
                          {cat.label}
                        </Text>
                      </View>
                      <View className="flex-row">
                        <Text className="mr-1 text-sm font-bold text-black">
                          ${cat.amount}
                        </Text>
                        <Text className="text-sm text-gray-400">
                          ({cat.percent})
                        </Text>
                      </View>
                    </View>
                    <View className="h-3 overflow-hidden bg-gray-100 rounded-full">
                      {/* FIX: Typecasting corect pentru width */}
                      <View
                        className="h-full rounded-full"
                        style={{
                          width: cat.percent as any,
                          backgroundColor: cat.color,
                        }}
                      />
                    </View>
                  </View>
                ))}
              </View>

              <TouchableOpacity className="items-center pt-4 mt-6 border-t border-gray-100">
                <Text className="text-sm font-semibold text-blue-600">
                  Show Full Report
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>

      {/* 🔥 FLOATING ACTION BUTTON (FAB) 
         Acesta este plasat în afara SafeAreaView/ScrollView, 
         direct în containerul principal.
      */}
      <TouchableOpacity
        onPress={() => router.push("/add-transaction")}
        activeOpacity={0.8}
        className="absolute items-center justify-center rounded-full shadow-xl right-6 bottom-4 shadow-black/30"
        style={{
          backgroundColor: THEME_COLOR,
          width: 64, // ~Aceeași înălțime cu tab-bar-ul custom
          height: 64,
          elevation: 8, // Umbră pentru Android
        }}
      >
        <Plus size={32} color="white" strokeWidth={2.5} />
      </TouchableOpacity>
    </View>
  );
}

interface ActionButtonProps {
  icon: LucideIcon;
  label: string;
  color: string;
  iconColor?: string;
  onPress?: () => void;
}

const ActionButton = ({
  icon: Icon,
  label,
  color,
  iconColor = "white",
  onPress,
}: ActionButtonProps) => (
  <TouchableOpacity
    onPress={onPress}
    className="items-center justify-center gap-2"
    activeOpacity={0.8}
  >
    <View
      className={`w-16 h-16 rounded-full items-center justify-center ${color}`}
    >
      <Icon size={26} color={iconColor} strokeWidth={1.5} />
    </View>
    <Text className="text-xs font-medium text-gray-600">{label}</Text>
  </TouchableOpacity>
);
