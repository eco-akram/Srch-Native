import "@/global.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import React from "react";
import { View, StyleSheet } from "react-native";
import SyncManager from "@/contexts/SyncManager";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";

//  Create QueryClient instance
const queryClient = new QueryClient();

const Layout = () => {
  return (
    //  Wrap the entire app in QueryClientProvider
    <QueryClientProvider client={queryClient}>
      <SyncManager>
        <GluestackUIProvider mode="light">
          <View style={styles.container}>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="jungInfo" />
          </Stack>
          </View>
        </GluestackUIProvider>
      </SyncManager>
    </QueryClientProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F1EBE5", // Change this to your desired background color
  },
});

export default Layout;
