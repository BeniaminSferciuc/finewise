import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { useCallback } from "react";
import { StyleSheet } from "react-native";

type Props = {
  children: React.ReactNode;
  bottomSheetModalRef: React.RefObject<BottomSheetModal | null>;
};

export const BottomDrawer = ({ children, bottomSheetModalRef }: Props) => {
  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        opacity={0.3}
        pressBehavior="close"
      />
    ),
    []
  );
  return (
    <BottomSheetModal
      ref={bottomSheetModalRef}
      enablePanDownToClose
      backdropComponent={renderBackdrop}
      style={{
        marginHorizontal: "2%",
        borderRadius: 26,
        overflow: "hidden",
      }}
      handleIndicatorStyle={{ backgroundColor: "#E5E7EB", width: 40 }}
    >
      <BottomSheetView style={styles.contentContainer}>
        {children}
      </BottomSheetView>
    </BottomSheetModal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
    paddingBottom: 16,
  },
});
