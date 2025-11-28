import { SegmentButton, styles } from "@/components/segment-button";
import { useTransaction } from "@/hooks/use-transaction";
import { THEME_COLOR } from "@/lib/constants";
import { formatDate } from "@/lib/utils";
import DateTimePicker from "@react-native-community/datetimepicker";
import {
  Calendar as CalendarIcon,
  CreditCard,
  Tag,
  X,
} from "lucide-react-native";
import React from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AddTransactions() {
  const {
    router,
    formik,
    handleDateChange,
    handleTypeChange,
    setShowDatePicker,
    showDatePicker,
    categories,
    isCategoriesError,
    isLoadingCategories,
    createTransactionMutation,
  } = useTransaction();

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#F9FAFB",
        paddingBottom: Platform.OS === "ios" ? 0 : 24,
      }}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        {/* HEADER */}
        <View className="flex-row items-center justify-between px-4 py-2">
          <TouchableOpacity
            onPress={() => router.back()}
            className="items-center justify-center w-10 h-10 bg-gray-200 rounded-full"
          >
            <X size={20} color="#333" />
          </TouchableOpacity>
          <Text className="text-lg font-bold text-black">Tranzacție Nouă</Text>
          <View style={{ width: 40 }} />
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 40 }}
          style={{ flex: 1, marginTop: 8 }}
          keyboardShouldPersistTaps="handled"
        >
          {/* 1. SEGMENTED CONTROL */}
          <View style={styles.segmentWrapper}>
            <View style={styles.segmentContainer}>
              <SegmentButton
                label="Cheltuială"
                isActive={formik.values.type === "expense"}
                onPress={() => handleTypeChange("expense")}
              />
              <SegmentButton
                label="Venit"
                isActive={formik.values.type === "income"}
                onPress={() => handleTypeChange("income")}
              />
            </View>
          </View>

          {/* 2. AMOUNT INPUT */}
          <View className="items-center justify-center mt-10 mb-8">
            <Text className="mb-3 text-xs font-bold tracking-widest text-gray-400 uppercase">
              INTRODU SUMA
            </Text>
            <View className="flex-row items-center justify-center w-full px-6">
              <TextInput
                style={{
                  fontSize: 60,
                  fontWeight: "bold",
                  textAlign: "center",
                  color:
                    formik.values.type === "income" ? "#16a34a" : "#ef4444",
                }}
                placeholder="0"
                placeholderTextColor="#E5E7EB"
                keyboardType="numeric"
                value={formik.values.amount}
                onChangeText={formik.handleChange("amount")}
                onBlur={formik.handleBlur("amount")}
                autoFocus
              />
              <Text
                style={{
                  fontSize: 30,
                  fontWeight: "500",
                  marginTop: 16,
                  marginLeft: 8,
                  color:
                    formik.values.type === "income" ? "#16a34a" : "#ef4444",
                }}
              >
                RON
              </Text>
            </View>
          </View>

          {/* 3. FORM GROUP */}
          <View className="px-4">
            <View className="overflow-hidden bg-white border border-gray-100 shadow-sm rounded-3xl shadow-gray-100">
              {/* DATE ROW */}
              <View className="border-b border-gray-100">
                <TouchableOpacity
                  onPress={() => setShowDatePicker(true)}
                  activeOpacity={0.7}
                  className="flex-row items-center p-5"
                >
                  <View className="items-center justify-center w-10 h-10 mr-4 bg-purple-100 rounded-full">
                    <CalendarIcon size={20} color="#9333EA" />
                  </View>
                  <Text className="flex-1 text-base font-medium text-black">
                    Data
                  </Text>
                  <View className="px-3 py-1.5 bg-gray-100 rounded-lg">
                    <Text className="font-semibold text-blue-600">
                      {formatDate(formik.values.date)}
                    </Text>
                  </View>
                </TouchableOpacity>

                {showDatePicker && (
                  <View className="items-center px-4 pb-4">
                    {Platform.OS === "ios" ? (
                      <>
                        <DateTimePicker
                          value={formik.values.date}
                          mode="date"
                          display="spinner"
                          onChange={handleDateChange}
                          style={{ height: 120, width: "100%" }}
                          textColor="black"
                          locale="ro-RO"
                        />
                        <TouchableOpacity
                          onPress={() => setShowDatePicker(false)}
                          className="px-6 py-2 mt-2 bg-gray-100 rounded-full"
                        >
                          <Text className="text-sm font-bold text-gray-900">
                            Gata
                          </Text>
                        </TouchableOpacity>
                      </>
                    ) : (
                      <DateTimePicker
                        value={formik.values.date}
                        mode="date"
                        display="default"
                        onChange={handleDateChange}
                      />
                    )}
                  </View>
                )}
              </View>

              {/* CATEGORY ROW */}
              <View className="p-5 border-b border-gray-100">
                <View className="flex-row items-center mb-4">
                  <View className="items-center justify-center w-10 h-10 mr-4 bg-orange-100 rounded-full">
                    <Tag size={20} color="#F97316" />
                  </View>
                  <Text className="text-base font-medium text-black">
                    Categorie
                  </Text>
                </View>

                {isCategoriesError ? (
                  <Text className="text-red-500">
                    Eroare la încărcarea categoriilor.
                  </Text>
                ) : isLoadingCategories ? (
                  <ActivityIndicator size="small" />
                ) : (
                  <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    className="flex-row -ml-1"
                    contentContainerStyle={{ paddingRight: 20 }}
                  >
                    {categories.map((cat) => {
                      const isSelected = formik.values.categoryId === cat.id;
                      return (
                        <TouchableOpacity
                          key={cat.id}
                          onPress={() =>
                            formik.setFieldValue("categoryId", cat.id)
                          }
                          className={`h-10 px-4 rounded-full mr-2 flex-row items-center justify-center border ${
                            isSelected
                              ? "bg-black border-black"
                              : "bg-white border-gray-200"
                          }`}
                        >
                          <Text
                            className={`text-sm font-medium ${
                              isSelected ? "text-white" : "text-gray-700"
                            }`}
                          >
                            {cat.name}
                          </Text>
                        </TouchableOpacity>
                      );
                    })}
                  </ScrollView>
                )}
              </View>

              {/* NOTE ROW */}
              <View className="flex-row items-center p-5">
                <View className="items-center justify-center w-10 h-10 mr-4 bg-blue-100 rounded-full">
                  <CreditCard size={20} color="#2563EB" />
                </View>
                <Text className="w-24 text-base font-medium text-black">
                  Notă
                </Text>
                <TextInput
                  className="flex-1 h-10 text-base text-right text-black"
                  placeholder="Adaugă detalii"
                  placeholderTextColor="#9CA3AF"
                  value={formik.values.description}
                  onChangeText={formik.handleChange("description")}
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <View className="px-6 border-gray-100 shadow-none">
        <TouchableOpacity
          onPress={() => formik.handleSubmit()}
          disabled={!formik.isValid || createTransactionMutation.isPending}
          style={{
            backgroundColor:
              !formik.isValid || createTransactionMutation.isPending
                ? "#E5E7EB"
                : THEME_COLOR,
          }}
          className="flex-row justify-center items-center h-[56px] rounded-full"
        >
          {createTransactionMutation.isPending ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text
              style={{
                fontSize: 18,
                fontWeight: "bold",
                color: !formik.isValid ? "#9CA3AF" : "white",
              }}
            >
              Salvează Tranzacția
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
