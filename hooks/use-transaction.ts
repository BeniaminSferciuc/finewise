import { authClient } from "@/lib/auth-client";
import { useRouter } from "expo-router";
import { useFormik } from "formik";
import { useState } from "react";
import { Platform } from "react-native";
import * as Yup from "yup";
import { useCategories } from "./use-categories";
import { useInsertTransaction } from "./use-insert-transaction";

const TransactionSchema = Yup.object().shape({
  amount: Yup.number()
    .required("Suma este obligatorie")
    .positive("Suma trebuie să fie pozitivă"),
  type: Yup.string().oneOf(["income", "expense"]).required(),
  date: Yup.date().required(),
  description: Yup.string(),
  categoryId: Yup.string().required("Selectează o categorie"),
});

export const useTransaction = () => {
  const { data: session } = authClient.useSession();
  const router = useRouter();

  // State-uri pur UI (care nu țin de datele formularului)
  const [showDatePicker, setShowDatePicker] = useState(false);

  const createTransactionMutation = useInsertTransaction(session?.user.id);

  // 2. Setup Formik
  const formik = useFormik({
    initialValues: {
      amount: "",
      type: "expense" as "income" | "expense",
      date: new Date(),
      description: "",
      categoryId: "",
    },
    validationSchema: TransactionSchema,
    validateOnMount: true, // Validează la pornire pentru a controla butonul de save
    onSubmit: (values) => {
      createTransactionMutation.mutate(
        {
          amount: values.amount,
          type: values.type,
          date: values.date,
          description: values.description,
          selectedCategoryId: values.categoryId,
        },
        {
          onSuccess: () => {
            // Optional: Reset form sau navigare
            // router.back(); (Este gestionat probabil in hook-ul de mutatie)
          },
        }
      );
    },
  });

  // Fetch categorii bazat pe tipul din Formik
  const {
    data: categories = [],
    isLoading: isLoadingCategories,
    isError: isCategoriesError,
  } = useCategories(formik.values.type, session?.user.id);

  // --- Handlers ---

  const handleDateChange = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || formik.values.date;
    if (Platform.OS === "android") {
      setShowDatePicker(false);
    }
    formik.setFieldValue("date", currentDate);
  };

  const handleTypeChange = (newType: "income" | "expense") => {
    formik.setFieldValue("type", newType);
    // Resetăm categoria când schimbăm tipul (pentru că lista de categorii se schimbă)
    formik.setFieldValue("categoryId", "");
  };

  return {
    formik,
    showDatePicker,
    setShowDatePicker,
    handleDateChange,
    handleTypeChange,
    categories,
    isLoadingCategories,
    isCategoriesError,
    router,
    createTransactionMutation,
  };
};
