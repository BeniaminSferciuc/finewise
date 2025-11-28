import { useQuery } from "@tanstack/react-query";

import { QUERYKEYS } from "@/lib/query-keys";
import { supabase } from "@/lib/supabase";
import { Category } from "@/lib/types";

export const useCategories = (
  type: "expense" | "income",
  id: string | undefined
) => {
  return useQuery({
    queryKey: [QUERYKEYS.CATEGORIES, type, id],
    queryFn: async () => {
      if (!id) return [];

      const { data, error } = await supabase
        .from("categories")
        .select("*")
        .eq("type", type)
        .or(`user_id.eq.${id},user_id.is.null`)
        .order("name", { ascending: true });

      if (error) {
        console.error("Error fetching categories:", error);
        throw error;
      }
      return data as Category[];
    },
    enabled: !!id,
    throwOnError: false,
  });
};
