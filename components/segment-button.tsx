import { StyleSheet, Text, TouchableOpacity } from "react-native";

export const SegmentButton = ({
  label,
  isActive,
  onPress,
}: {
  label: string;
  isActive: boolean;
  onPress: () => void;
}) => (
  <TouchableOpacity
    onPress={onPress}
    style={[styles.segmentButton, isActive && styles.segmentButtonActive]}
  >
    <Text
      style={[
        styles.segmentText,
        isActive ? styles.segmentTextActive : styles.segmentTextInactive,
      ]}
    >
      {label}
    </Text>
  </TouchableOpacity>
);

export const styles = StyleSheet.create({
  segmentWrapper: {
    paddingHorizontal: 16,
    marginTop: 16,
  },
  segmentContainer: {
    flexDirection: "row",
    height: 48,
    padding: 4,
    backgroundColor: "#E5E7EB",
    borderRadius: 24,
  },
  segmentButton: {
    flex: 1,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  segmentButtonActive: {
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  segmentText: {
    fontSize: 14,
    fontWeight: "600",
  },
  segmentTextActive: {
    color: "black",
  },
  segmentTextInactive: {
    color: "#6B7280",
  },
});
