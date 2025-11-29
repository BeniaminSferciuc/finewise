import { LoadingScreen } from "@/components/loading";
import { authClient } from "@/lib/auth-client";
import {
  Outfit_400Regular,
  Outfit_500Medium,
  Outfit_600SemiBold,
  Outfit_700Bold,
  useFonts,
} from "@expo-google-fonts/outfit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Redirect, Stack, useSegments } from "expo-router";

import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { setCustomText } from "react-native-global-props";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { GestureHandlerRootView } from "react-native-gesture-handler";
import "../global.css";

export default function Layout() {
  const { data: isAuthenticated, isPending } = authClient.useSession();
  const segments = useSegments() as string[];
  const queryClient = new QueryClient();

  const [fontsLoaded] = useFonts({
    Outfit_400Regular,
    Outfit_600SemiBold,
    Outfit_500Medium,
    Outfit_700Bold,
  });

  if (isPending) return <LoadingScreen />;

  const inDashboardGroup = segments[0] === "(dashboard)";
  const inAuthGroup = segments[0] === "(auth)";
  const isIndexPage = segments.length === 0;

  if (!!isAuthenticated === true) {
    if (isIndexPage || inAuthGroup) {
      return <Redirect href="/overview" />;
    }
  } else if (!!isAuthenticated === false) {
    if (inDashboardGroup) {
      return <Redirect href="/sign-in" />;
    }
  }

  if (!fontsLoaded) {
    return <LoadingScreen />;
  }

  setCustomText({
    style: {
      fontFamily: "Outfit_700Bold",
      color: "white",
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <BottomSheetModalProvider>
          <SafeAreaProvider>
            <Stack screenOptions={{ headerShown: false }}>
              <Stack.Screen name="(dashboard)" />
              <Stack.Screen
                name="add-transaction"
                options={{
                  presentation: "modal",
                  animation: "slide_from_bottom",
                }}
              />
              <Stack.Screen name="index" />
              <Stack.Screen name="settings" options={{ title: "Settings" }} />
            </Stack>
          </SafeAreaProvider>
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </QueryClientProvider>
  );
}
