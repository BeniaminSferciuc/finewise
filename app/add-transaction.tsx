import DateTimePicker from "@react-native-community/datetimepicker"; // Asigură-te că instalezi pachetul
import { router } from "expo-router";

import {
  Calendar as CalendarIcon,
  Check,
  CreditCard,
  Plus,
  Tag,
  X,
} from "lucide-react-native";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const INITIAL_CATEGORIES = [
  "Food",
  "Transport",
  "Home",
  "Shopping",
  "Entertainment",
  "Health",
];

const AddTransactions = () => {
  // --- STATE ---
  const [type, setType] = useState<"income" | "expense">("expense");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");

  // Category State
  const [categories, setCategories] = useState(INITIAL_CATEGORIES);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isCreatingCategory, setIsCreatingCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");

  // Date State
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  // --- HANDLERS ---

  const handleSave = () => {
    if (!amount) return;
    console.log({
      amount: parseFloat(amount),
      type,
      category: selectedCategory,
      description,
      date: date.toISOString(),
    });

    router.back();
  };

  // Logică Calendar
  const onDateChange = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || date;
    // Pe Android trebuie să închidem manual picker-ul
    if (Platform.OS === "android") {
      setShowDatePicker(false);
    }
    setDate(currentDate);
  };

  // Logică Categorie Nouă
  const handleAddCategory = () => {
    if (newCategoryName.trim().length > 0) {
      setCategories([...categories, newCategoryName.trim()]);
      setSelectedCategory(newCategoryName.trim());
      setNewCategoryName("");
      setIsCreatingCategory(false);
    } else {
      setIsCreatingCategory(false); // Anulează dacă e gol
    }
  };

  // Formatare dată pentru afișare (ex: "Today, Nov 21")
  const formatDate = (date: Date) => {
    const today = new Date();
    const isToday = date.toDateString() === today.toDateString();
    const dateString = date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
    return isToday ? `Today, ${dateString}` : dateString;
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        {/* HEADER */}
        <View className="flex-row items-center justify-between px-4 py-2">
          <TouchableOpacity
            onPress={() => router.back()}
            className="items-center justify-center w-10 h-10 bg-gray-200 rounded-full"
          >
            <X size={20} color="#333" />
          </TouchableOpacity>
          <Text className="text-lg font-bold text-black">New Transaction</Text>
          <View className="w-10" />
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 40 }}
          className="flex-1 mt-2"
        >
          {/* 1. SEGMENTED CONTROL */}
          <View className="px-4 mt-4">
            <View className="flex-row h-10 p-1 bg-gray-200 rounded-lg">
              <TouchableOpacity
                onPress={() => setType("expense")}
                className={`flex-1 rounded-md justify-center items-center ${
                  type === "expense" ? "bg-white shadow-sm" : ""
                }`}
              >
                <Text
                  className={`font-medium text-sm ${type === "expense" ? "text-black" : "text-gray-500"}`}
                >
                  Expense
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setType("income")}
                className={`flex-1 rounded-md justify-center items-center ${
                  type === "income" ? "bg-white shadow-sm" : ""
                }`}
              >
                <Text
                  className={`font-medium text-sm ${type === "income" ? "text-black" : "text-gray-500"}`}
                >
                  Income
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* 2. AMOUNT INPUT */}
          <View className="items-center justify-center mt-8 mb-6">
            <Text className="mb-2 text-xs font-bold tracking-widest text-gray-400 uppercase">
              ENTER AMOUNT
            </Text>
            <View className="flex-row items-center">
              <Text
                className={`text-4xl font-bold mr-1 ${
                  type === "income" ? "text-green-600" : "text-black"
                }`}
              >
                {type === "expense" ? "-" : "+"}$
              </Text>
              <TextInput
                className={`text-6xl font-bold tracking-tight ${
                  type === "income" ? "text-green-600" : "text-black"
                }`}
                placeholder="0"
                placeholderTextColor="#E5E7EB"
                keyboardType="numeric"
                value={amount}
                onChangeText={setAmount}
                autoFocus
                selectionColor={type === "income" ? "#16a34a" : "black"}
              />
            </View>
          </View>

          {/* 3. FORM GROUP */}
          <View className="px-4">
            <View className="overflow-hidden bg-white border border-gray-100 shadow-sm rounded-2xl shadow-gray-100">
              {/* --- DATE ROW --- */}
              <View className="border-b border-gray-100">
                <TouchableOpacity
                  onPress={() => setShowDatePicker(true)}
                  activeOpacity={0.7}
                  className="flex-row items-center p-4"
                >
                  <View className="items-center justify-center w-8 h-8 mr-3 bg-purple-100 rounded-full">
                    <CalendarIcon size={16} color="#9333EA" />
                  </View>
                  <Text className="flex-1 text-base font-medium text-black">
                    Date
                  </Text>

                  {/* Date Display */}
                  <View className="px-3 py-1 bg-gray-100 rounded-lg">
                    <Text className="font-semibold text-blue-600">
                      {formatDate(date)}
                    </Text>
                  </View>
                </TouchableOpacity>

                {/* Native Date Picker (Conditional Render) */}
                {showDatePicker &&
                  (Platform.OS === "ios" ? (
                    <View className="items-center px-4 pb-4">
                      <DateTimePicker
                        value={date}
                        mode="date"
                        display="spinner"
                        onChange={onDateChange}
                        style={{ height: 120, width: "100%" }}
                        textColor="black"
                      />
                      <TouchableOpacity
                        onPress={() => setShowDatePicker(false)}
                        className="px-4 py-2 mt-2 bg-gray-100 rounded-full"
                      >
                        <Text className="text-sm font-medium">Done</Text>
                      </TouchableOpacity>
                    </View>
                  ) : (
                    // Pe Android se deschide ca dialog automat cand showDatePicker e true
                    <DateTimePicker
                      value={date}
                      mode="date"
                      display="default"
                      onChange={onDateChange}
                    />
                  ))}
              </View>

              {/* --- CATEGORY ROW --- */}
              <View className="p-4 border-b border-gray-100">
                <View className="flex-row items-center mb-3">
                  <View className="items-center justify-center w-8 h-8 mr-3 bg-orange-100 rounded-full">
                    <Tag size={16} color="#F97316" />
                  </View>
                  <Text className="text-base font-medium text-black">
                    Category
                  </Text>
                  {selectedCategory ? (
                    <Text className="ml-auto text-gray-500">
                      {selectedCategory}
                    </Text>
                  ) : null}
                </View>

                {/* Category Chips / Creator */}
                {isCreatingCategory ? (
                  <View className="flex-row items-center p-1 border border-gray-200 bg-gray-50 rounded-xl">
                    <TextInput
                      className="flex-1 px-3 py-2 text-base text-black"
                      placeholder="Enter new category..."
                      autoFocus
                      value={newCategoryName}
                      onChangeText={setNewCategoryName}
                    />
                    <TouchableOpacity
                      onPress={handleAddCategory}
                      className="items-center justify-center w-8 h-8 mr-1 bg-black rounded-lg"
                    >
                      <Check size={16} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => setIsCreatingCategory(false)}
                      className="items-center justify-center w-8 h-8"
                    >
                      <X size={18} color="#999" />
                    </TouchableOpacity>
                  </View>
                ) : (
                  <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    className="flex-row"
                  >
                    {/* ADD NEW BUTTON */}
                    <TouchableOpacity
                      onPress={() => setIsCreatingCategory(true)}
                      className="items-center justify-center w-10 h-8 mr-2 bg-gray-100 border border-gray-200 border-dashed rounded-full"
                    >
                      <Plus size={16} color="#666" />
                    </TouchableOpacity>

                    {/* Category List */}
                    {categories.map((cat) => (
                      <TouchableOpacity
                        key={cat}
                        onPress={() => setSelectedCategory(cat)}
                        className={`px-4 py-1.5 rounded-full mr-2 border ${
                          selectedCategory === cat
                            ? "bg-black border-black"
                            : "bg-white border-gray-200"
                        }`}
                      >
                        <Text
                          className={`text-sm font-medium ${
                            selectedCategory === cat
                              ? "text-white"
                              : "text-gray-700"
                          }`}
                        >
                          {cat}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                )}
              </View>

              {/* --- NOTE ROW --- */}
              <View className="flex-row items-center p-4">
                <View className="items-center justify-center w-8 h-8 mr-3 bg-blue-100 rounded-full">
                  <CreditCard size={16} color="#2563EB" />
                </View>
                <Text className="w-24 text-base font-medium text-black">
                  Note
                </Text>
                <TextInput
                  className="flex-1 text-base text-right text-black"
                  placeholder="Add details"
                  placeholderTextColor="#9CA3AF"
                  value={description}
                  onChangeText={setDescription}
                />
              </View>
            </View>
          </View>
        </ScrollView>

        {/* SAVE BUTTON */}
        <View className="px-4 py-4 bg-white border-t border-gray-100">
          <TouchableOpacity
            onPress={handleSave}
            activeOpacity={0.8}
            className={`w-full h-14 rounded-2xl items-center justify-center shadow-sm ${
              amount ? "bg-black" : "bg-gray-200"
            }`}
            disabled={!amount}
          >
            <Text
              className={`text-lg font-bold ${amount ? "text-white" : "text-gray-400"}`}
            >
              Save Transaction
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default AddTransactions;
