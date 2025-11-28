import { useMutation, useQueryClient } from "@tanstack/react-query";

import { QUERYKEYS } from "@/lib/query-keys";
import { supabase } from "@/lib/supabase";
import { router } from "expo-router";
import { Alert } from "react-native";

export const useInsertTransaction = (id: string | undefined) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      amount,
      type,
      date,
      description,
      selectedCategoryId,
    }: {
      amount: string;
      type: "expense" | "income";
      date: Date;
      description: string;
      selectedCategoryId: string | null;
    }) => {
      if (!id || !selectedCategoryId) throw new Error("Missing data");

      const { error } = await supabase.from("transactions").insert({
        amount: parseFloat(amount),
        type,
        date: date.toISOString(),
        description: description.trim() || null,
        category: selectedCategoryId,
        user_id: id,
      });

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERYKEYS.TRANSACTIONS] });
      if (router.canGoBack()) {
        router.back();
      } else {
        router.replace("/(dashboard)/overview");
      }
    },
    onError: (error) => {
      Alert.alert("Eroare", error.message || "Nu s-a putut salva tranzacția.");
    },
  });
};
