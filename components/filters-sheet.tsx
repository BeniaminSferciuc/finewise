import { THEME_COLOR } from "@/lib/constants";
import { firstLetterUppercase } from "@/lib/utils";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import React from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { BottomDrawer } from "./modal";

type FilterType = "all" | "income" | "expense";

export const FILTER_TYPES: FilterType[] = ["all", "income", "expense"];

type FilterSheetProps = {
  availableYears: number[];
  selectedYear: number;
  setSelectedYear: (y: number) => void;
  selectedType: FilterType;
  setSelectedType: (t: FilterType) => void;
  onApply: () => void;
  ref: React.RefObject<BottomSheetModal | null>;
};

export const FilterSheet = ({
  availableYears,
  selectedYear,
  setSelectedYear,
  selectedType,
  setSelectedType,
  onApply,
  ref,
}: FilterSheetProps) => {
  return (
    <BottomDrawer bottomSheetModalRef={ref}>
      <View className="w-full">
        <View className="px-6 pt-2 pb-4 border-b border-gray-100">
          <Text className="text-xl font-bold tracking-tight text-gray-900">
            Filter Transactions
          </Text>
        </View>

        <View className="px-6 pt-4">
          <View className="mb-6">
            <Text className="mb-2 text-xs font-bold tracking-widest text-gray-400 uppercase">
              Type
            </Text>
            <View
              className="flex-row bg-gray-100 rounded-full"
              style={{ padding: 3 }}
            >
              {FILTER_TYPES.map((type) => {
                const isActive = selectedType === type;

                return (
                  <Pressable
                    key={type}
                    onPress={() => setSelectedType(type)}
                    style={{
                      flex: 1,
                      paddingVertical: 6,
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: 120,
                      backgroundColor: isActive ? "white" : "transparent",
                    }}
                  >
                    <Text
                      className={`text-[13px] font-semibold capitalize ${
                        isActive ? THEME_COLOR : "text-gray-500"
                      }`}
                    >
                      {firstLetterUppercase(type)}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </View>

          <View className="mb-6">
            <Text className="mb-3 text-xs font-bold tracking-widest text-gray-400 uppercase">
              Year
            </Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ gap: 8 }}
            >
              {availableYears.map((year) => {
                const isActive = selectedYear === year;
                return (
                  <Pressable
                    key={year}
                    onPress={() => setSelectedYear(year)}
                    // Am scos mr-3 de aici pentru că gap-ul de sus se ocupă acum de spațiere
                    className={`px-6 py-2 rounded-full border`}
                    style={{
                      backgroundColor: isActive ? THEME_COLOR : "white",
                      borderColor: isActive ? THEME_COLOR : "#E5E7EB",
                    }}
                  >
                    <Text
                      className={`text-sm font-semibold ${
                        isActive ? "text-white" : "text-gray-600"
                      }`}
                    >
                      {year}
                    </Text>
                  </Pressable>
                );
              })}
            </ScrollView>
          </View>
        </View>

        <View className="p-4 bg-white border-t border-gray-100">
          <Pressable
            onPress={onApply}
            className="items-center w-full py-4 rounded-full "
            style={{ backgroundColor: THEME_COLOR }}
          >
            <Text className="text-base font-bold tracking-wide text-white">
              Apply Filters
            </Text>
          </Pressable>
        </View>
      </View>
    </BottomDrawer>
  );
};
