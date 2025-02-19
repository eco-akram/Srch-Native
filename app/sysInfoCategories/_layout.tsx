import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { Stack } from "expo-router";
import { View, StyleSheet } from "react-native";

const Layout = () => {
  return (
    <GluestackUIProvider mode="light">
      <View style={styles.container}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="sysInfo" />
          <Stack.Screen name="eNET" />
          <Stack.Screen name="jung" />
          <Stack.Screen name="knx" />
          <Stack.Screen name="lb-Manage" />
        </Stack>
      </View>
    </GluestackUIProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F1EBE5", // Change this to your desired background color
  },
});

export default Layout;