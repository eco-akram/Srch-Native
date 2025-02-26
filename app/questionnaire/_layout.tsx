import { Stack } from "expo-router";
import React from "react";
import { View, StyleSheet } from "react-native";

import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";

const Layout = () => {
  return (
    <GluestackUIProvider mode="light">
      <View style={styles.container}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="categories" />
          <Stack.Screen name="questions" />
        </Stack>
      </View>
    </GluestackUIProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F1EBE5",
  },
});

export default Layout;
