import { ActivityIndicator, View } from "react-native";

import { THEME_COLOR } from "@/lib/constants";

export const LoadingScreen = () => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <ActivityIndicator size="small" color={THEME_COLOR} />
    </View>
  );
};
