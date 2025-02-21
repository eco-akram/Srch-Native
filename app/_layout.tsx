import "@/global.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import React from "react";

import SyncManager from "@/components/SyncManager";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";

// ✅ Create QueryClient instance
const queryClient = new QueryClient();

const Layout = () => {
  return (
    // ✅ Wrap the entire app in QueryClientProvider
    <QueryClientProvider client={queryClient}>
      <SyncManager>
        <GluestackUIProvider mode="light">
          <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="sysInfo" options={{ headerShown: false }} />
          </Stack>
        </GluestackUIProvider>
      </SyncManager>
    </QueryClientProvider>
  );
};

export default Layout;
