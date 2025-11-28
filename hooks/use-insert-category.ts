import { QUERYKEYS } from "@/lib/query-keys";
import { supabase } from "@/lib/supabase";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Alert } from "react-native";

export const useInsertCategory = (id: string | undefined) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (vars: {
      name: string;
      type: "expense" | "income";
      icon: string;
    }) => {
      const { name, type, icon } = vars;

      if (!id) throw new Error("No user");

      const { data } = await supabase
        .from("categories")
        .insert({
          name: name,
          type: type,
          user_id: id,
          icon: icon,
        })
        .select()
        .single()
        .throwOnError();

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERYKEYS.CATEGORIES] });
    },
    onError: () => {
      Alert.alert("Eroare", "Nu s-a putut crea categoria.");
    },
  });
};
