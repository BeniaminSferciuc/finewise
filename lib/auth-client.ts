import { expoClient } from "@better-auth/expo/client";
import { createAuthClient } from "better-auth/react";
import * as SecureStore from "expo-secure-store";

export const authClient = createAuthClient({
  baseURL: "http://172.20.10.5:8081",
  disableDefaultFetchPlugins: true,
  plugins: [
    expoClient({
      scheme: "finwise",
      storage: SecureStore,
    }),
  ],
});
